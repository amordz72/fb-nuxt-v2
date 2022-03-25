// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js"; //




// Cloud Firestore;
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp, query, where, orderBy, onSnapshot, getDoc,
}
    from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

//Realtime Database
import {
    getDatabase,
    ref,
    set,
    onValue
}
    from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";


import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js"; //


const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();



Vue.createApp({
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
var self=this
            onAuthStateChanged(auth, (user) => {

                if (user != null) {
                    window.location.href = "./dashboard.html";
                }
                else{
                //self.createUser=user
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
        this.clear()
        this.onAuthStateChanged()

    }
}).mount('#app')