// ==================================================
// ADMIN-AUTH.JS
// Proteção do painel administrativo Yokimbo
// ==================================================

import { auth } from './firebase.js';

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



let authResolved = false;



// ==================================================
// TIMEOUT DE SEGURANÇA
// Se o Firebase não responder em 8 segundos (ex: storage
// bloqueado em navegadores móveis), redireciona para o
// login em vez de ficar preso em "Verificando acesso...".
// ==================================================

const authTimeout = setTimeout(() => {

    if (!authResolved) {

        console.error(
            "⏱️ Tempo excedido a verificar sessão. A redirecionar para login."
        );

        window.location.href = "login.html";

    }

}, 8000);



onAuthStateChanged(auth, (user) => {


    authResolved = true;

    clearTimeout(authTimeout);


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
