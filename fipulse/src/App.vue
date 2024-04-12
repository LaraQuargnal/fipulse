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
        <router-link v-if="store.currentUser" to="/home">{{
          $t("navBarHome")
        }}</router-link>
        |
        <router-link v-if="isPostsVisible" to="/posts">{{
          $t("navBarPosts")
        }}</router-link>

        |
        <router-link v-if="!store.currentUser" to="/login">{{
          $t("navBarLogin")
        }}</router-link>

        |
        <router-link v-if="!store.currentUser" to="/signup">{{
          $t("navBarSignup")
        }}</router-link>
        |
        <router-link v-if="store.currentUser" to="/usercard">{{
          $t("navBarUserCard")
        }}</router-link>
        |
        <router-link v-if="store.currentUser" to="/logout">{{
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
        <!--
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            :placeholder="$t('navBarSearch')"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            {{ $t("navBarSearch") }}
          </button>
        </form>
        -->
        <a
          href="#"
          v-if="store.currentUser"
          @click.prevent="logout()"
          class="nav-link"
        >
          {{ $t("navBarLogOut") }}</a
        >
      </div>
    </nav>
    <router-view />
  </nav>
</template>

<script>
import store from "@/store";
import i18n from "@/plugins/i18n";
//import { app, auth } from "@/firebase";
//import { auth } from "@/firebase";
import router from "@/router";
import { firebase } from "@/firebase";

firebase.auth().onAuthStateChanged((user) => {
  console.log(
    "Auth state changed. Current user:",
    user ? user.email : "No user"
  );

  const currentRoute = router.currentRoute;

  if (user) {
    console.log(user.email);
    console.log("User is logged in. Email:", user.email);
    store.currentUser = user.email;
    router.push({ name: "home" });

    console.log("store.currentUser updated:", store.currentUser);
  } else {
    console.log("No user.");
    store.currentUser = null;
    router.push({ name: "login" });
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
      languages: [
        { language: "en", title: "English" },
        { language: "hr", title: "Hrvatski" },
      ],
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logout successful.");

          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },
    changeLocale(locale) {
      i18n.global.locale = locale;
    },
  },
  computed: {
    isPostsVisible() {
      const currentRoute = this.$route;
      return currentRoute.meta.requiresAuth === true;
    },

    currentUser() {
      console.log("***** store.currentUser:", store.currentUser);
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
