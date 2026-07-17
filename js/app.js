/* ================================================
   APP.JS - Inicialização da Aplicação Yokimbo
   ================================================

   Responsável por:
   - Carregar configurações globais
   - Inicializar módulos
   - Controlar erros globais
   - Funções gerais da página

================================================ */


// ================================================
// Função: Scroll para formulário
// ================================================

function scrollToForm() {

    const formSection = document.getElementById('form-section');

    if (formSection) {

        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }

}


// ================================================
// Inicialização da aplicação
// ================================================

function initApp() {

    console.log('🚀 Iniciando Passatempo Yokimbo...');


    // Verificar configuração

    if (typeof APP_CONFIG === 'undefined') {

        console.error(
            '❌ APP_CONFIG não encontrado. Verifique se config.js foi carregado antes dos outros arquivos.'
        );

    } else {

        console.log('⚙️ Configuração carregada:', APP_CONFIG);

    }



    // Inicializar validação

    try {

        if (typeof initValidation === 'function') {

            initValidation();

        }

    } catch (error) {

        console.error(
            'Erro ao iniciar validação:',
            error
        );

    }



    // Inicializar countdown

    try {

        if (typeof initCountdown === 'function') {

            initCountdown();

        }

    } catch (error) {

        console.error(
            'Erro ao iniciar countdown:',
            error
        );

    }



// ================================================
// Executar quando página carregar
// ================================================

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initApp
    );

} else {

    initApp();

}



// ================================================
// Tratamento global de erros
// ================================================

window.addEventListener(
    'error',
    function(event){

        console.error(
            '⚠️ Erro global:',
            event.error
        );

    }
);



// ================================================
// Tratamento de Promises rejeitadas
// ================================================

window.addEventListener(
    'unhandledrejection',
    function(event){

        console.error(
            '⚠️ Promise rejeitada:',
            event.reason
        );

    }
);
