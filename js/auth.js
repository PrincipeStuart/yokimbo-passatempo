// ==================================================
// AUTH.JS - LOGIN ADMIN YOKIMBO
// ==================================================

import { auth } from './firebase.js';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



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


                if(errorBox){

                    errorBox.textContent =
                    "Email ou senha incorretos.";

                }

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
