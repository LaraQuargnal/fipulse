<template>
  <nav>
    <nav class="navbar bg-body-tertiary" style="margin-bottom: 20px">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            height="35"
            class="d-inline-block align-text-top"
          />
        </a>
        <router-link to="/home">{{ $t("navBarHome") }}</router-link> |
        <router-link to="/posts">{{ $t("navBarPosts") }}</router-link> |
        <router-link to="/login">{{ $t("navBarLogin") }}</router-link> |
        <router-link to="/signup">{{ $t("navBarSignup") }}</router-link> |
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
      </div>
    </nav>
    <router-view />
  </nav>
</template>

<script>
import i18n from "@/plugins/i18n";

export default {
  data() {
    return {
      languages: [
        { language: "en", title: "English" },
        { language: "hr", title: "Hrvatski" },
      ],
    };
  },
  methods: {
    changeLocale(locale) {
      i18n.global.locale = locale;
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
