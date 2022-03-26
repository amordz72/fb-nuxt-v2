<template>
  <div class>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link class="nav-link active" aria-current="page" to="/"
                >Home</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/users">Users</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/posts">{{ email }} </nuxt-link>
            </li>
            <li class="nav-item" v-if="email">
              <a class="nav-link" @click="logout" style="cursor: pointer"
                >Logout
              </a>
            </li>
            <li class="nav-item" v-if="!email">
              <nuxt-link class="nav-link" to="/register">register </nuxt-link>
            </li>
            <li class="nav-item" v-if="!email">
              <nuxt-link class="nav-link" to="/login">login </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx9qy25IMH3IQJ-tH6aLSY3z9AfQkDjo8",
  authDomain: "my-stor-4f27b.firebaseapp.com",
  databaseURL:
    "https://my-stor-4f27b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-stor-4f27b",
  storageBucket: "my-stor-4f27b.appspot.com",
  messagingSenderId: "293670937750",
  appId: "1:293670937750:web:f323871617e40f31c34eb7",
  measurementId: "G-M2PE6PSDB0",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();

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
    logout: function logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
    login: async function () {
      var self = this;

      signInWithEmailAndPassword(auth, self.email, self.pw)
        .then((us) => {
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
          self.user = user;
          self.email = user.email.replace("@gmail.com", "");
        } else {
          self.$router.push({
            path: "/login",
          });
        }
      });
    },
    clear: function () {
      this.email = "";
      this.pw = "";
    },
  },
  mounted() {
    this.onAuthStateChanged();
  },
};
</script>


<style scoped>
.nuxt-link-exact-active {
  color: tomato !important;
}
</style>
