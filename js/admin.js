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



document.addEventListener("DOMContentLoaded", async () => {


    const body = document.getElementById("participantsBody");
    const total = document.getElementById("total");
    const loading = document.getElementById("loading");
    const table = document.getElementById("participantsTable");


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

                date = data.createdAt
                    .toDate()
                    .toLocaleString("pt-PT");

            }



            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${data.fullName || "-"}</td>

                <td>${data.phone || "-"}</td>

                <td>${data.email || "-"}</td>

                <td>${data.province || "-"}</td>

                <td>${data.instagram || "-"}</td>

                <td>${data.origin || "-"}</td>

                <td>${date}</td>

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



    } catch(error) {


        console.error(
            "❌ Erro ao carregar participantes:",
            error
        );


        loading.textContent =
        "Erro ao carregar dados";


    }


});
