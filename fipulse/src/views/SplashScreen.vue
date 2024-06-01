<template>
  <div>
    <div class="splash-screen" :class="{ show: showSplash }">
      <img alt="FIPULSE logo" src="@/assets/logo.png" class="logo" />
      <h1>Welcome to FIPULSE page.</h1>
    </div>
  </div>
</template>

<script>
import "../styles/splashScreen.css";

export default {
  name: "SplashScreen",
  data() {
    return {
      showSplash: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showSplash = true;
      setTimeout(() => {
        this.showSplash = false;
        setTimeout(() => {
          this.$emit("splashFinished");
          this.$router.push({ name: "login" });
        }, 500);
      }, 4000);
    }, 500);
  },
};
</script>
