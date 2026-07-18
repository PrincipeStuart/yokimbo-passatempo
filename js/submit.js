// ==================================================
// SUBMIT.JS
// Yokimbo Passatempo v1.0
// Envio de participações para Firestore
// ==================================================


import { db } from "./firebase.js";


import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// ==================================================
// Inicialização
// ==================================================


console.log("🚀 Submit Yokimbo iniciado");



const form =
document.getElementById("participationForm");



const submitButton =
document.querySelector(
    "button[type='submit']"
);



if(!form){

    console.error(
        "❌ Formulário não encontrado"
    );

}



// ==================================================
// Evento de envio
// ==================================================


if(form){


form.addEventListener(
"submit",
async function(event){


event.preventDefault();



console.log(
"📩 Formulário enviado"
);



// Evitar duplo envio

if(
submitButton &&
submitButton.disabled
){

    return;

}



if(submitButton){

    submitButton.disabled = true;

    submitButton.textContent =
    "Enviando...";

}



// Recolher dados


const fullName =
document.getElementById("fullName")
.value
.trim();



const email =
document.getElementById("email")
.value
.trim()
.toLowerCase();



const instagram =
document.getElementById("instagram")
.value
.trim();



const province =
document.getElementById("province")
.value
.trim();



const origin =
document.getElementById("origin")
.value
.trim();



const phoneInput =
document.getElementById("phone")
.value
.trim();



const phone =
normalizePhone(phoneInput);



console.log(
"Dados:",
{
fullName,
phone,
email
}
);
