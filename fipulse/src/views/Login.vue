<template>
  <div class="login">
    <h1>{{ $t("loginTitle") }}</h1>
    <p class="subtitle">
      {{ $t("loginNoAccountYet") }}
      <router-link to="/signup">{{ $t("signUp") }}</router-link>
    </p>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="login-box">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="exampleInputEmail1" style="margin-top: 10px">{{
                  $t("loginEmailAddress")
                }}</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  :placeholder="$t('enterEmail')"
                />
                <small id="emailHelp" class="form-text text-muted">{{
                  $t("loginEmailNote")
                }}</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" style="margin-top: 10px">{{
                  $t("passwordLabel")
                }}</label>
                <input
                  v-model="password"
                  inputId="exampleInputPassword1"
                  :placeholder="$t('passwordLabel')"
                />
              </div>
              <button
                type="button"
                @click="login()"
                class="btn btn-primary"
                style="margin-top: 30px"
              >
                {{ $t("submit") }}
              </button>
            </form>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput.vue";
import { firebase } from "@/firebase";
import store from "@/store";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          console.log("Uspješna prijava.", userCredential.user.email);
          store.currentUser = userCredential.user.email;
          console.log("* store.currentUser:", store.currentUser);
          console.log(
            "User is logged in:",
            firebase.auth().currentUser
              ? firebase.auth().currentUser.email
              : "No user logged in"
          );

          this.$router.replace({ name: "home" });
        })
        .catch((error) => {
          console.error("Došlo je do greške login.", error);
        });
    },
  },
  components: {
    "password-input": PasswordInput,
  },
};
</script>

<style>
@import "@/styles/styles.css";
</style>
