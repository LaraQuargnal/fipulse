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
        <div v-for="post in filteredForum" :key="post.id" class="post">
          <div style="display: flex; justify-content: space-between">
            <div style="font-weight: bold">
              <img
                v-if="post.profileImage"
                :src="post.profileImage"
                alt="Profile Picture"
                class="profile-picture"
              />
              <img
                v-else
                :src="require('@/assets/userpicture.png')"
                alt="Default Profile Picture"
                class="profile-picture"
              />
              <span>{{ post.userDisplayName }}</span>
              <i
                :class="{
                  far: !currentUserHasLiked(post),
                  fas: currentUserHasLiked(post),
                  'fa-star': true,
                }"
                style="cursor: pointer; margin-left: 5px"
                @click="toggleFavorite(post)"
              ></i>
            </div>
            <div>{{ postedFromNow(post) }}</div>
          </div>
          <div style="padding: 10px; margin-top: 10px">
            <b>{{ post.que }}</b>
          </div>
          <div v-if="post.answers && post.answers.length > 0">
            <div
              v-for="answer in post.answers"
              :key="answer.id"
              style="border: 1px solid #cccccc; padding: 5px"
            >
              <div style="display: flex">
                <img
                  v-if="answer.userProfileImage"
                  :src="answer.userProfileImage"
                  alt="Profile Picture"
                  class="profile-picture"
                />
                <img
                  v-else
                  :src="require('@/assets/userpicture.png')"
                  alt="Default Profile Picture"
                  class="profile-picture"
                />
                <p>
                  <b>{{ answer.userDisplayName }}:</b> {{ answer.answer }}
                </p>
              </div>
            </div>
          </div>
          <form @submit.prevent="submitAnswer(post)" style="margin-top: 10px">
            <div class="form-group">
              <input
                v-model="post.answer"
                class="form-control ml-2"
                rows="1"
                :placeholder="$t('Answer')"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-left: 10px"
            >
              {{ $t("SubmitAnswer") }}
            </button>
          </form>
        </div>
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
          <ul class="list-group" style="margin-top: 30px; border: none">
            <li class="list-group-item" style="border: none">
              <div class="box-title" style="width: 100%">{{ $t("users") }}</div>
              <div class="list-group-item-content">
                <ul style="padding-left: 35%; list-style-type: none">
                  <li
                    v-for="user in store.users"
                    :key="user"
                    @click="openUserCard(user)"
                  >
                    <router-link
                      :to="{
                        name: 'UserCardWithNickname',
                        params: { nickname: user.nickname },
                      }"
                      ><div style="display: flex; align-items: center">
                        <img
                          v-if="user.profileImage"
                          :src="user.profileImage"
                          alt="Profile Picture"
                          class="profile-picture"
                        />
                        <img
                          v-else
                          :src="require('@/assets/userpicture.png')"
                          alt="Default Profile Picture"
                          class="profile-picture"
                        />
                        <a href="#" style="color: #007bff; font-weight: normal"
                          ><b>{{ user.nickname }}</b></a
                        >
                      </div></router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import moment from "moment";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
import "../styles/studentCorner.css";

export default {
  name: "StudentCorner",
  store,
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
    openUserCard(user) {
      this.$router.push({
        name: "UserCardWithNickname",
        params: { nickname: user.nickname },
      });
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
    submitAnswer(post) {
      if (post.answer.trim() === "") {
        return;
      }
      const postIdValue = post.id;
      const answer = post.answer;
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
                .doc(postIdValue)
                .collection("answers")
                .add({
                  answer: answer,
                  email: currentUser.email,
                  posted_at: Date.now(),
                  userNickname: userDisplayName,
                })
                .then(() => {
                  console.log("Answer successfully saved.");
                  this.getAnswers(postIdValue);
                  post.answer = "";
                })
                .catch((error) => {
                  console.error("Error saving answer:", error);
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
    showDarknetPosts() {
      this.darknetPostsClicked = true;
      this.getPostsAndAnswers();
    },
    showAllPosts() {
      this.darknetPostsClicked = false;
      this.getPostsAndAnswers();
    },
    currentUserHasLiked(post) {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) return false;
      const userEmail = currentUser.email;
      return post.likedBy && post.likedBy.includes(userEmail);
    },
    toggleFavorite(post) {
      const currentUser = firebase.auth().currentUser;

      if (!currentUser) {
        this.toast.error("User not authenticated.");
        return;
      }

      const userEmail = currentUser.email;

      if (post.email === userEmail) {
        this.toast.error("You cannot like your own post.");
        return;
      }

      const hasLiked = post.likedBy && post.likedBy.includes(userEmail);

      if (hasLiked) {
        this.toast.error("You have already liked this post.");
        return;
      }

      post.likedBy = post.likedBy || [];
      post.likedBy.push(userEmail);
      post.favorite = true;

      db.collection("forum")
        .doc(post.id)
        .update({
          likedBy: post.likedBy,
          favorite: true,
        })
        .then(() => {
          db.collection("users")
            .where("email", "==", userEmail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                let grade = userData.grade || 0;

                grade += 1;

                doc.ref.update({ grade: grade });
              });
            })
            .catch((error) => {
              this.toast.error("Error updating user grade.");
            });

          this.toast.success("Post successfully liked!");
        })
        .catch((error) => {
          this.toast.error("Error liking the post.");
        });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    postedFromNow() {
      return (post) => moment(post.date).format("DD.MM.YYYY. HH:mm");
    },
    filteredForum() {
      const searchTerm = this.store.searchTerm.toLowerCase();
      return this.forum
        .filter((post) => {
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
        })
    },
  },
};
</script>