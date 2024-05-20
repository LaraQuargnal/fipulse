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
          v-for="post in filteredForum"
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
              <img
                v-else
                :src="require('@/assets/userpicture.png')"
                alt="Default Profile Picture"
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
              <div style="display: flex">
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
                <img
                  v-else
                  :src="require('@/assets/userpicture.png')"
                  alt="Default Profile Picture"
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
                          style="
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 5px;
                          "
                        />
                        <img
                          v-else
                          :src="require('@/assets/userpicture.png')"
                          alt="Default Profile Picture"
                          style="
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 5px;
                          "
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

export default {
  name: "StudentCorner",
  store,
  data() {
    return {
      question: "",
      forum: [],
      store: store,
      selectedStartDate: null,
      selectedEndDate: null,
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
    this.getPostsAndAnswers();
  },

  methods: {
    openUserCard(user) {
      this.$router.push({
        name: "UserCardWithNickname",
        params: { nickname: user.nickname },
      });
    },
    getPostsAndAnswers() {
      db.collection("forum")
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

            const promise = db.collection("users")
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
              this.forum.sort((a, b) => b.date - a.date); // Sortiranje nakon dobijanja podataka
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
  },
  computed: {
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
          const postDate = moment(post.date);
          const startDate = this.selectedStartDate
            ? moment(this.selectedStartDate)
            : null;
          const endDate = this.selectedEndDate
            ? moment(this.selectedEndDate)
            : null;
          const dateMatches =
            (!startDate || postDate.isSameOrAfter(startDate, "day")) &&
            (!endDate || postDate.isSameOrBefore(endDate, "day"));

          return (
            questionMatches || answerMatches || userMatches || dateMatches
          );
        })
        .sort((a, b) => b.date - a.date); // Sortiranje nakon filtriranja
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
