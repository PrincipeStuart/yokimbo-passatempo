
// ==========================================
// FIREBASE CONFIGURATION - YOKIMBO PASSATEMPO
// ==========================================

// Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Configuração Firebase Yokimbo
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


// Criar ligação Firestore
const db = getFirestore(app);


// Exportar para outros ficheiros
export { db };


console.log("🔥 Firebase conectado com sucesso");
