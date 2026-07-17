// ==================================================
// SUBMIT.JS - ENVIO DE PARTICIPAÇÕES YOKIMBO
// Com proteção contra duplicados por telefone
// ==================================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



console.log("✅ Submit iniciado");



const form = document.getElementById("participationForm");



if(form){


form.addEventListener(
"submit",
async (event)=>{


event.preventDefault();



try{


const fullName =
document.getElementById("fullName").value.trim();


const email =
document.getElementById("email").value.trim();


const phoneInput =
document.getElementById("phone").value.trim();


const province =
document.getElementById("province").value;


const instagram =
document.getElementById("instagram").value.trim();


const origin =
document.getElementById("origin").value;




// Normalizar telefone

const phone =
normalizePhone(phoneInput);



console.log(
"Telefone normalizado:",
phone
);



// Verificar duplicado

const participantsRef =
collection(db,"participants");



const phoneQuery =
query(
participantsRef,
where(
"phone",
"==",
phone
)
);



const existing =
await getDocs(phoneQuery);



if(!existing.empty){


alert(
"Este número já possui uma participação registada."
);


return;


}



// Criar participação


await addDoc(
participantsRef,
{


fullName,

email,

phone,

province,

instagram,

origin,


status:"active",


createdAt:
serverTimestamp()


}
);



alert(
"Participação enviada com sucesso!"
);



form.reset();



}
catch(error){


console.error(
"❌ Erro ao enviar participação:",
error
);



alert(
"Ocorreu um erro ao enviar. Tente novamente."
);



}



});



}





function normalizePhone(phone){


let clean =
phone.replace(
/[^0-9]/g,
""
);



if(
clean.startsWith("244")
){

return "+" + clean;

}



if(
clean.startsWith("9")
){

return "+244" + clean;

}



return "+" + clean;


}
