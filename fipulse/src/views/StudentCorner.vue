<template>
  <div class="studentcorner">
    <div class="row">
      <div class="col-3">
        <template v-if="currentUserHasDarknetAccess">
          <button
            class="btn btn-primary"
            style="margin-top: 20px; width: 80%"
            @click="showAllPosts"
          >
            {{ $t("AllPosts") }}
          </button>
          <button
            class="btn btn-primary"
            style="margin-top: 20px; width: 80%"
            @click="showDarknetPosts"
          >
            {{ $t("DarknetPosts") }}
          </button>
        </template>
      </div>
      <div class="col-6">
        <form @submit.prevent="postNewForum">
          <div class="form-group">
            <label for="question">{{ $t("ForumQue") }} </label>
            <input
              v-model="question"
              type="text"
              class="form-control ml-2"
              :placeholder="$t('ForumHelp')"
              id="question"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style="margin-top: 20px; width: 150px"
          >
            {{ $t("addForum") }}
          </button>
        </form>
        <ForumPost
          v-for="post in filteredForum"
          :key="post.id"
          :getAnswers="getAnswers"
          :post="post"
        />
      </div>
      <div class="col-3" style="padding-left: 20px">
        <div class="col-content">
          <form class="d-flex" role="search" style="margin-left: 10px">
            <input
              v-model="store.searchTerm"
              class="form-control me-2"
              type="search"
              :placeholder="$t('navBarSearch')"
              aria-label="Search"
              style="font-size: 14px"
            />
          </form>
          <UserList
            :userList="store.users"
            :userCardRouteName="'UserCardWithNickname'"
            placeholder="Search Users"
            userListTitle="Users"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import moment from "moment";
import ForumPost from "@/components/ForumPost.vue";
import UserList from "@/components/UserList.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
import "../styles/studentCorner.css";

export default {
  name: "StudentCorner",
  store,
  components: {
    ForumPost,
    UserList,
  },
  data() {
    return {
      question: "",
      forum: [],
      store: store,
      currentUserHasDarknetAccess: false,
      darknetPostsClicked: false,
    };
  },
  mounted() {
    this.toast = useToast();
    this.getUsers();
    this.checkCurrentUserDarknetAccess();
    this.getPostsAndAnswers();
  },
  methods: {
    getUsers() {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          this.store.users = [];
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const user = {
              nickname: userData.nickname,
              profileImage: userData.profileImage,
            };
            this.store.users.push(user);
          });
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    },
    checkCurrentUserDarknetAccess() {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userEmail = currentUser.email;
        db.collection("users")
          .where("email", "==", userEmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              if (userData.darknetAccess === true) {
                this.currentUserHasDarknetAccess = true;
              }
            });
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      }
    },
    getPostsAndAnswers() {
      const query = this.darknetPostsClicked
        ? db.collection("forum").where("darknet", "==", true)
        : db.collection("forum").where("darknet", "==", false);

      query
        .orderBy("posted_at", "desc")
        .limit(50)
        .get()
        .then((querySnapshot) => {
          this.forum = [];
          const promises = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const userEmail = data.email;
            let userDisplayName = data.userDisplayName || data.email;
            const answer = data.answer || "";
            const question = data.que;
            const postedAt = data.posted_at;
            const favorite = data.favorite || false;
            const likedBy = data.likedBy || [];

            const promise = db
              .collection("users")
              .where("email", "==", userEmail)
              .get()
              .then((userQuerySnapshot) => {
                userQuerySnapshot.forEach((userDoc) => {
                  const userData = userDoc.data();
                  userDisplayName = userData.nickname;
                  const userProfileImage = userData.profileImage;

                  const post = {
                    id: doc.id,
                    email: userEmail,
                    userDisplayName: userDisplayName,
                    date: postedAt,
                    que: question,
                    profileImage: userProfileImage,
                    answer: answer,
                    favorite: favorite,
                    likedBy: likedBy,
                  };
                  this.forum.push(post);
                  return this.getAnswers(post.id);
                });
              })
              .catch((error) => {
                console.error("Error getting user data:", error);
              });
            promises.push(promise);
          });
          Promise.all(promises)
            .then(() => {
              this.forum.sort((a, b) => b.date - a.date);
            })
            .catch((error) => {
              console.error("Error getting posts:", error);
            });
        })
        .catch((error) => {
          console.error("Error getting posts:", error);
        });
    },
    postNewForum() {
      if (this.question.trim() === "") {
        return;
      }
      const question = this.question;
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        db.collection("users")
          .doc(userId)
          .get()
          .then((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              const userDisplayName = userData.nickname;

              db.collection("forum")
                .add({
                  que: question,
                  email: currentUser.email,
                  posted_at: Date.now(),
                  nickname: userDisplayName,
                  darknet: this.darknetPostsClicked,
                })
                .then((doc) => {
                  console.log("Spremljeno", doc);
                  this.question = "";
                  this.getPostsAndAnswers();
                  this.toast.success("Post successfully added!");
                })
                .catch((error) => {
                  console.error("Error saving post:", error);
                });
            } else {
              console.error("User data not found.");
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        console.error("User not authenticated.");
      }
    },
    getAnswers(postId) {
      db.collection("forum")
        .doc(postId)
        .collection("answers")
        .orderBy("posted_at", "asc")
        .get()
        .then((querySnapshot) => {
          const promises = [];
          const answers = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            let userNickname = data.userDisplayName || data.email;

            const promise = db
              .collection("users")
              .where("email", "==", data.email)
              .get()
              .then((userQuerySnapshot) => {
                userQuerySnapshot.forEach((userDoc) => {
                  const userData = userDoc.data();
                  userNickname = userData.nickname;
                  const userProfileImage = userData.profileImage;

                  answers.push({
                    id: doc.id,
                    user: data.email,
                    userDisplayName: userNickname,
                    date: data.posted_at,
                    answer: data.answer,
                    userProfileImage: userProfileImage,
                  });
                });
              })
              .catch((error) => {
                console.error("Error getting user data:", error);
              });

            promises.push(promise);
          });

          Promise.all(promises)
            .then(() => {
              const postIndex = this.forum.findIndex(
                (post) => post.id === postId
              );
              if (postIndex !== -1) {
                this.forum[postIndex].answers = answers;
              }
            })
            .catch((error) => {
              console.error("Error getting answers:", error);
            });
        })
        .catch((error) => {
          console.error("Error getting answers:", error);
        });
    },
    showDarknetPosts() {
      this.darknetPostsClicked = true;
      this.getPostsAndAnswers();
    },
    showAllPosts() {
      this.darknetPostsClicked = false;
      this.getPostsAndAnswers();
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    filteredForum() {
      const searchTerm = this.store.searchTerm.toLowerCase();
      return this.forum.filter((post) => {
        const questionMatches = post.que.toLowerCase().includes(searchTerm);
        const answerMatches =
          post.answers &&
          post.answers.some((answer) => {
            return (
              answer.answer.toLowerCase().includes(searchTerm) ||
              answer.userDisplayName.toLowerCase().includes(searchTerm)
            );
          });
        const userMatches = post.userDisplayName
          .toLowerCase()
          .includes(searchTerm);

        return questionMatches || answerMatches || userMatches;
      });
    },
  },
};
</script>
