// ==================================================
// ADMIN.JS - PAINEL DE PARTICIPANTES YOKIMBO
// ==================================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let participantsData = [];



document.addEventListener("DOMContentLoaded", async () => {


    const loading = document.getElementById("loading");
    const table = document.getElementById("participantsTable");
    const exportBtn = document.getElementById("exportBtn");
    const draw1Btn = document.getElementById("draw1Btn");
    const draw3Btn = document.getElementById("draw3Btn");
    const draw5Btn = document.getElementById("draw5Btn");
    const closeModalBtn = document.getElementById("closeWinnersModal");
    const copyWinnersBtn = document.getElementById("copyWinnersBtn");



    try {


        const participantsQuery = query(
            collection(db, "participants"),
            orderBy("createdAt", "desc")
        );


        const snapshot = await getDocs(
            participantsQuery
        );



        participantsData = [];



        snapshot.forEach((docSnap) => {


            const data = docSnap.data();


            let date = "-";


            if (data.createdAt) {

                date =
                data.createdAt
                .toDate()
                .toLocaleString("pt-PT");

            }



            participantsData.push({

                nome: data.fullName || "-",
                telefone: data.phone || "-",
                email: data.email || "-",
                provincia: data.province || "-",
                instagram: data.instagram || "-",
                origem: data.origin || "-",
                data: date,
                status: data.status || "-"

            });


        });



        renderTable();

        updateCounters();


        if(loading){

            loading.style.display = "none";

        }


        if(table){

            table.style.display = "table";

        }



        console.log(
            "✅ Painel carregado:",
            participantsData.length,
            "participantes"
        );



    } catch(error) {


        console.error(
            "❌ Erro ao carregar participantes:",
            error
        );


        if(loading){

            loading.textContent =
            "Erro ao carregar dados";

        }


        return;


    }



    if(exportBtn){

        exportBtn.addEventListener(
            "click",
            exportCSV
        );

    }



    if(draw1Btn){

        draw1Btn.addEventListener(
            "click",
            () => drawWinners(1)
        );

    }



    if(draw3Btn){

        draw3Btn.addEventListener(
            "click",
            () => drawWinners(3)
        );

    }



    if(draw5Btn){

        draw5Btn.addEventListener(
            "click",
            () => drawWinners(5)
        );

    }



    if(closeModalBtn){

        closeModalBtn.addEventListener(
            "click",
            closeWinnersModal
        );

    }



    if(copyWinnersBtn){

        copyWinnersBtn.addEventListener(
            "click",
            copyWinnersToClipboard
        );

    }



    initSearch();


});




// ==================================================
// RENDERIZAR TABELA
// ==================================================

