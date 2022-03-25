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

import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js"; //



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

const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();



Vue.createApp({
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
                  self.current_user=user
                  self.user_login=user.email. replace("@gmail.com",'');
                }

            })
        },
    },
    mounted() {
        //   this.clear()
        this.onAuthStateChanged()
    }
}).mount('#app')