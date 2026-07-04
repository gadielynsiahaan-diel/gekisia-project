// ==============================
// DASHBOARD
// ==============================

async function loadDashboard(){

    const admin =
    JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(

        `https://gekisia-project.vercel.app/api/dashboard/gereja/${admin.church_id}`

    );

    const data = await response.json();

    console.log(data);

    document.getElementById("totalJemaat").innerHTML =
    data.totalJemaat;

    document.getElementById("totalAgenda").innerHTML =
    data.totalWarta;

    document.getElementById("totalKegiatan").innerHTML =
    data.totalGaleri;

    document.getElementById("anakTotal").innerHTML =
    data.totalAnak;

    document.getElementById("remajaTotal").innerHTML =
    data.totalRemaja;

    document.getElementById("pemudaTotal").innerHTML =
    data.totalPemuda;

    document.getElementById("dewasaTotal").innerHTML =
    data.totalDewasa;

    document.getElementById("lansiaTotal").innerHTML =
    data.totalLansia;

}

// ==============================
// PROFIL GEREJA
// ==============================

async function loadProfil() {

    const admin =
    JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(

    `https://gekisia-project.vercel.app/api/profil/${admin.church_id}`

    );

    const data = await response.json();

    console.log(data);

    document.getElementById("namaGereja").innerHTML =
        data.nama_gereja;

    document.getElementById("alamatGereja").innerHTML =
        data.alamat;

    document.getElementById("namaPendetaInfo").innerHTML =
        data.nama_pendeta;

    document.getElementById("fotoGereja").src =
        "https://gekisia-project.vercel.app/uploads/" + data.foto_gereja;

    document.getElementById("fotoPendeta").src =
        "https://gekisia-project.vercel.app/uploads/" + data.foto_pendeta;

}


// ==============================
// WARTA
// ==============================

async function loadWarta(){

    const admin =
    JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(

    `https://gekisia-project.vercel.app/api/agenda/${admin.church_id}`

    );

    const data = await response.json();

    if (!Array.isArray(data)) return;

    let html = "";

    data.slice(0,4).forEach(item=>{

        html += `
            <p>
                <i class="fa-solid fa-file-pdf"></i>
                ${item.judul}
            </p>
        `;

    });

    document.getElementById("wartaPreview").innerHTML = html;

}

// ==============================
// GALERI TERBARU
// ==============================

async function loadGaleri(){

    const admin =
    JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(

    `https://gekisia-project.vercel.app/api/galeri/${admin.church_id}`

    );

    const data = await response.json();

    let html="";

    data.slice(0,4).forEach(item=>{

        html+=`

        <img
        src="https://gekisia-project.vercel.app/uploads/${item.gambar}">

        `;

    });

    document.getElementById("galeriPreview").innerHTML =
    html;

}


loadDashboard();
loadProfil();
loadWarta();
loadGaleri();
