async function loadGaleriSinode(){

     const response = await fetch(
        "http://localhost:5000/api/galeri-sinode"
    );

    const data = await response.json();

    let html = "";

    data.forEach(item => {

        html += `

        <div class="activity-card">

            <img
                src="http://localhost:5000/uploads/${item.gambar}"
                alt="${item.judul}">

            <h3>${item.judul}</h3>

            <p>${item.deskripsi}</p>

        </div>

        `;

    });

    document.getElementById("dokumentasiList").innerHTML = html;

}

loadGaleriSinode();