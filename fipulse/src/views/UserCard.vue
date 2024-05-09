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
              class="profile-image"
            />
          </div>
          <div class="col-9 mx-auto">
            <input
              ref="fileInput"
              type="file"
              class="form-control mt-3"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            />
          </div>
          <div class="text-center mt-3">
            <button
              v-if="showButtons"
              class="btn btn-primary"
              @click="openFileInput"
            >
              {{ $t("ProfilePic") }}
            </button>
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
            <button
              v-if="showButtons"
              class="btn btn-primary"
              @click="toggleEditMode"
            >
              {{ $t("NickChange") }}
            </button>
            <button
              v-if="editNickname && showButtons"
              class="btn btn-success"
              @click="saveChanges"
            >
              {{ $t("Save") }}
            </button>
          </div>
          <div class="text-left mt-3">
            <button v-if="!showButtons" class="btn btn-primary">
              CHAT
            </button>
            <button v-if="showButtons" class="btn btn-danger me-2">
              DEAKTIVIRANJE KORISNIKA
            </button>
            <button v-if="showButtons" class="btn btn-success">
              PRISTUP "DARKNET"-U
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db, storage } from "@/firebase";

export default {
  data() {
    return {
      currentUser: null,
      editNickname: false,
      editedNickname: "",
      imageUrl: "",
      defaultImageUrl: require("@/assets/userpicture.png"),
      showButtons: false,
    };
  },
  props: {
    nickname: {
      type: String,
      default: () =>
        firebase.auth().currentUser
          ? firebase.auth().currentUser.displayName
          : null,
    },
  },
  created() {
    if (this.$route.path === "/usercard") {
      this.showButtons = true;
    } else {
      this.showButtons = false;
    }

    const nickname = this.$route.params.nickname;
    if (!nickname) {
      this.fetchUserData();
    } else {
      this.fetchUserByNickname();
    }
  },
  computed: {
    currentUserNickname() {
      return this.currentUser ? this.currentUser.nickname : "";
    },
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
                if (userData.profileImage) {
                  this.imageUrl = userData.profileImage;
                }
              }
            })
            .catch((error) => {
              console.error("Error getting user data:", error);
            });
        }
      });
    },
    fetchUserByNickname() {
      firebase
        .firestore()
        .collection("users")
        .where("nickname", "==", this.nickname)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            this.currentUser = userData;
            if (userData.profileImage) {
              this.imageUrl = userData.profileImage;
            }
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
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
    openFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const userId = firebase.auth().currentUser.uid;
      const storageRef = storage.ref(`users/${userId}/profileImage`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(`Upload is ${snapshot.bytesTransferred} bytes`);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.imageUrl = downloadURL;
            db.collection("users")
              .doc(userId)
              .update({
                profileImage: downloadURL,
              })
              .then(() => {
                console.log("Profile image updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile image:", error);
              });
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.user-card {
  margin: 20px;
  text-align: center;
}

.user-card-image {
  width: 100%;
  display: flex;
  justify-content: center;
}

.profile-image {
  display: block;
  width: 100%;
  max-width: 300px;
  height: auto;
  max-height: 300px;
  border-radius: 50%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .profile-image {
    max-width: 150px;
  }
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
