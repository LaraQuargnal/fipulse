<template>
  <div class="password-input">
    <input
      :type="passwordVisible ? 'text' : 'password'"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder"
    />
    <button type="button" @click="togglePasswordVisibility" class="eye-button">
      <fa icon="fa-eye" v-show="passwordVisible" class="eye-icon"></fa>
      <fa icon="fa-eye-slash" v-show="!passwordVisible" class="eye-icon"></fa>
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