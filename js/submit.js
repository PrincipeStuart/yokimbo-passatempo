/* =====================================================
   SUBMIT.JS
   Sistema de envio do formulário Yokimbo Passatempo

   DESENVOLVIMENTO:
   - Guarda participações no localStorage
   - Não exige Turnstile
   - Permite testes repetidos

   PRODUÇÃO:
   - Envia dados para API
   - Exige validação Cloudflare Turnstile
   - Redireciona para página de sucesso

   Alterações principais ficam no config.js
===================================================== */


// =====================================================
// ELEMENTOS DO FORMULÁRIO
// =====================================================

const submitElements = {
    form: document.getElementById("participationForm"),
    button: document.getElementById("submitBtn"),
    loading: document.getElementById("loadingOverlay")
};


// =====================================================
// ESTADOS
// =====================================================

let isSubmitting = false;
let turnstileToken = null;
let turnstileWidgetId = null;


// =====================================================
// CALLBACK CLOUDFLARE TURNSTILE
// =====================================================

window.turnstileCallback = function(token) {

    turnstileToken = token;

    console.log("✅ Turnstile validado");

};


window.turnstileErrorCallback = function() {

    turnstileToken = null;

    console.log("❌ Erro Turnstile");

};


window.turnstileExpireCallback = function() {

    turnstileToken = null;

    console.log("⚠️ Token Turnstile expirado");

};


// =====================================================
// CAPTURAR WIDGET TURNSTILE
// =====================================================

window.onloadTurnstileCallback = function(widgetId){

    turnstileWidgetId = widgetId;

};



// =====================================================
// OBTER DADOS DO FORMULÁRIO
// =====================================================

function getFormData(){

    return {

        nome:
        document.getElementById("fullName").value.trim(),

        telefone:
        normalizePhone(
            document.getElementById("phone").value.trim()
        ),

        email:
        document.getElementById("email").value.trim(),

        provincia:
        document.getElementById("province").value,

        instagram:
        normalizeInstagram(
            document.getElementById("instagram").value.trim()
        ),

        origem:
        document.getElementById("origin").value,

        confirmou:
        document.getElementById("confirm").checked,

        data:
        new Date().toISOString()

    };

}



// =====================================================
// NORMALIZAÇÃO
// =====================================================

function normalizePhone(phone){

    phone = phone.replace(/\s+/g,"")
                 .replace(/-/g,"");


    if(phone.startsWith("+244")){
        return phone.substring(1);
    }


    if(phone.startsWith("9")){
        return "244" + phone;
    }


    return phone;

}



function normalizeInstagram(value){

    return value
        .replace("@","")
        .replace(/\s+/g,"")
        .toLowerCase();

}



// =====================================================
// VERIFICAR DUPLICADOS (APENAS TESTES)
// =====================================================

function checkDuplicatePhone(phone){

    if(APP_CONFIG.environment !== "development"){
        return false;
    }


    const entries =
    JSON.parse(
        localStorage.getItem(APP_CONFIG.storageKey)
    ) || [];


    return entries.some(
        item => item.telefone === phone
    );

}



// =====================================================
// GUARDAR TESTES LOCALMENTE
// =====================================================

function saveDevelopmentEntry(data){


    if(APP_CONFIG.environment !== "development"){
        return;
    }


    const entries =
    JSON.parse(
        localStorage.getItem(APP_CONFIG.storageKey)
    ) || [];


    entries.push(data);


    localStorage.setItem(
        APP_CONFIG.storageKey,
        JSON.stringify(entries)
    );


    console.log("💾 Guardado no localStorage");

}



// =====================================================
// MOSTRAR LOADING
// =====================================================

function showLoading(){

    if(submitElements.loading){

        submitElements.loading.classList.add("show");

    }


    if(submitElements.button){

        submitElements.button.disabled = true;

    }

}



function hideLoading(){

    if(submitElements.loading){

        submitElements.loading.classList.remove("show");

    }


    if(submitElements.button){

        submitElements.button.disabled = false;

    }

}



// =====================================================
// MENSAGENS
// =====================================================

function showSubmitMessage(message){


    const error =
    document.getElementById("error-turnstile");


    if(error){

        error.textContent = message;

        error.classList.add("show");


        setTimeout(()=>{

            error.classList.remove("show");

        },5000);

    }

}



// =====================================================
// ENVIAR PARA API
// =====================================================

async function sendToAPI(data){


    const response =
    await fetch(
        APP_CONFIG.apiUrl,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:
            JSON.stringify(data)

        }
    );


    return await response.json();


}



// =====================================================
// PROCESSAR ENVIO
// =====================================================

async function handleSubmit(event){


    event.preventDefault();


    if(isSubmitting){
        return;
    }



    if(!validateForm()){
        return;
    }



    const data = getFormData();



    if(checkDuplicatePhone(data.telefone)){


        showSubmitMessage(
            "Este número já participou no passatempo."
        );


        return;

    }



    if(
        APP_CONFIG.environment === "production"
        &&
        !turnstileToken
    ){

        showSubmitMessage(
            "Complete a validação Cloudflare."
        );

        return;

    }



    isSubmitting = true;


    showLoading();



    try{


        if(APP_CONFIG.environment === "development"){


            saveDevelopmentEntry(data);


            await new Promise(
                resolve=>setTimeout(resolve,1500)
            );


            showSubmitMessage(
                "Participação registada com sucesso! (Teste)"
            );


            submitElements.form.reset();



            if(
                window.turnstile &&
                turnstileWidgetId
            ){

                window.turnstile.reset(
                    turnstileWidgetId
                );

            }


        }


        else{


            const result =
            await sendToAPI(data);



            if(result.success){

                window.location.href =
                APP_CONFIG.redirectSuccess;

            }

        }


    }

    catch(error){


        console.error(error);


        showSubmitMessage(
            "Ocorreu um erro. Tente novamente."
        );


    }


    finally{


        hideLoading();

        isSubmitting=false;


    }

}



// =====================================================
// INICIALIZAÇÃO
// =====================================================

function initSubmit(){


    if(submitElements.form){


        submitElements.form.addEventListener(
            "submit",
            handleSubmit
        );


        console.log(
            "✅ Submit iniciado"
        );


    }

}
