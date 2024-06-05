<template>
  <div class="posts">
    <div class="row">
      <div class="col-2">
        <div class="box-titlePosts">{{ $t("browseCategories") }}</div>
        <div
          v-for="(dropdown, index) in dropdowns"
          :key="index"
          class="dropdown"
          :class="{ open: isOpen && activeDropdown === index }"
        >
          <button
            :ref="'menuButton' + index"
            class="menu-buttonPosts"
            @click="toggleDropdown(index)"
          >
            <span class="button-text">{{ dropdown.label }}</span>
            <span class="button-sign">{{
              activeDropdown === index && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === index"
          >
            <button
              style="width: 100%"
              v-for="(item, itemIndex) in dropdown.items"
              :key="itemIndex"
              @click="selectMenuItem(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-7" style="text-align: center">
        <button
          type="submit"
          class="btn btn-primary"
          @click="openModal"
          style="margin-top: 20px; width: 300px"
        >
          {{ $t("addPost") }}
        </button>
        <ModalComponent
          :isOpen="isModalOpened"
          @modal-close="closeModal"
          @submit="submitHandler"
          name="first-modal"
          :getPosts="getPosts"
        >
        </ModalComponent>
        <button
          class="box-titlePosts"
          style="margin-top: 30px"
          @click="clearFilter"
        >
          {{ $t("postsAllPosts") }}
        </button>
        <PostsCard
          :cards="filteredCards"
          :currentUserHasLiked="currentUserHasLiked"
          :toggleFavorite="toggleFavorite"
          :key="cards.id"
        />
      </div>
      <div class="col-3" style="padding-left: 50px">
        <div class="col-content">
          <form class="d-flex" role="search">
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
import PostsCard from "@/components/PostsCard.vue";
import store from "@/store";
import UserList from "@/components/UserList.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { useToast } from "vue-toastification";
import "../styles/posts.css";

const isModalOpened = ref(false);

const submitHandler = () => {};

export default {
  name: "Posts",
  components: {
    PostsCard,
    ModalComponent,
    UserList,
  },
  data() {
    return {
      cards: [],
      dropdowns: [],
      isOpen: false,
      isModalOpened: isModalOpened,
      submitHandler: submitHandler,
      activeDropdown: null,
      dropdownWidth: 0,
      store: store,
      subjects: [],
      dropdowns: [],
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
    this.toast = useToast();
    this.getPosts();
    this.getSubjects();
  },
  computed: {
    filteredCards() {
      let searchTerm = this.store.searchTerm.toLowerCase();
      return this.cards.filter((card) =>
        ["title", "subject", "comment", "user", "userDisplayName"].some(
          (prop) => {
            const value = card[prop];
            return (
              typeof value === "string" &&
              value.toLowerCase().includes(searchTerm)
            );
          }
        )
      );
    },
  },
  methods: {
    openUserCard(user) {
      this.$router.push({
        name: "UserCardWithNickname",
        params: { nickname: user.nickname },
      });
    },
    openModal() {
      console.log("Opening modal");
      this.isModalOpened = true;
    },
    closeModal() {
      this.isModalOpened = false;
    },
    getSubjects() {
      db.collection("subjects")
        .get()
        .then((querySnapshot) => {
          const undergradDropdowns = [];
          const gradDropdowns = [];
          querySnapshot.forEach((doc) => {
            const label = doc.data().label;
            const name = doc.data().name;
            if (label.includes("Undergraduate")) {
              this.addSubjectsToDropdown(undergradDropdowns, label, name);
            } else if (label.includes("Graduate")) {
              this.addSubjectsToDropdown(gradDropdowns, label, name);
            }
          });
          this.sortAndConcatDropdowns(undergradDropdowns, gradDropdowns);
        })
        .catch((error) => {
          console.log("Error getting subjects: ", error);
        });
    },
    addSubjectsToDropdown(dropdowns, label, name) {
      let dropdownIndex = dropdowns.findIndex(
        (dropdown) => dropdown.label === label
      );
      if (dropdownIndex === -1) {
        dropdownIndex = dropdowns.length;
        dropdowns.push({
          label: label,
          items: [],
        });
      }
      dropdowns[dropdownIndex].items.push(name);
    },
    sortAndConcatDropdowns(undergradDropdowns, gradDropdowns) {
      undergradDropdowns.sort((a, b) => a.label.localeCompare(b.label));
      gradDropdowns.sort((a, b) => a.label.localeCompare(b.label));
      this.dropdowns = [...undergradDropdowns, ...gradDropdowns];
    },
    getPosts() {
      db.collection("posts")
        .orderBy("postead_at", "desc")
        //.limit(20)
        .get()
        .then((querySnapshot) => {
          this.cards = [];
          querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            this.cards.push({
              id: doc.id,
              time: doc.data().time,
              user: doc.data().user,
              userDisplayName: doc.data().userDisplayName,
              date: doc.data().postead_at,
              title: doc.data().title,
              subject: doc.data().subject,
              comment: doc.data().comment,
              attachment: doc.data().attachment,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    toggleDropdown(dropdownNumber) {
      console.log("Toggling dropdown state");
      if (this.activeDropdown === dropdownNumber) {
        this.isOpen = !this.isOpen;
      } else {
        this.isOpen = true;
        this.activeDropdown = dropdownNumber;
      }
      if (this.isOpen) {
        this.dropdownWidth =
          this.$refs[`menuButton${dropdownNumber}`].offsetWidth;
      }
    },
    selectMenuItem(item) {
      console.log(`Selected menu item: ${item}`);
      this.store.searchTerm = item;
    },
    clearFilter() {
      this.store.searchTerm = "";
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

      if (post.user === userEmail) {
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

      db.collection("posts")
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
};
</script>
