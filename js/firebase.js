
/* ================================================
   FIREBASE - Configuração Yokimbo Passatempo
   ================================================ */

// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
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
const firebaseApp = initializeApp(firebaseConfig);


// Inicializar Firestore
const db = getFirestore(firebaseApp);


// Função para guardar participação
async function saveParticipant(data) {

    try {

        const docRef = await addDoc(
            collection(db, "participants"),
            {
                ...data,
                createdAt: serverTimestamp(),
                status: "active"
            }
        );


        console.log(
            "✅ Participante guardado:",
            docRef.id
        );


        return {
            success: true,
            id: docRef.id
        };


    } catch(error) {

        console.error(
            "❌ Erro Firebase:",
            error
        );


        return {
            success:false,
            error:error.message
        };
    }
}


// Exportar função
export {
    saveParticipant
};
