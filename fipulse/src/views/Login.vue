<template>
  <div class="about">
    <h1>Login to Your Account</h1>
    <p style="font-size: 14px">
      Don't have an account yet? <router-link to="/signup">Sign up</router-link>
    </p>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="login-box">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1" style="margin-top: 10px"
                  >Email address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" style="margin-top: 10px"
                  >Password</label
                >
                <password-input
                  inputId="exampleInputPassword1"
                  placeholder="Password"
                ></password-input>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style="margin-top: 30px"
              >
                Submit
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
