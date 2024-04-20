<template>
  <div class="page-wrapper">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4">
        <div class="user-card">
          <div class="user-card-image">
            <img
              :src="imageUrl || defaultImageUrl"
              alt="Profile Image"
              width="200"
              height="200"
            />
          </div>
          <div class="col-9 mx-auto">
            <input
              type="file"
              class="form-control mt-3"
              @change="handleImageUpload"
              accept="image/*"
            />
          </div>
          <div class="text-center mt-3">
            <button class="btn btn-primary">{{ $t("ProfilePic") }}</button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="user-info">
          <h3 class="text-center text-lg-start">{{ $t("UserData") }}</h3>
          <div class="user-info-row mt-3">
            <label>{{ $t("Nick") }}</label>
            <input
              v-if="editNickname"
              type="text"
              v-model="editedNickname"
              class="form-control"
            />
            <span v-else>{{ currentUser ? currentUser.nickname : "" }}</span>
          </div>
          <div class="user-info-row mt-3">
            <label>E-mail:</label>
            <span>{{ currentUser ? currentUser.email : "" }}</span>
          </div>
          
          <div class="user-info-row mt-3">
            <label>{{ $t("Grade") }}</label>
            <span>{{ currentUser ? currentUser.email : "" }}</span>
          </div>
          <div class="user-info-row mt-3">
            <label>{{ $t("Darknet") }}</label>
            <span>{{
              currentUser ? (currentUser.darknetAccess ? "Da" : "Ne") : ""
            }}</span>
          </div>
          <div class="text-left mt-4">
            <button class="btn btn-primary" @click="toggleEditMode">
              {{ $t("NickChange") }}
            </button>
            <button
              v-if="editNickname"
              class="btn btn-success"
              @click="saveChanges"
            >
              {{ $t("Save") }}
            </button>
          </div>
          <div class="text-left mt-3">
            <button class="btn btn-danger me-2">DEAKTIVIRANJE KORISNIKA</button>
            <button class="btn btn-success">PRISTUP "DARKNET"-U</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-8">
        <div class="border p-3">
          <h3 class="text-center">CHAT</h3>
          <div class="chat">
            <div class="row">
              <div class="col">Red 1</div>
            </div>
            <div class="row">
              <div class="col">Red 2</div>
            </div>
            <div class="row">
              <div class="col">Red 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";

export default {
  data() {
    return {
      currentUser: null,
      editNickname: false,
      editedNickname: "",
      imageUrl: "",
      defaultImageUrl: require("@/assets/userpicture.png"),
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.currentUser = userData;
              }
            })
            .catch((error) => {
              console.error("Error getting user data:", error);
            });
        }
      });
    },
    toggleEditMode() {
      this.editNickname = !this.editNickname;
      this.editedNickname = this.currentUser.nickname;
    },
    saveChanges() {
      const userId = firebase.auth().currentUser.uid;

      db.collection("users")
        .doc(userId)
        .update({
          nickname: this.editedNickname,
        })
        .then(() => {
          console.log("Nickname uspješno ažuriran.");
          this.currentUser.nickname = this.editedNickname;
          this.toggleEditMode();
        })
        .catch((error) => {
          console.error("Greška pri ažuriranju nicknama:", error);
        });
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.user-card {
  margin: 20px;
  text-align: center;
}

.user-card-image img {
  border-radius: 50%;
}

.user-info {
  margin: 20px;
  text-align: left;
}

.user-info-row {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}
</style>
