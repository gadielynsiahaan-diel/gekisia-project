async function loadBerita(){

    const response = await fetch(
        "http://localhost:5000/api/berita"
    );

    const data = await response.json();

    let agenda = "";
    let event = "";

    data.forEach(item=>{

        // gambar sebenarnya adalah file PDF
        const pdf =
        "http://localhost:5000/uploads/" + item.gambar;

        const card = `

        <div class="berita-card">

            <div class="berita-content">

                <h3>${item.judul}</h3>

                <p>${item.isi}</p>

                <a
                    href="${pdf}"
                    target="_blank"
                    class="btn-pdf">

                    <i class="fa-solid fa-file-pdf"></i>
                    Lihat File PDF

                </a>

            </div>

        </div>

        `;

        if(item.kategori=="Agenda"){

            agenda += card;

        }

        if(item.kategori=="Event"){

            event += card;

        }

    });

    document.getElementById("agendaList").innerHTML = agenda;
    document.getElementById("eventList").innerHTML = event;

}

loadBerita();