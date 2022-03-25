<template></template>

<script>
import { auth, db } from "../../assets/js/firebaseConfig";





export default {
  data() {
    return {
      user_name: "",
      email: "",
      pw: "",
      accessToken: "",
      msg: "",
      current_user: [],
      user_login: "Gust",


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

    onAuthStateChanged: function () {
      var self = this
      onAuthStateChanged(auth, (user) => {

        if (user == null) {
          window.location.href = "index.html";
        } else {
          self.current_user = user
          self.user_login = user.email.replace("@gmail.com", '');
        }
        /*
         console.log(user.email);
         console.log("auth.currentUser.uid");
         console.log(user);
        */
      })
    },
    clear: function () {

      this.email = ""
      this.pw = ""

    }
  },
  mounted() {
    /*       this.clear()
       */
    this.onAuthStateChanged()
  }

}
</script>

<style>
</style>




