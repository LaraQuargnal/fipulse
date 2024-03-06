<template>
  <div class="signup">
    <h1>Sign up</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="login-box">
            <form>
              <div class="form-group">
                <label for="exampleInputName" style="margin-top: 10px"
                  >Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputName"
                  placeholder="Choose name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail2" style="margin-top: 10px"
                  >Email address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2" style="margin-top: 10px"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleInputConfirmPassword"
                  style="margin-top: 10px"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputConfirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style="margin-top: 20px"
              >
                Sign Up
              </button>
              <p style="font-size: 14px; margin-top: 20px">
                Already have an account?
                <router-link to="/login">Login</router-link>
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
  