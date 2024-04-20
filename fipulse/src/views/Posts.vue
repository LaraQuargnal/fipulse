<template>
  <div class="posts">
    <div class="row">
      <div class="col-2">
        <div class="box-title">{{ $t("browseCategories") }}</div>
        <div class="dropdown" :class="{ open: isOpen && activeDropdown === 1 }">
          <button
            ref="menuButton1"
            class="menu-button"
            @click="toggleDropdown(1)"
          >
            <span class="button-text">{{ $t("firstUndergraduate") }}</span>
            <span class="button-sign">{{
              activeDropdown === 1 && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === 1"
            :style="{ width: dropdownWidth + 'px' }"
          >
            <button @click="selectMenuItem('Subject1')">Subject1</button>
            <button @click="selectMenuItem('Subjet2')">Subject2</button>
            <button @click="selectMenuItem('Subject3')">Subject3</button>
          </div>
        </div>
        <div class="dropdown" :class="{ open: isOpen && activeDropdown === 2 }">
          <button
            ref="menuButton2"
            class="menu-button"
            @click="toggleDropdown(2)"
          >
            <span class="button-text">{{ $t("secondUndergraduate") }}</span>
            <span class="button-sign">{{
              activeDropdown === 2 && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === 2"
            :style="{ width: dropdownWidth + 'px' }"
          >
            <button @click="selectMenuItem('Subject4')">Subject4</button>
            <button @click="selectMenuItem('Subjet5')">Subject5</button>
            <button @click="selectMenuItem('Subject6')">Subject6</button>
          </div>
        </div>
        <div class="dropdown" :class="{ open: isOpen && activeDropdown === 3 }">
          <button
            ref="menuButton3"
            class="menu-button"
            @click="toggleDropdown(3)"
          >
            <span class="button-text">{{ $t("thirdUndergraduate") }}</span>
            <span class="button-sign">{{
              activeDropdown === 3 && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === 3"
            :style="{ width: dropdownWidth + 'px' }"
          >
            <button @click="selectMenuItem('Subject4')">Subject4</button>
            <button @click="selectMenuItem('Subjet5')">Subject5</button>
            <button @click="selectMenuItem('Subject6')">Subject6</button>
          </div>
        </div>
        <div class="dropdown" :class="{ open: isOpen && activeDropdown === 4 }">
          <button
            ref="menuButton4"
            class="menu-button"
            @click="toggleDropdown(4)"
          >
            <span class="button-text">{{ $t("firstGraduate") }}</span>
            <span class="button-sign">{{
              activeDropdown === 4 && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === 4"
            :style="{ width: dropdownWidth + 'px' }"
          >
            <button @click="selectMenuItem('Subject4')">Subject4</button>
            <button @click="selectMenuItem('Subjet5')">Subject5</button>
            <button @click="selectMenuItem('Subject6')">Subject6</button>
          </div>
        </div>
        <div class="dropdown" :class="{ open: isOpen && activeDropdown === 5 }">
          <button
            ref="menuButton5"
            class="menu-button"
            @click="toggleDropdown(5)"
          >
            <span class="button-text">{{ $t("secondGraduate") }}</span>
            <span class="button-sign">{{
              activeDropdown === 5 && isOpen ? "▲" : "▼"
            }}</span>
          </button>
          <div
            class="dropdown-content"
            v-show="isOpen && activeDropdown === 5"
            :style="{ width: dropdownWidth + 'px' }"
          >
            <button @click="selectMenuItem('Subject4')">Subject4</button>
            <button @click="selectMenuItem('Subjet5')">Subject5</button>
            <button @click="selectMenuItem('Subject6')">Subject6</button>
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
        <div class="box-title" style="margin-top: 30px">RECENT POSTS</div>
        <PostsCard :cards="filteredCards" :key="cards.id" />
      </div>
      <div class="col-3" style="padding-left: 50px">
        <div
          class="col-content"
          style="
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
            padding-bottom: 40px;
          "
        >
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
import PostsCard from "@/components/PostsCard.vue";
import store from "@/store";
import { db } from "@/firebase";
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";

const isModalOpened = ref(false);

const submitHandler = () => {};

export default {
  name: "Posts",
  components: {
    PostsCard,
    ModalComponent,
  },
  data() {
    return {
      cards: [],
      isOpen: false,
      isModalOpened: isModalOpened,
      submitHandler: submitHandler,
      activeDropdown: null,
      dropdownWidth: 0,
      store: store,
    };
  },
  mounted() {
    this.getPosts();
  },
  computed: {
    filteredCards() {
      let searchTerm = this.store.searchTerm.toLowerCase();
      return this.cards.filter((card) =>
        ["title", "subject", "comment", "user"].some((prop) => {
          const value = card[prop];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
          );
        })
      );
    },
  },

  methods: {
    openModal() {
      console.log("Opening modal");
      this.isModalOpened = true;
    },
    closeModal() {
      this.isModalOpened = false;
    },
    getPosts() {
      db.collection("posts")
        .orderBy("postead_at", "desc")
        //.limit(20)
        .get()
        .then((querySnapshot) => {
          this.cards = [];
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            this.cards.push({
              id: doc.id,
              time: doc.data().time,
              user: doc.data().user,
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
      // TODO: cekamo bazu da dodamo na klik na item
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
  width: 100%;
}

.menu-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #808080;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 5px;
}

.open .dropdown-content {
  display: block;
}

.dropdown-content button {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.button-text {
  flex: 1;
}

.button-sign {
  margin-right: 10px;
  padding-right: 10px;
}
</style>