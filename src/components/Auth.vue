<template>
  <div class="row">
    <div class="col s0 m3"></div>
    <div class="col s12 m6">
      <div class="card grey darken-3">
        <div class="card-content white-text">
          <img src="./../assets/neu_logo.png" width="180" height="180">
          <h3 class="white-text font-light">NEU Float Parade
            <br>Scoring System
          </h3>

          <form>
            <div class="row">
              <div class="col s0 l3"></div>
              <div class="col s12 l6 input-field">
                <input
                  type="text"
                  ref="first_name"
                  name="first-name"
                  class="validate"
                  v-model="first_name"
                  @keyup="onKeyUp($event)"
                >
                <label for="first-name">First Name</label>
              </div>
              <div class="col s0 l3"></div>
            </div>
            <div class="row">
              <div class="col s0 l3"></div>
              <div class="col s12 l6 input-field">
                <input
                  type="password"
                  ref="last_name"
                  name="last-name"
                  class="validate"
                  v-model="last_name"
                  @keyup="onKeyUp($event)"
                >
                <label for="last-name">Last Name</label>
              </div>
              <div class="col s0 l3"></div>
            </div>
          </form>

          <a
            href="#!"
            class="waves-effect waves-light btn-large blue"
            id="btnLogin"
            @click="login()"
          >Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import server_urls from "./../server-urls.js";
export default {
  data() {
    return {
      last_name: "",
      first_name: ""
    };
  },
  methods: {
    login() {
      axios
        .post(
          server_urls.login,
          { first_name: this.first_name, last_name: this.last_name },
          {
            withCredentials: true
          }
        )
        .then(res => {
          if (isNaN(res.data.judge_num)) {
            Materialize.toast(res.data, 3000);
          } else {
            this.$router.go("/");
          }
        });
    },
    onKeyUp(key) {
      if (key.code == "Enter") {
        this.login()
      }
    }
  },
  mounted() {
    this.$refs.last_name.focus();
    this.$refs.first_name.focus();
  }
};
</script>

<style>
</style>


