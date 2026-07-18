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
console.log(
"Dados:",
{
fullName,
phone,
email
}
);
// ==================================================
// Validação básica
// ==================================================


if(
!fullName ||
!phone ||
!email ||
!province ||
!origin
){

    alert(
    "Preencha todos os campos obrigatórios."
    );


    resetButton();

    return;

}




// ==================================================
// Verificar duplicação por telefone
// ==================================================


try{


const phoneRef =
doc(
db,
"participants",
phone
);



const existingPhone =
await getDoc(phoneRef);



if(existingPhone.exists()){


    alert(
    "Este número já possui uma participação registada."
    );


    resetButton();

    return;


}




// ==================================================
// Verificar duplicação por email
// ==================================================


const emailQuery =
query(
collection(db,"participants"),
where(
"email",
"==",
email
)
);



const emailSnapshot =
await getDocs(emailQuery);



if(
!emailSnapshot.empty
){


    alert(
    "Este email já possui uma participação registada."
    );


    resetButton();

    return;


}




// ==================================================
// Criar participação
// ==================================================


const participantData = {


    fullName: fullName,


    phone: phone,


    email: email,


    instagram: instagram,


    province: province,


    origin: origin,


    status: "active",


    createdAt:
    serverTimestamp()


};





await setDoc(
phoneRef,
participantData
);



console.log(
"✅ Participação guardada com sucesso"
);




alert(
"Participação enviada com sucesso!"
);



// Limpar formulário

form.reset();



resetButton();




}catch(error){


console.error(
"❌ Erro ao guardar participação:",
error
);



alert(
"Ocorreu um erro ao enviar. Tente novamente."
);



resetButton();


}



});
// ==================================================
// Normalização do telefone
// ==================================================


function normalizePhone(phone){


let clean =
phone.replace(
/[^0-9]/g,
""
);



// Número já com código Angola

if(
clean.startsWith("244")
){

return "+" + clean;

}



// Número começa apenas com 9

if(
clean.startsWith("9")
){

return "+244" + clean;

}



// Fallback

return "+" + clean;


}





// ==================================================
// Restaurar botão
// ==================================================


function resetButton(){


if(submitButton){


submitButton.disabled = false;


submitButton.textContent =
"Participar Agora";


}



}



// ==================================================
// Fim do Submit.js
// ==================================================


console.log(
"✅ Submit Yokimbo carregado"
);
