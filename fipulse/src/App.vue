<template>
  <nav>
    <nav class="navbar bg-body-tertiary" style="margin-bottom: 20px">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/logoPrivremeni.png"
            alt="Logo"
            height="35"
            class="d-inline-block align-text-top"
          />
        </a>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link> |
        <div class="dropdown">
          <button
            class="btn btn-link dropdown-toggle custom-dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Language
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="dropdown-item" to="">EN</router-link>
            <router-link class="dropdown-item" to="">HR</router-link>
          </div>
        </div>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <router-view />
  </nav>
</template>

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
