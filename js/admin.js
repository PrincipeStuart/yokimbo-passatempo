import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async () => {


    const body = document.getElementById("participantsBody");
    const total = document.getElementById("total");
    const loading = document.getElementById("loading");
    const table = document.getElementById("participantsTable");


    try {


        const snapshot = await getDocs(
            collection(db, "participants")
        );


        let count = 0;


        snapshot.forEach((doc) => {


            const data = doc.data();

            count++;


            const row = document.createElement("tr");


            row.innerHTML = `

            <td>${data.fullName || "-"}</td>
            <td>${data.phone || "-"}</td>
            <td>${data.email || "-"}</td>
            <td>${data.province || "-"}</td>
            <td>${data.instagram || "-"}</td>
            <td>${data.origin || "-"}</td>

            `;


            body.appendChild(row);


        });



        total.textContent = count;


        loading.style.display = "none";

        table.style.display = "table";


        console.log(
            "✅ Participantes encontrados:",
            count
        );



    } catch(error) {


        console.error(
            "❌ Erro:",
            error
        );


        loading.textContent =
        "Erro ao carregar dados";


    }


});
