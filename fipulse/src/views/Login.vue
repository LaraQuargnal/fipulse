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
      $t("loginEmailAddress") }}</label>
                <input type="email" v-model="username" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp" :placeholder="$t('enterEmail')" />
                <small id="emailHelp" class="form-text text-muted">{{
      $t("loginEmailNote") }}</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" style="margin-top: 10px">{{
      $t("passwordLabel") }}</label>
                <input v-model="password" inputId="exampleInputPassword1" :placeholder="$t('passwordLabel')" />
              </div>
              <button type="button" @click="login()" class="btn btn-primary" style="margin-top: 30px">
                {{ $t("submit") }}</button>
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential) => {
          // Uspješna registracija
          console.log('Uspješna prijava.', userCredential.user);
        })
        .catch((error) => {
          // Greška prilikom registracije
          console.error('Došlo je do greške.', error);
        });
    }
  },
  components: {
    "password-input": PasswordInput,
  },
};
</script>

<style>
@import "@/styles/styles.css";
</style>
