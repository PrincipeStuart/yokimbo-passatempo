// ==========================================
// FIREBASE CONFIGURATION - YOKIMBO PASSATEMPO
// ==========================================

// Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    inMemoryPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// Criar ligação Authentication
const auth = getAuth(app);

// ==========================================
// PERSISTÊNCIA COM FALLBACK
// ==========================================
// Alguns navegadores móveis bloqueiam o acesso a
// IndexedDB/localStorage de terceiros, o que impede
// o Firebase Auth de guardar a sessão e faz o
// onAuthStateChanged nunca responder. Tentamos
// localStorage primeiro, depois sessionStorage,
// e por fim memória (a sessão não sobrevive a fechar
// o separador, mas pelo menos a autenticação funciona).
setPersistence(auth, browserLocalPersistence).catch(() => {

    setPersistence(auth, browserSessionPersistence).catch(() => {

        setPersistence(auth, inMemoryPersistence).catch((error) => {

            console.error(
                "Erro ao configurar persistência de autenticação:",
                error
            );

        });

    });

});

// Exportar para outros ficheiros
export { db, auth };

console.log("🔥 Firebase conectado com sucesso");
