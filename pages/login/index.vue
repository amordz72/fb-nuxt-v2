
<template>
  <div class="container">
    <h1 class="h1 text-center">Login Form</h1>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <form class="w-75 mx-auto" @submit.prevent>
      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1-12 col-form-label"></label>
        <div class="col-sm-1-12">
          <input
            type="email"
            class="form-control"
            placeholder="email"
            v-model="email"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1-12 col-form-label"></label>
        <div class="col-sm-1-12">
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="pw"
          />
        </div>
      </div>
    </form>
    <div class="mb-3 row mt-5">
      <div class="offset-sm-2 col-sm-10">
        <button type="submit" class="btn btn-primary me-2" @click="login">
          login
          <span class="material-icons md-36">input</span>
        </button>

        <button type="submit" class="btn btn-info" @click="createUser">
          Reginter
          <span class="material-icons md-36">face</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { auth, db } from "../../assets/js/firebaseConfig";

export default {
  data() {
    return {
      email: "",
      pw: "",
      accessToken: "",
      msg: "",
      user: [],
    };
  },
  methods: {
    ...mapMutations({
      logout: "auth/logout",
    }),
    login: async function () {
      var self = this;

      signInWithEmailAndPassword(auth, self.email, self.pw)
        .then((us) => {
          self.$store.commit("auth.login", us);
          /*
                self.accessToken = us.user.accessToken
                    self.user = us.user
                  window.location.href = "vue-page.html";
              */
        })
        .catch((e) => {
          self.msg = e;
        });
    },

    createUser: async function () {
      var self = this;
      const colRef = collection(db, "users");

      createUserWithEmailAndPassword(auth, self.email, self.pw)
        .then((us) => {
          /*     this.clear()  window.location.href = "vue-page.html";
        self.user = us.user
        self.accessToken = us.user.accessToken
        */
        })
        .catch((e) => {
          self.msg = e;
        });
    },
    onAuthStateChanged: function () {
      var self = this;
      onAuthStateChanged(auth, (user) => {
        if (user != null) {
          self.$router.push({
            path: "/",
          });
        } else {
          $redirect("/login");
        }
      });
    },
    clear: function () {
      this.email = "";
      this.pw = "";
    },
  },
  mounted() {
    this.clear();
    this.onAuthStateChanged();
  },
};
</script>

<style>
</style>


