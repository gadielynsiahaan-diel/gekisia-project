// ===============================
// LOAD PROFIL
// ===============================

async function loadProfil(){

    try{

        const admin =
        JSON.parse(localStorage.getItem("admin"));

        const response = await fetch(

        `http://localhost:5000/api/profil/${admin.church_id}`

        );

        const data = await response.json();

        if(!data.id) return;

        document.getElementById("nama_gereja").value =
        data.nama_gereja || "";

        document.getElementById("alamat").value =
        data.alamat || "";

        document.getElementById("deskripsi").value =
        data.deskripsi || "";

        document.getElementById("nama_pendeta").value =
        data.nama_pendeta || "";

        if(data.foto_gereja){

            document.getElementById("previewFotoGereja").src =
            `http://localhost:5000/uploads/${data.foto_gereja}`;

        }

        if(data.foto_pendeta){

            document.getElementById("previewFotoPendeta").src =
            `http://localhost:5000/uploads/${data.foto_pendeta}`;

        }

    }

    catch(err){

        console.log(err);

    }

}

loadProfil();


// ===============================
// SIMPAN PROFIL
// ===============================

async function simpanProfil(){

    const formData = new FormData();

    formData.append(

        "nama_gereja",

        document.getElementById("nama_gereja").value

    );

    formData.append(

        "alamat",

        document.getElementById("alamat").value

    );

    formData.append(

        "deskripsi",

        document.getElementById("deskripsi").value

    );

    formData.append(

        "nama_pendeta",

        document.getElementById("nama_pendeta").value

    );

    const fotoGereja =

    document.getElementById("foto_gereja").files[0];

    if(fotoGereja){

        formData.append(

            "foto_gereja",

            fotoGereja

        );

    }

    const fotoPendeta =

    document.getElementById("foto_pendeta").files[0];

    if(fotoPendeta){

        formData.append(

            "foto_pendeta",

            fotoPendeta

        );

    }

    const admin =
        JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(

        `http://localhost:5000/api/profil/${admin.church_id}`,

    {
        method:"POST",
        body:formData
    }
    );

    const data = await response.json();

    alert(data.message);

    loadProfil();

}

async function hapusFotoGereja(){

    if(!confirm("Hapus foto gereja?")) return;

    const admin = JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(
        `http://localhost:5000/api/profil/${admin.church_id}/foto-gereja`,
        {
            method:"DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById("previewFotoGereja").src =
    "../img/no-image.png";

    loadProfil();

}

async function hapusFotoPendeta(){

    if(!confirm("Hapus foto pendeta?")) return;

    const admin = JSON.parse(localStorage.getItem("admin"));

    const response = await fetch(
        `http://localhost:5000/api/profil/${admin.church_id}/foto-pendeta`,
        {
            method:"DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById("previewFotoPendeta").src =
    "../img/no-image.png";

    loadProfil();

}

document
.getElementById("foto_gereja")
.addEventListener("change",function(){

    const file=this.files[0];

    if(file){

        document.getElementById("previewFotoGereja").src =
        URL.createObjectURL(file);

    }

});

document
.getElementById("foto_pendeta")
.addEventListener("change",function(){

    const file=this.files[0];

    if(file){

        document.getElementById("previewFotoPendeta").src =
        URL.createObjectURL(file);

    }

});