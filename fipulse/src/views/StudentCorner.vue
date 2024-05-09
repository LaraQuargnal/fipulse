StudentCorner.vue:
<template>
  <div class="studentcorner">
    <div class="row">
      <div class="col-3"></div>
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
        <div
          v-for="post in forum"
          :key="post.id"
          class="post"
          style="
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 20px;
            background-color: #e6f7ff;
          "
        >
          <div style="display: flex; justify-content: space-between">
            <div style="font-weight: bold">
              <img
                v-if="post.profileImage"
                :src="post.profileImage"
                alt="Profile Picture"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 5px;
                "
              />
              <span>{{ post.userDisplayName }}</span>
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
              <div style="display: flex; align-items: center">
                <img
                  v-if="answer.userProfileImage"
                  :src="answer.userProfileImage"
                  alt="Profile Picture"
                  style="
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 5px;
                  "
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
        <div
          class="col-content"
          style="
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
            padding-bottom: 40px;
          "
        >
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
                <ul
                  style="
                    padding-left: 10px;
                    text-align: center;
                    list-style-type: none;
                  "
                >
                  <li
                    v-for="user in store.users"
                    :key="user"
                    @click="openUserCard(user)"
                  >
                    <router-link
                      :to="{
                        name: 'UserCardWithNickname',
                        params: { nickname: user },
                      }"
                      ><div style="display: flex; align-items: center">
                        <img
                          v-if="getUserProfileImage(user)"
                          :src="getUserProfileImage(user)"
                          alt="Profile Picture"
                          style="
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 5px;
                          "
                        />
                        <a href="#" style="color: #007bff; font-weight: normal"
                          ><b>{{ user }}</b></a
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

export default {
  name: "StudentCorner",
  store,
  data() {
    return {
      question: "",
      forum: [],
      store: store,
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        this.store.users = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userNickname = userData.nickname;
          this.store.users.push(userNickname);
        });
      })
      .catch((error) => {
        console.error("Error getting user nicknames:", error);
      });
    this.getPostsAndAnswers();
  },
  methods: {
    openUserCard(user) {
      this.$router.push({
        name: "UserCardWithNickname",
        params: { nickname: user },
      });
    },
    getPostsAndAnswers() {
      db.collection("forum")
        .orderBy("posted_at", "desc")
        .limit(50)
        .get()
        .then((querySnapshot) => {
          this.forum = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const userEmail = data.email;
            let userDisplayName = data.userDisplayName || data.email;
            const answer = data.answer || "";
            const question = data.que;
            const postedAt = data.posted_at;

            db.collection("users")
              .where("email", "==", userEmail)
              .get()
              .then((userQuerySnapshot) => {
                userQuerySnapshot.forEach((userDoc) => {
                  const userData = userDoc.data();
                  userDisplayName = userData.nickname;
                  const userProfileImage = userData.profileImage;

                  const post = {
                    id: doc.id,
                    userDisplayName: userDisplayName,
                    date: postedAt,
                    que: question,
                    profileImage: userProfileImage,
                    answer: answer,
                  };
                  this.forum.push(post);
                  this.getAnswers(post.id);
                });
              })
              .catch((error) => {
                console.error("Error getting user data:", error);
              });
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

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentUserNickname = user.displayName;
          db.collection("forum")
            .add({
              que: question,
              email: store.currentUser,
              posted_at: Date.now(),
              nickname: this.currentUserNickname,
            })
            .then((doc) => {
              console.log("Spremljeno", doc);
              this.question = "";
              this.getPostsAndAnswers();
            })
            .catch((e) => {
              console.error(e);
            });
        }
      });
    },
    getAnswers(postId) {
      db.collection("forum")
        .doc(postId)
        .collection("answers")
        .orderBy("posted_at", "asc")
        .get()
        .then((querySnapshot) => {
          const answers = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            let userNickname = data.userNickname || data.email;
            answers.push({
              id: doc.id,
              user: data.email,
              userDisplayName: userNickname,
              date: data.posted_at,
              answer: data.answer,
            });
          });

          const postIndex = this.forum.findIndex((post) => post.id === postId);
          if (postIndex !== -1) {
            this.forum[postIndex].answers = answers;
          }
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
    getUserProfileImage(userOrPost) {
      if (userOrPost && userOrPost.profileImage) {
        return userOrPost.profileImage;
      } else {
        return require("@/assets/userpicture.png");
      }
    },
  },
  computed: {
    postedFromNow() {
      return (post) => moment(post.date).format("DD.MM.YYYY. HH:mm");
    },
  },
};
</script>

<style scoped>
.box-title {
  background-color: #000;
  color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  width: 230px;
}
</style>
