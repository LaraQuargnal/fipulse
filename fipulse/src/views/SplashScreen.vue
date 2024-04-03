<template>
  <div>
    <div class="splash-screen" :class="{ show: showSplash }">
      <img alt="FIPULSE logo" src="@/assets/logo.png" class="logo" />
      <h1>Welcome to FIPULSE page.</h1>
    </div>
  </div>
</template>

<script>
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

<style scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.splash-screen.show {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.logo {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>
