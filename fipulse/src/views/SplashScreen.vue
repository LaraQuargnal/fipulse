<template>
  <div>
    <div class="splash-screen" :class="{ 'show': showSplash }">
      <img alt="Vue logo" src="@/assets/logoPrivremeni.png" />
      <h1>Welcome to Your Vue.js App</h1>
    </div>
    <router-view v-if="!showSplash" /> <!-- Render router-view when splash screen is hidden -->
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
  data() {
    return {
      showSplash: false // Initially set to false to prevent immediate display
    };
  },
  mounted() {
    // Show splash screen with fade-in animation
    setTimeout(() => {
      this.showSplash = true;
      // Hide splash screen with fade-out animation after a delay
      setTimeout(() => {
        this.showSplash = false;
        // Navigate to the home page after the splash screen fades out
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 500); // Adjust the delay time as needed
      }, 4000); // Adjust the delay time as needed
    }, 500); // Adjust the delay time as needed to allow Vue to render
  },
};
</script>

<style scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0; /* Initial opacity set to 0 */
  transition: opacity 0.5s ease-in-out; /* Define the transition */
}

.splash-screen.show {
  opacity: 1; /* Make the splash screen visible */
}
</style>
