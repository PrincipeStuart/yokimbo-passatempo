// ==================================================
// SUBMIT.JS - ENVIO DO FORMULÁRIO YOKIMBO
// Integração Firebase Firestore
// ==================================================


// Importar Firebase
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Aguarda carregamento do formulário

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("participationForm");


    if (!form) {
        console.error("❌ Formulário não encontrado");
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        try {

            const participant = {

                fullName:
                document.getElementById("fullName").value.trim(),


                phone:
                normalizePhone(
                    document.getElementById("phone").value
                ),


                email:
                document.getElementById("email").value.trim(),


                province:
                document.getElementById("province").value,


                instagram:
                document.getElementById("instagram").value.trim(),


                origin:
                document.getElementById("origin").value,


                status:
                "active",


                createdAt:
                serverTimestamp()

            };


            console.log(
                "📤 Enviando participação:",
                participant
            );


            await addDoc(
                collection(db, "participants"),
                participant
            );


            console.log(
                "✅ Participação guardada com sucesso"
            );


            showSuccess();


            form.reset();



        } catch(error) {


            console.error(
                "❌ Erro ao enviar participação:",
                error
            );


            showFormError(
                "Ocorreu um erro ao enviar. Tente novamente."
            );

        }

    });

});



// Normalização do telefone
// Apenas no envio

function normalizePhone(phone) {

    return phone
        .replace(/\s+/g, "")
        .replace(/-/g, "");

}




// Mensagem de sucesso

function showSuccess() {

    alert(
        "Participação enviada com sucesso! Boa sorte."
    );

}



// Mensagem de erro

function showFormError(message) {

    alert(message);

}
