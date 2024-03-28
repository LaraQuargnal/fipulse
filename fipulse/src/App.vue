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
        <router-link v-if="!currentUser" to="/home">{{
          $t("navBarHome")
        }}</router-link>
        |
        <router-link v-if="!currentUser" to="/posts">{{
          $t("navBarPosts")
        }}</router-link>
        |
        <router-link v-if="!currentUser" to="/login">{{
          $t("navBarLogin")
        }}</router-link>
        |
        <router-link v-if="!currentUser" to="/signup">{{
          $t("navBarSignup")
        }}</router-link>
        |
        <router-link v-if="!currentUser" to="/usercard">{{
          $t("navBarUserCard")
        }}</router-link>
        |
        <router-link
          v-if="!currentUser"
          to="/logout"
          @click.prevent="logout()"
          >{{ $t("navBarLogOut") }}</router-link
        >
        |
        <div class="dropdown" v-if="!currentUser">
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
      </div>
    </nav>
    <router-view />
  </nav>
</template>

<script>
import store from "@/store";
import i18n from "@/plugins/i18n";
import { auth } from "@/firebase";
import router from "@/router";

auth.onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    console.log(user.email);
    store.currentUser = user.email;

    if (!currentRoute?.meta?.requiresAuth) {
    }
  } else {
    console.log("No user.");
    store.currentUser = null;
    if (currentRoute?.meta?.requiresAuth) {
      router.push({ name: "login" });
    }
  }
});

export default {
  data() {
    return {
      store,
      languages: [
        { language: "en", title: "English" },
        { language: "hr", title: "Hrvatski" },
      ],
    };
  },
  watch: {
    "$store.state.currentUser"(newVal, oldVal) {
      // Handle changes to the currentUser state
      // For example, you can perform navigation logic here
      if (newVal !== null) {
        // User is logged in, navigate to the appropriate route
        this.$router.push({ name: "home" });
      } else {
        // User is logged out, navigate to the login route
        this.$router.push({ name: "login" });
      }
    },
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    changeLocale(locale) {
      i18n.global.locale = locale;
    },
  },
  computed: {
    currentUser() {
      return store.currentUser !== null;
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
