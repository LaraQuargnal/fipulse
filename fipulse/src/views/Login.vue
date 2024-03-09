<template>
  <div class="about">
    <h1>{{ $t("loginTitle") }}</h1>
    <p style="font-size: 14px">
      {{ $t("loginNoAccountYet") }}
      <router-link to="/signup">{{ $t("signUp") }}</router-link>
    </p>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="login-box">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1" style="margin-top: 10px">{{
                  $t("loginEmailAddress")
                }}</label>
                <input
                  type="email"
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
                <password-input
                  inputId="exampleInputPassword1"
                  :placeholder="$t('passwordLabel')"
                ></password-input>
              </div>
              <button
                type="submit"
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

<style>
@import "@/styles/styles.css";
</style>

<script>
import PasswordInput from "@/components/PasswordInput.vue";

export default {
  components: {
    "password-input": PasswordInput,
  },
};
</script>
