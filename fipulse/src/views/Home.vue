<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png" class="logo" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.logo {
  width: 100%;
  /* Set the width of the logo to 20% of its container (the splash screen div) */
  max-width: 500px;
  /* Set a maximum width for the logo */
  height: auto;
  /* Maintain the aspect ratio of the logo */
}
</style>
