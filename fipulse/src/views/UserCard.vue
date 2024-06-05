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
          <div v-if="uploading" class="progress mt-3">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{ width: progress + '%' }"
              :aria-valuenow="progress"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div v-if="uploading" class="text-center mt-2">
            <span>{{ roundedProgress }}%</span>
          </div>
          <div class="text-center mt-3">
            <button
              v-if="!showButtons && showButton"
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
            <span>{{ gradeDescription }}</span>
          </div>
          <div class="user-info-row mt-3">
            <label>{{ $t("Darknet") }}</label>
            <span>{{
              currentUser ? (currentUser.darknetAccess ? "Yes" : "No") : ""
            }}</span>
          </div>
          <div class="text-left mt-4">
            <button
              v-if="!showButtons && showButton"
              class="btn btn-primary"
              @click="toggleEditMode"
            >
              {{ $t("NickChange") }}
            </button>
            <button
              v-if="editNickname && showButton"
              class="btn btn-success"
              @click="saveChanges"
            >
              {{ $t("Save") }}
            </button>
          </div>
          <div class="text-left mt-3">
            <button
              v-if="!showButtons"
              class="btn btn-primary"
              @click="toggleChatForm"
            >
              CHAT
            </button>
            <button
              v-if="showButtons"
              @click="deleteUser"
              class="btn btn-danger me-2"
            >
              {{ $t("deactivateUser") }}
            </button>
            <button
              v-if="showButtons"
              class="btn btn-success me-2"
              @click="grantDarknetAccess"
            >
              {{ $t("DarknetAccess") }}
            </button>
            <button
              v-if="showButtons"
              class="btn btn-danger me-2"
              @click="revokeDarknetAccess"
            >
              {{ $t("DarknetRevoke") }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
      <div v-if="showChatForm" class="col-8">
        <div class="card card-bordered">
          <div class="card-header">
            <h4 class="card-title"><strong>Chat</strong></h4>
          </div>
          <div
            class="ps-container ps-theme-default ps-active-y"
            id="chat-content"
            ref="chatContent"
            style="overflow-y: scroll !important; height: 400px !important"
          >
            <div
              v-for="message in messages"
              :key="message.id"
              class="media d-flex align-items-center justify-content-between"
              :class="{
                'media-chat': message.sender !== currentUser.email,
                'media-chat-reverse': message.sender === currentUser.email,
              }"
            >
              <div v-if="message.type === 'text'">{{ message.content }}</div>
              <div v-else-if="message.type === 'image'">
                <img
                  :src="message.content"
                  alt="Chat Image"
                  style="max-width: 70%"
                />
              </div>
              <div
                v-if="message.sender !== currentUser.email"
                class="d-flex align-items-center"
              >
                <img
                  v-if="message.sender !== currentUser.email"
                  class="avatar"
                  :src="imageUrl || defaultImageUrl"
                  alt="..."
                />
                <div class="media-body ms-3">
                  <p>
                    <span>{{ message.senderNickname }}: </span
                    >{{ message.text }} (<span class="meta">
                      {{
                        message.timestamp
                          ? new Date(
                              message.timestamp.toDate()
                            ).toLocaleTimeString()
                          : ""
                      }} </span
                    >)
                  </p>
                </div>
              </div>
              <div v-else class="d-flex align-items-center">
                <div class="media-body me-3 text-end">
                  <p>
                    {{ message.text }}
                    (<span class="meta">
                      {{
                        message.timestamp
                          ? new Date(
                              message.timestamp.toDate()
                            ).toLocaleTimeString()
                          : ""
                      }} </span
                    >)
                  </p>
                </div>
                <img
                  v-if="currentUser && currentUser.profileImage"
                  class="avatar"
                  :src="currentUser.profileImage || defaultImageUrl"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div class="publisher bt-1 border-light">
            <img
              class="avatar avatar-xs"
              :src="
                currentUser
                  ? currentUser.profileImage || defaultImageUrl
                  : defaultImageUrl
              "
              alt="..."
            />
            <input
              class="publisher-input"
              type="text"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Write something"
            />
            <span class="publisher-btn file-group">
              <a
                class="publisher-btn"
                href="#"
                data-abc="true"
                @click="openImageInput"
              >
                <i class="fa fa-image"></i> </a
            ></span>
            <input
              ref="imageInput"
              type="file"
              class="form-control mt-3"
              accept="image/*"
              @change="handleFileChange"
              style="display: none"
            />
            <a
              class="publisher-btn"
              href="#"
              data-abc="true"
              @click="toggleEmoji"
              ><i class="fa fa-smile"></i
            ></a>
            <a
              class="publisher-btn text-info"
              href="#"
              data-abc="true"
              @click="sendMessage"
              ><i class="fa fa-paper-plane"></i
            ></a>
          </div>
          <EmojiPicker
            v-if="showEmojiPicker"
            :native="true"
            @select="onSelectEmoji"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db, storage } from "@/firebase";
