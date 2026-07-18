/* ===========================================================
   CONFIG.JS
   -----------------------------------------------------------
   Configuração Global da Aplicação
   Projeto: Passatempo Yokimbo
   Versão: 1.0
   =========================================================== */

/*
|--------------------------------------------------------------------------
| APP_CONFIG
|--------------------------------------------------------------------------
| Todas as configurações da aplicação ficam neste objeto.
| Os restantes ficheiros utilizam estas configurações.
*/
const APP_CONFIG = {

    /*
    |--------------------------------------------------------------------------
    | Ambiente
    |--------------------------------------------------------------------------
    | development -> testes
    | production  -> website oficial
    */
    environment: "development",

    /*
    |--------------------------------------------------------------------------
    | API
    |--------------------------------------------------------------------------
    */
    api: {
        url: "https://seu-backend.com/api/participacao",
        method: "POST",
        timeout: 30000
    },

    /*
    |--------------------------------------------------------------------------
    | Cloudflare Turnstile
    |--------------------------------------------------------------------------
    */
    turnstile: {
        enabled: true,
        siteKey: "SEU_SITEKEY_AQUI"
    },

    /*
    |--------------------------------------------------------------------------
    | Contagem Regressiva
    |--------------------------------------------------------------------------
    */
    countdown: {
        endDate: "2026-07-26T23:59:59"
    },

    /*
    |--------------------------------------------------------------------------
    | Redirecionamento após sucesso
    |--------------------------------------------------------------------------
    */
    redirect: {
        successPage: "obrigado.html"
    },

    /*
    |--------------------------------------------------------------------------
    | LocalStorage
    |--------------------------------------------------------------------------
    | Utilizado apenas em desenvolvimento.
    */
    storage: {
        entriesKey: "yokimbo_dev_entries"
    },

    /*
    |--------------------------------------------------------------------------
    | Animações
    |--------------------------------------------------------------------------
    */
    animation: {
        scrollBehavior: "smooth",
        successDelay: 1500
    }
};

/* ===========================================================
   FUNÇÕES AUXILIARES
   =========================================================== */

/**
 * Verifica se está em desenvolvimento.
 */
function isDevelopment() {
    return APP_CONFIG.environment === "development";
}

/**
 * Verifica se está em produção.
 */
function isProduction() {
    return APP_CONFIG.environment === "production";
}

/**
 * Retorna a data final do passatempo.
 */
function getPromotionEndDate() {
    return new Date(APP_CONFIG.countdown.endDate);
}

/**
 * Escreve informação do ambiente na consola.
 */
console.group("Yokimbo Passatempo");
console.log("Ambiente:", APP_CONFIG.environment);
console.log("API:", APP_CONFIG.api.url);
console.log("Turnstile:", APP_CONFIG.turnstile.enabled ? "Ativo" : "Desativado");
console.groupEnd();
