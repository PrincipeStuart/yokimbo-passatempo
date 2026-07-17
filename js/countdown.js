/* ===========================================================
   COUNTDOWN.JS
   -----------------------------------------------------------
   Contagem Regressiva - Passatempo Yokimbo
   =========================================================== */


/*
|--------------------------------------------------------------------------
| Elementos do Countdown
|--------------------------------------------------------------------------
*/

let countdownElements = {};

let countdownInterval = null;


/*
|--------------------------------------------------------------------------
| Inicializar elementos HTML
|--------------------------------------------------------------------------
*/

function initializeCountdownElements() {

    countdownElements = {

        days: document.getElementById("days"),

        hours: document.getElementById("hours"),

        minutes: document.getElementById("minutes"),

        seconds: document.getElementById("seconds")

    };


    return Object.values(countdownElements)
        .every(element => element !== null);

}


/*
|--------------------------------------------------------------------------
| Atualizar valores no HTML
|--------------------------------------------------------------------------
*/

function updateCountdownDisplay(time) {


    if (countdownElements.days) {

        countdownElements.days.textContent =
            String(time.days).padStart(2, "0");

    }


    if (countdownElements.hours) {

        countdownElements.hours.textContent =
            String(time.hours).padStart(2, "0");

    }


    if (countdownElements.minutes) {

        countdownElements.minutes.textContent =
            String(time.minutes).padStart(2, "0");

    }


    if (countdownElements.seconds) {

        countdownElements.seconds.textContent =
            String(time.seconds).padStart(2, "0");

    }

}



/*
|--------------------------------------------------------------------------
| Calcular tempo restante
|--------------------------------------------------------------------------
*/

function calculateRemainingTime() {


    const endDate = getPromotionEndDate();


    const now = new Date();


    const difference = endDate - now;



    if (difference <= 0) {

        return null;

    }



    return {


        days: Math.floor(
            difference / (1000 * 60 * 60 * 24)
        ),


        hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        ),


        minutes: Math.floor(
            (difference / (1000 * 60)) % 60
        ),


        seconds: Math.floor(
            (difference / 1000) % 60
        )


    };

}



/*
|--------------------------------------------------------------------------
| Finalizar contagem
|--------------------------------------------------------------------------
*/

function finishCountdown() {


    if (countdownInterval) {

        clearInterval(countdownInterval);

        countdownInterval = null;

    }



    updateCountdownDisplay({

        days: 0,

        hours: 0,

        minutes: 0,

        seconds: 0

    });



    console.log("⏰ Passatempo encerrado");


}



/*
|--------------------------------------------------------------------------
| Atualização principal
|--------------------------------------------------------------------------
*/

function updateCountdown() {


    const remainingTime = calculateRemainingTime();



    if (!remainingTime) {

        finishCountdown();

        return;

    }



    updateCountdownDisplay(remainingTime);


}



/*
|--------------------------------------------------------------------------
| Inicialização
|--------------------------------------------------------------------------
*/

function initCountdown() {


    const elementsExist = initializeCountdownElements();



    if (!elementsExist) {

        console.warn(
            "⚠️ Elementos do countdown não encontrados."
        );

        return;

    }



    updateCountdown();



    countdownInterval = setInterval(

        updateCountdown,

        1000

    );



    console.log(
        "✅ Countdown iniciado"
    );


}
