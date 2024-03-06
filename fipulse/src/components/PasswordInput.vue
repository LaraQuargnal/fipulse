<template>
  <div class="password-input">
    <input
      :type="passwordVisible ? 'text' : 'password'"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder"
    />
    <button
      type="button"
      @click="togglePasswordVisibility"
      style="font-size: 24px; padding: 10px"
    >
      <!-- TO DO: add eye icon -->

      <i v-show="passwordVisible" class="fa-eye" style="font-size: 24px"></i>
      <i
        v-show="!passwordVisible"
        class="fa-eye-slash"
        style="font-size: 24px"
      ></i>
    </button>
  </div>
</template>
  
  
  <script>
export default {
  props: {
    inputId: String,
    placeholder: String,
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      const passwordInput = document.getElementById(this.inputId);
      if (this.passwordVisible) {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    },
  },
};
</script>
  
  <style scoped>
.password-input {
  position: relative;
}

.password-input button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
  