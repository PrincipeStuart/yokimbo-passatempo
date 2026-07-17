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


    const body = document.getElementById("participantsBody");
    const total = document.getElementById("total");
    const loading = document.getElementById("loading");
    const table = document.getElementById("participantsTable");
    const exportBtn = document.getElementById("exportBtn");



    try {


        const participantsQuery = query(
            collection(db, "participants"),
            orderBy("createdAt", "desc")
        );


        const snapshot = await getDocs(
            participantsQuery
        );



        let count = 0;



        snapshot.forEach((doc) => {


            const data = doc.data();


            count++;


            let date = "-";


            if (data.createdAt) {

                date =
                data.createdAt
                .toDate()
                .toLocaleString("pt-PT");

            }



            const participant = {

                nome: data.fullName || "-",
                telefone: data.phone || "-",
                email: data.email || "-",
                provincia: data.province || "-",
                instagram: data.instagram || "-",
                origem: data.origin || "-",
                data: date

            };



            participantsData.push(participant);



            const row = document.createElement("tr");



            row.innerHTML = `

                <td>${participant.nome}</td>

                <td>${participant.telefone}</td>

                <td>${participant.email}</td>

                <td>${participant.provincia}</td>

                <td>${participant.instagram}</td>

                <td>${participant.origem}</td>

                <td>${participant.data}</td>

            `;



            body.appendChild(row);


        });



        total.textContent = count;


        loading.style.display = "none";


        table.style.display = "table";



        console.log(
            "✅ Painel carregado:",
            count,
            "participantes"
        );



        if(exportBtn){

            exportBtn.addEventListener(
                "click",
                exportCSV
            );

        }



    } catch(error) {


        console.error(
            "❌ Erro ao carregar participantes:",
            error
        );


        loading.textContent =
        "Erro ao carregar dados";


    }


});





function exportCSV(){


    if(participantsData.length === 0){

        alert(
            "Não existem participantes para exportar."
        );

        return;

    }



    let csv = 
    "Nome,Telefone,Email,Provincia,Instagram,Origem,Data\n";



    participantsData.forEach((p)=>{


        csv +=
        `"${p.nome}","${p.telefone}","${p.email}","${p.provincia}","${p.instagram}","${p.origem}","${p.data}"\n`;


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
