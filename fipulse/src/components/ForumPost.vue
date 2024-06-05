<template>
  <div class="post">
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
    <form @submit.prevent="submitAnswer" style="margin-top: 10px">
      <div class="form-group">
        <input
          v-model="answer"
          class="form-control ml-2"
          rows="1"
          :placeholder="$t('Answer')"
        />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-left: 10px">
        {{ $t("SubmitAnswer") }}
      </button>
    </form>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
import moment from "moment";

export default {
  name: "ForumPost",
  props: {
    post: Object,
    getAnswers: {
      type: Function,
      required: true,
      },
  },
  data() {
    return {
      answer: "",
    };
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
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
    postedFromNow(post) {
      return moment(post.date).format("DD.MM.YYYY. HH:mm");
    },
    submitAnswer() {
      if (this.answer.trim() === "") {
        return;
      }
      const postIdValue = this.post.id;
      const answer = this.answer;
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
                  this.answer = "";
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
};
</script>
