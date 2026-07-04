// =====================================
// GEREJA PUBLIK
// =====================================

const churchId = document.body.dataset.church;
console.log("Church ID =", churchId);

const API = "https://gekisia-project-production.up.railway.app/api";

// =====================================
// LOAD PROFIL
// =====================================

async function loadProfil(){

    try{

        const response = await fetch(
            `${API}/profil/${churchId}`
        );

        const data = await response.json();
        console.log(data);

        if(!data || Object.keys(data).length===0){

            console.log("Profil kosong");

            return;

        }

        document.getElementById("namaGerejaHero").innerHTML =
        data.nama_gereja || "-";

        document.title =
        data.nama_gereja || "GEKISIA";

        document.getElementById("namaPendeta").innerHTML =
        data.nama_pendeta || "-";

        document.getElementById("deskripsiGereja").innerHTML =
        data.deskripsi || "-";

        document.getElementById("alamatGereja").innerHTML =
        data.alamat || "-";

        // ===============================
        // FOTO GEREJA
        // ===============================

        const fotoGereja = document.getElementById("fotoGereja");

        fotoGereja.src =
        `https://gekisia-project-production.up.railway.app/uploads/${data.foto_gereja}`;

        console.log("Foto Gereja =", fotoGereja.src);

        // Hero
        document.getElementById("hero").style.backgroundImage =
        `url(https://gekisia-project-production.up.railway.app/uploads/${data.foto_gereja})`;

        document.getElementById("hero").style.backgroundSize = "cover";
        document.getElementById("hero").style.backgroundPosition = "center";


        // ===============================
        // FOTO PENDETA
        // ===============================

        const fotoPendeta =
        document.getElementById("fotoPendeta");

        fotoPendeta.src =
        `https://gekisia-project-production.up.railway.app/uploads/${data.foto_pendeta}`;

        console.log("Foto Pendeta =", fotoPendeta.src);

            }

            catch(err){

                console.log(err);

            }

}

// =====================================
// LOAD DATA JEMAAT
// =====================================

async function loadJemaat(){

    try{

        const response = await fetch(

            `${API}/jemaat/${churchId}`

        );

        const data = await response.json();

        if(!Array.isArray(data)){

            return;

        }

        if(data.length===0){

            return;

        }

        const jemaat = data[0];

        document.getElementById("anak").innerHTML =
        jemaat.anak;

        document.getElementById("remaja").innerHTML =
        jemaat.remaja;

        document.getElementById("pemuda").innerHTML =
        jemaat.pemuda;

        document.getElementById("dewasa").innerHTML =
        jemaat.dewasa;

        document.getElementById("lansia").innerHTML =
        jemaat.lansia;

    }

    catch(err){

        console.log(err);

    }

}

// =====================================
// LOAD WARTA
// =====================================

async function loadAgenda(){

    try{

        const response = await fetch(

            `${API}/agenda/${churchId}`

        );

        const data = await response.json();

        const list =
        document.getElementById("listWarta");

        list.innerHTML = "";

        if(!Array.isArray(data) || data.length===0){

            list.innerHTML = `

                <p>

                    Belum ada Warta Gereja

                </p>

            `;

            return;

        }

        data.forEach(item=>{

            list.innerHTML += `

                <a

                href="https://gekisia-project-production.up.railway.app/uploads/${item.file_pdf}"

                target="_blank"

                class="warta-item">

                    <i class="fas fa-file-pdf"></i>

                    ${item.judul}

                </a>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}



// =====================================
// LOAD GALERI
// =====================================

async function loadGaleri(){

    try{

        const response = await fetch(

            `${API}/galeri/${churchId}`

        );

        const data = await response.json();

        const list =
        document.getElementById("listGaleri");

        list.innerHTML = "";

        if(!Array.isArray(data) || data.length===0){

            list.innerHTML = `

                <p>

                    Belum ada kegiatan gereja.

                </p>

            `;

            return;

        }

        data.forEach(item=>{

            const tanggal = item.tanggal

            ? new Date(item.tanggal)

            .toLocaleDateString("id-ID")

            : "";

            list.innerHTML += `
            <div class="activity-card">

                <img
                    src="https://gekisia-project-production.up.railway.app/uploads/${item.gambar}"
                    class="activity-image"
                >

                <div class="activity-content">

                    <h3>${item.judul}</h3>

                    <p>${item.deskripsi}</p>

                    <small>${tanggal}</small>

                </div>

            </div>
            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

// =====================================
// LOAD KONTAK
// =====================================

async function loadKontak(){

    try{

        const response = await fetch(

            `${API}/kontak/${churchId}`

        );

        const data = await response.json();

        // Telepon
        const tel = document.getElementById("telepon");

        if(tel){

            tel.href = data.telepon
                ? `https://wa.me/${data.telepon.replace(/\D/g,"")}`
                : "#";

            tel.innerHTML = `
                <i class="fa-solid fa-phone"></i>
                ${data.telepon || "Telepon"}
            `;
        }

        // Email
        const email = document.getElementById("email");

        if(email){

            email.href = data.email
                ? `mailto:${data.email}`
                : "#";

            email.innerHTML = `
                <i class="fa-solid fa-envelope"></i>
                ${data.email || "Email"}
            `;
        }

        // Instagram
        const instagram = document.getElementById("instagram");
        if(instagram){
            instagram.href = data.instagram || "#";
        }

        // Facebook
        const facebook = document.getElementById("facebook");
        if(facebook){
            facebook.href = data.facebook || "#";
        }

        // TikTok
        const tiktok = document.getElementById("tiktok");
        if(tiktok){
            tiktok.href = data.tiktok || "#";
        }

        // Youtube
        const youtube = document.getElementById("youtube");
        if(youtube){
            youtube.href = data.youtube || "#";
        }

        // Google Maps
        const maps = document.getElementById("maps");

        if(maps){

            if(data.maps.includes("/embed")){

                maps.src = data.maps;

            }else{

                maps.outerHTML = `
                    <div class="info-box">
                        <a href="${data.maps}" target="_blank" class="btn-maps">
                            📍 Buka Lokasi di Google Maps
                        </a>
                    </div>
                `;

            }

        }

    }

    catch(err){

        console.log(err);

    }

}



// =====================================
// LOAD SEMUA DATA
// =====================================

async function init(){

    await Promise.all([

        loadProfil(),

        loadJemaat(),

        loadAgenda(),

        loadGaleri(),

        loadKontak()

    ]);

}

init();
