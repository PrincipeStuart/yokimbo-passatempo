/* ===========================================================
   VALIDATION.JS
   -----------------------------------------------------------
   Validação e normalização dos dados do formulário
   Passatempo Yokimbo
   =========================================================== */


/*
|--------------------------------------------------------------------------
| Configuração dos campos
|--------------------------------------------------------------------------
*/

const VALIDATION_RULES = {


    fullName: {

        required: true,

        minLength: 3,

        error: "error-fullName"

    },


    phone: {

        required: true,

        error: "error-phone"

    },


    email: {

        required: false,

        error: "error-email"

    },


    province: {

        required: true,

        error: "error-province"

    },


    origin: {

        required: true,

        error: "error-origin"

    },


    confirm: {

        required: true,

        error: "error-confirm"

    }


};




/*
|--------------------------------------------------------------------------
| Mostrar erro
|--------------------------------------------------------------------------
*/

function showFieldError(field, message) {


    const errorElement =
        document.getElementById(
            VALIDATION_RULES[field].error
        );


    if (errorElement) {

        errorElement.textContent = message;

        errorElement.classList.add("show");

    }


}



/*
|--------------------------------------------------------------------------
| Limpar erro
|--------------------------------------------------------------------------
*/

function clearFieldError(field) {


    const errorElement =
        document.getElementById(
            VALIDATION_RULES[field].error
        );


    if (errorElement) {

        errorElement.textContent = "";

        errorElement.classList.remove("show");

    }


}



/*
|--------------------------------------------------------------------------
| Normalizar Nome
|--------------------------------------------------------------------------
*/

function normalizeName(value) {


    return value

        .trim()

        .replace(/\s+/g, " ")

        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );


}



/*
|--------------------------------------------------------------------------
| Normalizar Telefone Angola
|--------------------------------------------------------------------------
*/

function normalizePhone(value) {


    let phone = value
        .replace(/\D/g, "");



    if (phone.startsWith("244")) {

        return phone;

    }



    if (phone.startsWith("9") && phone.length === 9) {

        return "244" + phone;

    }



    return phone;


}



/*
|--------------------------------------------------------------------------
| Validar Telefone
|--------------------------------------------------------------------------
*/

function validatePhone(value) {


    const phone =
        normalizePhone(value);



    return /^2449\d{8}$/.test(phone);


}




/*
|--------------------------------------------------------------------------
| Validar Email
|--------------------------------------------------------------------------
*/

function validateEmail(value) {


    if (!value) {

        return true;

    }



    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(value);


}




/*
|--------------------------------------------------------------------------
| Validar campo individual
|--------------------------------------------------------------------------
*/

function validateField(fieldName) {


    const element =
        document.getElementById(fieldName);



    if (!element) {

        return true;

    }



    let value =
        element.type === "checkbox"

        ? element.checked

        : element.value;



    clearFieldError(fieldName);



    /*
    -------------------------------
    Campo obrigatório
    -------------------------------
    */


    if (
        VALIDATION_RULES[fieldName].required
        &&
        !value
    ) {


        showFieldError(
            fieldName,
            "Este campo é obrigatório."
        );


        return false;

    }




    /*
    -------------------------------
    Nome
    -------------------------------
    */


    if (fieldName === "fullName") {


        element.value =
            normalizeName(value);



        if (value.length < 3) {


            showFieldError(
                fieldName,
                "Introduza o nome completo."
            );


            return false;

        }

    }




    /*
    -------------------------------
    Telefone
    -------------------------------
    */


    if (fieldName === "phone") {


        if (!validatePhone(value)) {


            showFieldError(
                fieldName,
                "Número inválido. Exemplo: 923 456 789."
            );


            return false;

        }


    }





    /*
    -------------------------------
    Email
    -------------------------------
    */


    if (fieldName === "email") {


        if (!validateEmail(value)) {


            showFieldError(
                fieldName,
                "Introduza um email válido."
            );


            return false;


        }


    }




    return true;


}




/*
|--------------------------------------------------------------------------
| Validar formulário completo
|--------------------------------------------------------------------------
*/

function validateForm() {


    let valid = true;



    Object.keys(VALIDATION_RULES)
        .forEach(field => {


            if (!validateField(field)) {

                valid = false;

            }


        });



    return valid;


}




/*
|--------------------------------------------------------------------------
| Eventos em tempo real
|--------------------------------------------------------------------------
*/

function initValidation() {


    Object.keys(VALIDATION_RULES)
        .forEach(field => {


            const element =
                document.getElementById(field);



            if (!element) {

                return;

            }



            element.addEventListener(
                "blur",
                () => validateField(field)
            );



            element.addEventListener(
                "input",
                () => {

                    clearFieldError(field);

                }

            );


        });



    console.log(
        "✅ Validação inicializada"
    );


}
