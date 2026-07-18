// ==================================================
// SUBMIT.JS
// Yokimbo Passatempo v1.0
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



console.log(
"🚀 Submit Yokimbo iniciado"
);





const form =
document.getElementById(
"participationForm"
);



const submitButton =
document.querySelector(
"button[type='submit']"
);





if(!form){

console.error(
"❌ Formulário não encontrado"
);

}






if(form){


form.addEventListener(
"submit",
async (event)=>{


event.preventDefault();



console.log(
"📩 Envio iniciado"
);




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



const phone =
normalizePhone(
document.getElementById("phone")
.value
.trim()
);



console.log(
"Dados recebidos:",
{
fullName,
phone,
email
}
);
// ==================================================
// VALIDAÇÃO
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





try{


// ==================================================
// Verificar telefone duplicado
// ==================================================


const participantRef =
doc(
db,
"participants",
phone
);



const participantExists =
await getDoc(
participantRef
);



if(
participantExists.exists()
){


alert(
"Este número já possui uma participação registada."
);


resetButton();

return;


}





// ==================================================
// Verificar email duplicado
// ==================================================


const emailCheck =
query(
collection(db,"participants"),
where(
"email",
"==",
email
)
);



const emailResult =
await getDocs(
emailCheck
);



if(
!emailResult.empty
){


alert(
"Este email já possui uma participação registada."
);


resetButton();

return;


}





// ==================================================
// Criar dados
// ==================================================


const participantData = {


fullName:


fullName,



phone:


phone,



email:


email,



instagram:


instagram,



province:


province,



origin:


origin,



status:


"active",



createdAt:


serverTimestamp()


};






// ==================================================
// Guardar no Firestore
// ==================================================


await setDoc(

participantRef,

participantData

);



console.log(
"✅ Participação guardada:",
participantData
);



alert(
"Participação enviada com sucesso!"
);



form.reset();



resetButton();


}
catch(error){


console.error(
"❌ Erro ao enviar participação:",
error
);



alert(
"Ocorreu um erro ao enviar. Tente novamente."
);



resetButton();


}



});



}






// ==================================================
// Normalizar telefone
// ==================================================


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





console.log(
"✅ Submit Yokimbo carregado corretamente"
);


