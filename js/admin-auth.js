// ==================================================
// ADMIN-AUTH.JS
// Proteção do painel administrativo Yokimbo
// ==================================================

import { auth } from './firebase.js';

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



onAuthStateChanged(auth, (user) => {


    const loading = document.getElementById("authLoading");

    const content = document.getElementById("adminContent");

    const userEmailEl = document.getElementById("userEmail");



    if (user) {


        console.log(
            "✅ Sessão encontrada:",
            user.email
        );


        if(userEmailEl){

            userEmailEl.textContent = user.email;

        }


        if(content){

            content.style.display = "block";

        }


        if(loading){

            loading.remove();

        }



    } else {


        console.log(
            "⚠️ Sem sessão. Redirecionando..."
        );


        window.location.href = "login.html";


    }


});



// ==================================================
// LOGOUT
// ==================================================

async function handleLogout() {


    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(
            "Erro ao terminar sessão:",
            error
        );

    }


}



document.addEventListener("click", (event) => {


    const target = event.target;


    if (!target) {

        return;

    }


    if (target.id === "logoutBtn") {

        handleLogout();

    }


});