function renderTable(searchTerm = "") {


    const body = document.getElementById("participantsBody");


    if(!body){

        return;

    }



    body.innerHTML = "";



    const term = searchTerm.trim().toLowerCase();



    const filtered = term
        ? participantsData.filter((p) => {


            return (

                p.nome.toLowerCase().includes(term) ||
                p.telefone.toLowerCase().includes(term) ||
                p.email.toLowerCase().includes(term) ||
                p.instagram.toLowerCase().includes(term) ||
                p.provincia.toLowerCase().includes(term)

            );


        })
        : participantsData;



    filtered.forEach((participant) => {


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${participant.nome}</td>

            <td>${participant.telefone}</td>

            <td>${participant.email}</td>

            <td>${participant.provincia}</td>

            <td>${participant.instagram}</td>

            <td>${participant.origem}</td>

            <td>${participant.data}</td>

            <td>${participant.status}</td>

        `;


        body.appendChild(row);


    });


}




// ==================================================
// CONTADORES
// ==================================================

function updateCounters() {


    const totalEl = document.getElementById("total");

    const activeEl = document.getElementById("activeCount");



    if(totalEl){

        totalEl.textContent = participantsData.length;

    }



    if(activeEl){

        const activeCount = participantsData.filter(
            (p) => p.status === "active"
        ).length;


        activeEl.textContent = activeCount;

    }


}




// ==================================================
// PESQUISA EM TEMPO REAL
// ==================================================

function initSearch() {


    const searchInput = document.getElementById("searchInput");


    if(!searchInput){

        return;

    }



    searchInput.addEventListener("input", () => {

        renderTable(searchInput.value);

    });


}




// ==================================================
// EXPORTAR CSV
// ==================================================

function exportCSV(){


    if(participantsData.length === 0){

        alert(
            "Não existem participantes para exportar."
        );

        return;

    }



    let csv =
    "Nome,Telefone,Email,Provincia,Instagram,Origem,Data,Status\n";



    participantsData.forEach((p)=>{


        csv +=
        `"${p.nome}","${p.telefone}","${p.email}","${p.provincia}","${p.instagram}","${p.origem}","${p.data}","${p.status}"\n`;


    });



    const blob = new Blob(
        [csv],
        {
            type:"text/csv;charset=utf-8;"
        }
    );



    const link = document.createElement("a");


    link.href =
    URL.createObjectURL(blob);



    link.download =
    "participantes-yokimbo.csv";



    link.click();


}




// ==================================================
// SORTEIO CRIPTOGRAFICAMENTE SEGURO
// ==================================================

function secureRandomInt(maxExclusive) {


    const maxUint32 = 0xFFFFFFFF;

    const limit = maxUint32 - (maxUint32 % maxExclusive);

    const array = new Uint32Array(1);

    let randomValue;



    do {

        crypto.getRandomValues(array);

        randomValue = array[0];

    } while (randomValue >= limit);



    return randomValue % maxExclusive;


}



function secureShuffle(list) {


    const shuffled = list.slice();



    for (let i = shuffled.length - 1; i > 0; i--) {


        const j = secureRandomInt(i + 1);


        const temp = shuffled[i];

        shuffled[i] = shuffled[j];

        shuffled[j] = temp;


    }



    return shuffled;


}



function drawWinners(count) {


    const activeParticipants = participantsData.filter(
        (p) => p.status === "active"
    );



    if(activeParticipants.length === 0){

        alert(
            "Não existem participantes ativos para o sorteio."
        );

        return;

    }



    const winnersCount = Math.min(
        count,
        activeParticipants.length
    );



    const shuffled = secureShuffle(activeParticipants);


    const winners = shuffled.slice(0, winnersCount);



    showWinnersModal(winners);


}




// ==================================================
// MODAL DE VENCEDORES
// ==================================================

function showWinnersModal(winners) {


    const modal = document.getElementById("winnersModal");

    const list = document.getElementById("winnersList");



    if(!modal || !list){

        return;

    }



    list.innerHTML = "";



    winners.forEach((winner, index) => {


        const item = document.createElement("div");

        item.className = "winner-item";


        item.innerHTML = `

            <h3>${index + 1}º Vencedor</h3>

            <p><strong>Nome:</strong> ${winner.nome}</p>

            <p><strong>Telefone:</strong> ${winner.telefone}</p>

            <p><strong>Email:</strong> ${winner.email}</p>

            <p><strong>Instagram:</strong> ${winner.instagram}</p>

            <p><strong>Província:</strong> ${winner.provincia}</p>

            <p><strong>Data:</strong> ${winner.data}</p>

        `;


        list.appendChild(item);


    });



    modal.dataset.winners = JSON.stringify(winners);


    modal.style.display = "flex";


}



function closeWinnersModal() {


    const modal = document.getElementById("winnersModal");


    if(modal){

        modal.style.display = "none";

    }


}



function copyWinnersToClipboard() {


    const modal = document.getElementById("winnersModal");


    if(!modal || !modal.dataset.winners){

        return;

    }



    const winners = JSON.parse(modal.dataset.winners);



    let text = "🏆 Vencedores Yokimbo Passatempo\n\n";



    winners.forEach((winner, index) => {


        text += `${index + 1}º Vencedor\n`;

        text += `Nome: ${winner.nome}\n`;

        text += `Telefone: ${winner.telefone}\n`;

        text += `Email: ${winner.email}\n`;

        text += `Instagram: ${winner.instagram}\n`;

        text += `Província: ${winner.provincia}\n`;

        text += `Data: ${winner.data}\n\n`;


    });



    navigator.clipboard.writeText(text)
        .then(() => {

            alert("Vencedores copiados com sucesso.");

        })
        .catch(() => {

            alert("Não foi possível copiar os vencedores.");

        });


}
