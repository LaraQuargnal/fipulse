<template>
  <div class="password-input">
    <input
      :type="inputType"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder"
      :value="visiblePassword"
      @input="updateValue($event.target.value)"
    />
    <button type="button" @click="togglePasswordVisibility" class="eye-button">
      <fa icon="fa-eye" v-if="passwordVisible" class="eye-icon"></fa>
      <fa icon="fa-eye-slash" v-else class="eye-icon"></fa>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    inputId: String,
    placeholder: String,
    value: String,
  },
  data() {
    return {
      passwordVisible: false,
      inputType: "password",
      visiblePassword: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      this.inputType = this.passwordVisible ? "text" : "password";
    },
    updateValue(value) {
      this.visiblePassword = value;
      this.$emit("passwordInput", value);
    },
  },
};
</script>

<style scoped>
.password-input {
  display: flex;
  align-items: center;
}
.eye-button {
  background: none;
  border: none;
  cursor: pointer;
}
.eye-icon {
  font-size: 1.2em;
}
</style>
