// ==================================================
// SUBMIT.JS - ENVIO DO FORMULÁRIO YOKIMBO
// Integração Firebase Firestore
// ==================================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("participationForm");
    const submitBtn = document.getElementById("submitBtn");


    if (!form) {
        console.error("❌ Formulário não encontrado");
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        try {


            // Bloquear botão durante envio

            if (submitBtn) {

                submitBtn.disabled = true;
                submitBtn.innerHTML = "A enviar...";

            }



            const participant = {

                fullName:
                document.getElementById("fullName")
                .value
                .trim(),


                phone:
                normalizePhone(
                    document.getElementById("phone").value
                ),


                email:
                document.getElementById("email")
                .value
                .trim(),


                province:
                document.getElementById("province")
                .value,


                instagram:
                document.getElementById("instagram")
                .value
                .trim(),


                origin:
                document.getElementById("origin")
                .value,


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


        } finally {


            if (submitBtn) {

                submitBtn.disabled = false;
                submitBtn.innerHTML = "Participar";

            }


        }


    });


});




// Normalizar telefone apenas no envio

function normalizePhone(phone) {

    return phone
        .replace(/\s+/g, "")
        .replace(/-/g, "");

}




// Mensagem de sucesso

function showSuccess() {


    const successMessage =
    document.createElement("div");


    successMessage.className =
    "success-message";


    successMessage.innerHTML = `

        <h3>
            🎉 Participação enviada com sucesso!
        </h3>

        <p>
            Agora só falta comentar a resposta correta
            na publicação oficial do passatempo no Instagram da Yokimbo.
        </p>

    `;



    const formWrapper =
    document.querySelector(".form-wrapper");


    if (formWrapper) {

        formWrapper.innerHTML = "";

        formWrapper.appendChild(successMessage);

    }


}




// Mensagem de erro

function showFormError(message) {


    alert(message);


}
