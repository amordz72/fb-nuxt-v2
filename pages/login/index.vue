
<template>
  <div class="container">
    <h1 class="h1 text-center">Login Form</h1>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <form class="w-75 mx-auto" @submit.prevent>
      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1-12 col-form-label"></label>
        <div class="col-sm-1-12">
          <input type="email" class="form-control" placeholder="email" v-model="email" />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1-12 col-form-label"></label>
        <div class="col-sm-1-12">
          <input type="password" class="form-control" placeholder="password" v-model="pw" />
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue
} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import {

  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp, query, where, orderBy, onSnapshot, getDoc,

} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx9qy25IMH3IQJ-tH6aLSY3z9AfQkDjo8",
  authDomain: "my-stor-4f27b.firebaseapp.com",
  databaseURL: "https://my-stor-4f27b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-stor-4f27b",
  storageBucket: "my-stor-4f27b.appspot.com",
  messagingSenderId: "293670937750",
  appId: "1:293670937750:web:f323871617e40f31c34eb7",
  measurementId: "G-M2PE6PSDB0"
};



const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();



export default {
  data() {
    return {
      email: "",
      pw: "",
      accessToken: "",
      msg: "",
      user: []


    }
  },
  methods: {

    login: async function () {
      var self = this;


      signInWithEmailAndPassword(auth, self.email, self.pw).then((us) => {
        /*
         self.accessToken = us.user.accessToken
             self.user = us.user
           window.location.href = "vue-page.html";
       */


      }).

        catch((e) => {
          self.msg = e
        })




    },

    createUser: async function () {
      var self = this;
      const colRef = collection(db, "users");

      createUserWithEmailAndPassword(auth, self.email, self.pw).then((us) => {



        /*     this.clear()  window.location.href = "vue-page.html";
        self.user = us.user
        self.accessToken = us.user.accessToken
        */
      }).

        catch((e) => {
          self.msg = e
        })


    },
    onAuthStateChanged: function () {
      var self = this
      onAuthStateChanged(auth, (user) => {

        if (user != null) {

          self.$router.push({
            path: '/'
          })
        }
        else {

            self.$router.push({
            path: '/login'
          })
         
        }

      })
    },
    clear: function () {

      this.email = ""
      this.pw = ""

    }
  },
  mounted() {
    this.clear()
    this.onAuthStateChanged()

  }
}
</script>

<style>
</style>