import { useToast } from "vue-toastification";
import "../styles/userCard.css";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

export default {
  components: {
    EmojiPicker,
  },
  data() {
    return {
      currentUser: null,
      editNickname: false,
      editedNickname: "",
      imageUrl: "",
      defaultImageUrl: require("@/assets/userpicture.png"),
      showButtons: false,
      progress: 0,
      uploading: false,
      newMessage: "",
      messages: [],
      receiverNickname: "",
      showEmojiPicker: false,
      showChatForm: false,
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.checkAdmin(user.email);
      } else {
        this.$router.push("/login");
      }
    });

    if (this.$route.path === "/usercard") {
      this.showButton = true;
    } else {
      this.showButton = false;
    }

    const nickname = this.$route.params.nickname;
    if (!nickname) {
      this.fetchUserData();
    } else {
      this.fetchUserByNickname();
    }

    this.receiverNickname = this.$route.params.nickname || "";
    this.fetchMessages();
    this.getCurrentUser();
  },
  computed: {
    currentUserNickname() {
      return this.currentUser ? this.currentUser.nickname : "";
    },
    gradeDescription() {
      if (!this.currentUser || !this.currentUser.grade) {
        return "No grade";
      }
      const grade = this.currentUser.grade;

      if (grade >= 1 && grade <= 3) {
        return "★ Beginner";
      } else if (grade >= 4 && grade <= 6) {
        return "★★ Junior";
      } else if (grade >= 7 && grade <= 9) {
        return "★★★ Expert";
      } else if (grade >= 10) {
        return "★★★★ Master";
      } else {
        return "No grade";
      }
    },
    roundedProgress() {
      return this.progress.toFixed(2);
    },
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    checkAdmin(email) {
      const adminEmail = "admin@admin.com";
      if (email === adminEmail) {
        this.showButtons = true;
        this.showButton = true;
      }
    },
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
                this.$forceUpdate();
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
          this.toast.success("User nickname successfully changed.");

          this.currentUser.nickname = this.editedNickname;
          this.toggleEditMode();
        })
        .catch((error) => {
          console.error("Greška pri ažuriranju nicknama:", error);
          this.toast.error("Error updating nickname.");
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

      this.uploading = true;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Error uploading image:", error);
          this.toast.error("Error uploading image.");
          this.uploading = false;
          this.progress = 0;
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
                this.toast.success("Profile image successfully updated.");
                this.uploading = false;
                this.progress = 0;
              })
              .catch((error) => {
                console.error("Error updating profile image:", error);
                this.toast.error("Error updating profile image.");
                this.uploading = false;
                this.progress = 0;
              });
          });
        }
      );
    },
    grantDarknetAccess() {
      const nickname = this.$route.params.nickname;
      if (this.isAdmin() && nickname) {
        db.collection("users")
          .where("nickname", "==", nickname)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userId = querySnapshot.docs[0].id;
              const userRef = db.collection("users").doc(userId);
              userRef
                .update({
                  darknetAccess: true,
                })
                .then(() => {
                  this.toast.success("Darknet access granted to user.");
                  this.fetchUserData();
                })
                .catch((error) => {
                  console.error(
                    "Greška pri omogućavanju pristupa Darknet-u:",
                    error
                  );
                  this.toast.error("Error enabling Darknet access.");
                });
            } else {
              console.error("Korisnik s navedenim nickname-om ne postoji.");
            }
          })
          .catch((error) => {
            console.error("Greška pri dohvaćanju korisnika:", error);
          });
      } else {
        console.error("Nemate ovlasti za omogućavanje pristupa Darknet-u.");
      }
    },
    revokeDarknetAccess() {
      const nickname = this.$route.params.nickname;
      if (this.isAdmin() && nickname) {
        db.collection("users")
          .where("nickname", "==", nickname)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userId = querySnapshot.docs[0].id;
              const userRef = db.collection("users").doc(userId);
              userRef
                .update({
                  darknetAccess: false,
                })
                .then(() => {
                  console.log(
                    `Pristup Darknet-u onemogućen korisniku ${nickname}.`
                  );
                  this.toast.success(
                    "Access to the Darknet is disabled for the user."
                  );
                  this.fetchUserData();
                })
                .catch((error) => {
                  console.error(
                    "Greška pri onemogućavanju pristupa Darknet-u:",
                    error
                  );
                  this.toast.error("Error disabling Darknet access.");
                });
            } else {
              console.error("Korisnik s navedenim nickname-om ne postoji.");
            }
          })
          .catch((error) => {
            console.error("Greška pri dohvaćanju korisnika:", error);
          });
      } else {
        console.error("Nemate ovlasti za omogućavanje pristupa Darknet-u.");
      }
    },
    isAdmin() {
      const adminEmail = "admin@admin.com";
      return firebase.auth().currentUser.email === adminEmail;
    },
    deleteUser() {
      if (this.isAdmin()) {
        const nickname = this.$route.params.nickname;
        if (nickname) {
          db.collection("users")
            .where("nickname", "==", nickname)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const userId = querySnapshot.docs[0].id;
                const userRef = db.collection("users").doc(userId);
                userRef
                  .delete()
                  .then(() => {
                    this.toast.success("User successfully deleted.");
                    this.$router.push("/studentcorner");
                  })
                  .catch((error) => {
                    console.error("Error deleting user:", error);
                    this.toast.success("Error deleting user.");
                  });
              } else {
                console.error(
                  "User with the specified nickname does not exist."
                );
              }
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
            });
        } else {
          console.error("User nickname for deletion is not specified.");
        }
      } else {
        console.error("You do not have permission to delete users.");
      }
    },
    getCurrentUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = user;
        }
      });
    },
    fetchMessages() {
      db.collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          const messages = [];
          snapshot.forEach((doc) => {
            const messageData = doc.data();
            messages.push({
              id: doc.id,
              ...messageData,
            });
          });
          this.messages = messages;
          this.scrollToBottomChat();
        });
    },
    sendMessage() {
      if (this.newMessage.trim() === "") {
        return;
      }

      const senderEmail = this.currentUser.email;
      const receiverNickname = this.receiverNickname || senderEmail;

      const message = {
        text: this.newMessage,
        sender: senderEmail,
        senderNickname: this.currentUser.nickname,
        receiver: receiverNickname,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      db.collection("messages")
        .add(message)
        .then(() => {
          this.newMessage = "";
          this.scrollToBottomChat();
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    },
    scrollToBottomChat() {
      this.$nextTick(() => {
        const chatContent = this.$refs.chatContent;
        if (chatContent) {
          chatContent.scrollTop = chatContent.scrollHeight;
        }
      });
    },
    scrollToBottomPage() {
      this.$nextTick(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
    },
    openImageInput() {
      if (this.$refs.imageInput) {
        this.$refs.imageInput.click();
      }
    },
    toggleChatForm() {
      this.showChatForm = !this.showChatForm;
      this.scrollToBottomChat();
      this.scrollToBottomPage();
    },
    toggleEmoji(event) {
      event.preventDefault();
      this.showEmojiPicker = !this.showEmojiPicker;
      this.scrollToBottomPage();
    },
    onSelectEmoji(emoji) {
      this.newMessage += emoji.i;
      this.showEmojiPicker = false;
    },
  },
};
</script>
