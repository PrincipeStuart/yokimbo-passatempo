
/* ================================================
   FIREBASE CONFIGURATION - Yokimbo Passatempo
   ================================================ */

/*
    Configuração do Firebase

    Este arquivo conecta o site ao Firestore.

    Não contém dados sensíveis.
    As regras de segurança do Firebase
    controlam o acesso aos dados.
*/


// Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Configuração do projeto Yokimbo
const firebaseConfig = {

    apiKey: "AIzaSyBsjukcvyy8v632eMrlagOK01fFRjvcGwE",

    authDomain:
    "yokimbo-passatempo.firebaseapp.com",

    projectId:
    "yokimbo-passatempo",

    storageBucket:
    "yokimbo-passatempo.firebasestorage.app",

    messagingSenderId:
    "478275775549",

    appId:
    "1:478275775549:web:74479f3bb583ecb8c6ce54"
};


// Inicializar Firebase

const firebaseApp = initializeApp(firebaseConfig);


// Inicializar Firestore

const db = getFirestore(firebaseApp);


// Exportar funções

export {
    db,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs
};


console.log("🔥 Firebase conectado com sucesso!");
