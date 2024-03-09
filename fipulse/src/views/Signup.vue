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
                  type="password"
                  class="form-control"
                  id="exampleInputConfirmPassword"
                  :placeholder="$t('confirmPassword')"
                />
              </div>
              <button
                type="submit"
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
  