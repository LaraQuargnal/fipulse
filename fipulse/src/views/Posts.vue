<template>
  <div class="posts">
    <div class="row">
      <div class="col-2">
        <div class="box-title">{{ $t("browseCategories") }}</div>
        <div
          v-for="(dropdown, index) in dropdowns"
          :key="index"
          class="dropdown"
          :class="{ open: isOpen && activeDropdown === index }"
        >
          <button
            :ref="'menuButton' + index"
            class="menu-button"
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
        <button class="box-title" style="margin-top: 30px" @click="clearFilter">
          {{ $t("postsAllPosts") }}
        </button>
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
    this.getPosts();
    this.getSubjects();
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
      this.store.searchTerm = item;
    },
    clearFilter() {
      this.store.searchTerm = "";
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
  width: 100%;
}

.open .dropdown-content {
  display: block;
}

.dropdown-content button {
  text-align: left;
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
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