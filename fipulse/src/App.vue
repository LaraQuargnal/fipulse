<template>
  <nav>
    <nav class="navbar bg-body-tertiary" style="margin-bottom: 20px">
      <div class="container-fluid">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          height="45"
          class="d-inline-blockojk align-text-top"
        />
        <router-link v-if="isVisible" to="/home">{{
          $t("navBarHome")
        }}</router-link>
        |
        <router-link v-if="isVisible" to="/posts">{{
          $t("navBarPosts")
        }}</router-link>
        |
        <router-link v-if="!isVisible" to="/login">{{
          $t("navBarLogin")
        }}</router-link>
        |
        <router-link v-if="!isVisible" to="/signup">{{
          $t("navBarSignup")
        }}</router-link>
        |
        <router-link v-if="isVisible" to="/usercard">{{
          $t("navBarUserCard")
        }}</router-link>
        |
        <router-link v-if="isVisible" to="/studentcorner">{{
          $t("navBarStudentCorner")
        }}</router-link>
        |
        <router-link v-if="isVisible" to="/logout" @click.prevent="logout()">{{
          $t("navBarLogOut")
        }}</router-link>
        |
        <div class="dropdown">
          <button
            class="btn btn-link dropdown-toggle custom-dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ $t("navBarLanguage") }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button
              v-for="entry in languages"
              :key="entry.title"
              @click="changeLocale(entry.language)"
              class="dropdown-item"
            >
              {{ entry.title }}
            </button>
          </div>
        </div>
      </div>
    </nav>
    <SplashScreen v-if="showSplash" />
    <router-view v-else />
  </nav>
</template>

<script>
import store from "@/store";
import i18n from "@/plugins/i18n";
import router from "@/router";
import SplashScreen from "./views/SplashScreen.vue";
import { firebase } from "@/firebase";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.currentUser = user.email;
  } else {
    store.currentUser = null;
    router.push({ name: "login" });
  }
});

export default {
  name: "app",
  components: {
    SplashScreen,
  },
  data() {
    return {
      languages: [
        { language: "en", title: "English" },
        { language: "hr", title: "Hrvatski" },
      ],
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
    changeLocale(locale) {
      i18n.global.locale = locale;
    },
  },
  computed: {
    isVisible() {
      return this.$route.meta.requiresAuth === true;
    },

    currentUser() {
      return store.currentUser;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.custom-dropdown-toggle {
  background-color: transparent !important;
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  border: none !important;
  color: #2c3e50 !important;
  font-weight: bold !important;
}
</style>
