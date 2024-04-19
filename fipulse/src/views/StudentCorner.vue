StudentCorner.vue:
<template>
  <div class="studentcorner">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form @submit.prevent="postNewForum">
          <div class="form-group">
            <label for="question">What's on your mind?</label>
            <input
              v-model="question"
              type="text"
              class="form-control ml-2"
              placeholder="Enter post or question"
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
            <div style="font-weight: bold">{{ post.userDisplayName }}</div>
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
              <p>{{ answer.answer }} ({{ answer.userDisplayName }})</p>
            </div>
          </div>
          <form @submit.prevent="submitAnswer(post)" style="margin-top: 10px">
            <div class="form-group">
              <input
                v-model="post.answer"
                class="form-control ml-2"
                rows="1"
                placeholder="Enter your answer"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-left: 10px"
            >
              Submit Answer
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
                    padding-left: 10;
                    list-style-type: none;
                    text-align: left;
                  "
                >
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Iva')"
                      style="color: #007bff; font-weight: normal"
                      >Iva Ivičić</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Marko')"
                      style="color: #007bff; font-weight: normal"
                      >Marko Marković</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Ana')"
                      style="color: #007bff; font-weight: normal"
                      >Ana Aničić</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      onclick="openUserCard('Blablablablabla')"
                      style="color: #007bff; font-weight: normal"
                      >Blablablablabla Blablalbabičić</a
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
  data() {
    return {
      question: "",
      forum: [],
      store: store,
      answer: [],
    };
  },
  mounted() {
    this.getPostsAndAnswers();
  },
  methods: {
    getPostsAndAnswers() {
      db.collection("forum")
        .orderBy("posted_at", "desc")
        .limit(50)
        .get()
        .then((querySnapshot) => {
          this.forum = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const userDisplayName = data.userDisplayName || data.email;
            const answer = data.answer || "";

            const post = {
              id: doc.id,
              user: data.email,
              userDisplayName: userDisplayName,
              date: data.posted_at,
              que: data.que,
              answer: answer,
            };
            this.forum.push(post);
            this.getAnswers(post.id);
          });
        })
        .catch((error) => {
          console.error("Error getting posts:", error);
        });
    },
    getPosts() {
      db.collection("forum")
        .orderBy("posted_at", "desc")
        .limit(50)
        .get()
        .then((query) => {
          if (this.forum.length === 0) {
            this.forum = [];
          }
          query.forEach((doc) => {
            const data = doc.data();
            const userDisplayName = data.userDisplayName || data.email;
            const answer = data.answer || "";

            this.forum.push({
              id: doc.id,
              user: data.email,
              userDisplayName: userDisplayName,
              date: data.posted_at,
              que: data.que,
              answer: answer,
            });
          });
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
              userDisplayName: this.currentUserNickname,
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
            const userNickname = data.userNickname || data.email;
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
    const userNickname = currentUser.displayName;


      db.collection("forum")
        .doc(postIdValue)
        .collection("answers")
        .add({
          answer: answer,
          email: store.currentUser,
          posted_at: Date.now(),
          userNickname: userNickname
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
    console.error("User not authenticated.");
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
.answers {
  max-height: 50px;
  overflow-y: auto;
}

.box-title {
  background-color: #000;
  color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  width: 230px;
}

.menu-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #808080;
}

.button-text {
  flex: 1;
}

.button-sign {
  margin-right: 10px;
  padding-right: 10px;
}
</style>
