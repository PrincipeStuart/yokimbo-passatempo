// ==================================================
// ADMIN-AUTH.JS
// Proteção do painel administrativo Yokimbo
// ==================================================


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const firebaseConfig = {

    apiKey: "AIzaSyBsjukcvyy8v632eMrlagOK01fFRjvcGwE",

    authDomain: "yokimbo-passatempo.firebaseapp.com",

    projectId: "yokimbo-passatempo",

    storageBucket: "yokimbo-passatempo.firebasestorage.app",

    messagingSenderId: "478275775549",

    appId: "1:478275775549:web:74479f3bb583ecb8c6ce54"

};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);



onAuthStateChanged(
    auth,
    (user)=>{


        if(!user){


            window.location.href =
            "login.html";


        } else {


            console.log(
                "✅ Acesso autorizado:",
                user.email
            );


        }


    }
);
