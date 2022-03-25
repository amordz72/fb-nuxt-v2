<template>
  <div class="container">
    

    <div class="row">
      <div class="col-md-4">
        <h1 class="text-center">Users</h1>
        <form @submit.prevent>
          <div class="row form-group">
            <div class="mb-3">
              <label for class="form-label"></label>
              <input type="text" class="form-control" v-model="user_name" />
            </div>
            <div class="mb-3">
              <label for class="form-label"></label>
              <input type="text" class="form-control" v-model="user_email" />
            </div>
          </div>

          <input @click="userAdd" class="btn btn-primary" type="button" value="Add" v-if="is_new" />
          <input
            @click="update"
            class="btn btn-info me-2"
            type="button"
            value="update"
            v-if="!is_new"
          />
          <input
            @click="userDelete(hiddenId)"
            class="btn btn-danger me-2"
            type="button"
            value="Delete"
            v-if="!is_new"
          />
          <input @click="clear" class="btn btn-secondary" type="button" value="Clear" />
          <input @click="getSingle" class="btn btn-secondary" type="button" value="getSingle" />
        </form>
      </div>
      <div class="col-md-8 pt-5">
        <div>
          <table class="table table-responsive table-hover text-center">
            <thead class="table-dark">
              <tr>
                <th class="d-none">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ct in  all_users" :key="ct.id">
                <td scope="row" class="d-none"></td>
                <td>{{ ct.name }}</td>
                <td>{{ ct.email }}</td>
                <td>
                  <form @submit.prevent>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="userEdit(ct)"
                    >Edit</button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="userDelete(ct.id)"
                    >Delete</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      baseURL: 'https://my-stor-4f27b-default-rtdb.europe-west1.firebasedatabase.app/',
      is_new: true,
      all_users: [],
      hiddenId: "",
      user_email: "",
      current_user: [],
      user_name: "",
      user_login: "Gust",


    }
  },
  methods: {
    logout: async function () {
      var self = this;
      //  const colRef = collection(db, "users");

      signOut(auth).then(() => {

        /* self.msg = 'your log out !'  this.clear()*/
        window.location.href = "./index.html";

      }).

        catch((e) => {
          self.msg = e
        })



    },
    userAdd: async function () {
      var self = this;
      const colRef = collection(db, "users"); //

      try {

        addDoc(colRef, {
          name: self.user_name,
          email: self.user_email,
          createdAt: serverTimestamp(),

        });

        this.clear()
      } catch (e) {
        console.error("Error adding document: ", e);
      }


    },
    update: async function () {
      var self = this;
      const colRef = doc(db, "users", self.hiddenId); //

      try {

        updateDoc(colRef, {
          name: self.user_name,
          email: self.user_email,

        });

        this.clear()
      } catch (e) {
        console.error("Error adding document: ", e);
      }


    },
    userDelete: function (id) {
      var self = this
      const colRef = doc(db, "users", id); //

      let text = " Alert !\nPress OK or Cancel.";
      if (confirm(text) == true) {
        deleteDoc(colRef).then(() => {
          self.clear()
        });
      } else {
        return
      }


    },

    getSingle: function () {
      let us = []
      var self = this
      self.all_users = []
      const colRef3 = doc(db, "users", self.hiddenId); //
      getDoc(colRef3).then((doc) => {

        us.push(doc.id, doc.data())

      })
      console.log(us);

    },
    getAll: function () {
      var self = this
      self.all_users = []
      const colRef = collection(db, 'users');
      getDocs(colRef).then((snapshot) => {
        let us = []
        snapshot.docs.forEach((doc) => {
          self.all_users.push({ ...doc.data(), id: doc.id })
        })

      })


    },
    userEdit: function (ob) {
      this.is_new = false;
      this.hiddenId = ob.id
      this.user_name = ob.name
      this.user_email = ob.email


    },
    clear: function () {
      this.is_new = true;
      this.hiddenId = ""
      this.user_name = ""
      this.user_email = ""
      this.getAll();
    },
    onAuthStateChanged: function () {
      var self = this
      onAuthStateChanged(auth, (user) => {
        if (user == null) {
          window.location.href = "index.html";
        } else {
          self.current_user = user
          self.user_login = user.email.replace("@gmail.com", '');
        }

      })
    },
  },
  mounted() {
    //   this.clear()
    this.onAuthStateChanged()
  }
}
</script>

<style>
</style>


