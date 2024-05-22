<template>
  <div class="signup">
    <h1>{{ $t("signupTitle") }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="login-box">
            <form>
              <div class="form-group">
                <label for="exampleInputName" style="margin-top: 10px">{{
                  $t("signupName")
                }}</label>
                <input
                  type="text"
                  v-model="nickname"
                  class="form-control"
                  id="exampleInputName"
                  :placeholder="$t('chooseName')"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail2" style="margin-top: 10px">{{
                  $t("loginEmailAddress")
                }}</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  :placeholder="$t('enterEmail')"
                />
                <small id="emailHelp" class="form-text text-muted">{{
                  $t("loginEmailNote")
                }}</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2" style="margin-top: 10px">{{
                  $t("passwordLabel")
                }}</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  :placeholder="$t('passwordLabel')"
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleInputConfirmPassword"
                  style="margin-top: 10px"
                  >{{ $t("confirmPassword") }}</label
                >
                <input
                  type="passwordConfirm"
                  v-model="passwordConfirm"
                  class="form-control"
                  id="exampleInputConfirmPassword"
                  :placeholder="$t('confirmPassword')"
                />
              </div>
              <button
                type="button"
                @click="signup"
                class="btn btn-primary"
                style="margin-top: 20px"
              >
                {{ $t("signUp") }}
              </button>
              <p style="font-size: 14px; margin-top: 20px">
                {{ $t("alreadyhaveAccount") }}
                <router-link to="/login">{{ $t("navBarLogin") }}</router-link>
              </p>
            </form>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@/styles/styles.css";
</style>

<script>
import { firebase } from "@/firebase";
import { useToast } from "vue-toastification";

export default {
  name: "signup",
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    signup() {
      if (!this.email.endsWith("@unipu.hr")) {
        this.toast.error("Only @unipu.hr email addresses are allowed.");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.toast.success("Registration success.");
          console.log("Uspješna registracija.", userCredential.user);
          const user = userCredential.user;
          user
            .updateProfile({
              displayName: this.nickname,
            })
            .then(() => {
              if (this.email === "teaa15@gmail.com") {
                user.updateProfile({
                  darknetAccess: true,
                });
              }
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                  nickname: this.nickname,
                  email: user.email,
                })
                .catch((error) => {
                  this.toast.error("Error saving user data.");
                  console.error("Greška pri spremanju podataka.", error);
                });
            })
            .catch(function (error) {
              this.toast.error("Error.");
              console.error("Došlo je do greške.", error);
            });
        });
    },
  },
};
</script>
