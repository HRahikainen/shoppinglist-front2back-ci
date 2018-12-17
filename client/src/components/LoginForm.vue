<template>
  <div class="row">
    <form class="col s12" v-on:submit.prevent>
      <div class="row">
        <div class="input-field col s8 m6 offset-s2 offset-m3">
          <input
            id="email-field"
            type="email"
            name="email"
            placeholder="email"
            v-model="email"
            required
          >
          <label for="email-field">Email:</label>
          <input
            id="password-field"
            type="password"
            name="password"
            placeholder="password"
            v-model="password"
            required
          >
          <label for="password-field">Email:</label>
        </div>
        <div class="row">
          <div class="col s8 m6 offset-s2 offset-m3">
            <a id="login-btn" class="waves-effect waves-light btn-small" @click="logIn">Login</a>
            <a
              id="register-btn"
              class="waves-effect waves-light btn-small"
              @click="register"
            >Register</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    logIn() {
      if (this.password.length > 0 && this.email.length > 0) {
        axios
          .post("http://localhost:3000/users/login", {
            user: {
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            // TODO: Token-cookie stuff
            if (response.status == 200) {
              this.$emit("authenticated", true);
            }
          })
          .catch(function(error) {
            // eslint-disable-next-line
            console.log(error);
          });
      }
    },
    register() {
      if (this.password.length > 0 && this.email.length > 0) {
        axios
          .post("http://localhost:3000/users", {
            user: {
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            // TODO: Token-cookie stuff
            // eslint-disable-next-line
            console.log(response.user);
          })
          .catch(function(error) {
            // eslint-disable-next-line
            console.log(error);
          });
      }
    }
  }
};
</script>
