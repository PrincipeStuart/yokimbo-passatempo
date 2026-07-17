// ==================================================
// AUTH.JS - LOGIN ADMIN YOKIMBO
// ==================================================


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// Configuração Firebase

const firebaseConfig = {

    apiKey: "AIzaSyBsjukcvyy8v632eMrlagOK01fFRjvcGwE",

    authDomain: "yokimbo-passatempo.firebaseapp.com",

    projectId: "yokimbo-passatempo",

    storageBucket: "yokimbo-passatempo.firebasestorage.app",

    messagingSenderId: "478275775549",

    appId: "1:478275775549:web:74479f3bb583ecb8c6ce54"

};



// Inicializar Firebase

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);





const loginBtn =
document.getElementById("loginBtn");



const errorBox =
document.getElementById("error");





if(loginBtn){


    loginBtn.addEventListener(
        "click",
        async ()=>{


            const email =
            document.getElementById("email")
            .value
            .trim();



            const password =
            document.getElementById("password")
            .value;



            try{


                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                window.location.href =
                "index.html";



            }catch(error){


                console.error(
                    "Erro login:",
                    error
                );


                errorBox.textContent =
                "Email ou senha incorretos.";

            }


        }
    );


}




// Verificar sessão existente

onAuthStateChanged(
    auth,
    (user)=>{


        if(user){

            console.log(
                "✅ Administrador autenticado:",
                user.email
            );

        }


    }
);
