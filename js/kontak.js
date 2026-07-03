const currentAdmin = JSON.parse(localStorage.getItem("admin"));

const API =
`http://localhost:5000/api/kontak/${currentAdmin.church_id}`;

// ==========================
// LOAD DATA
// ==========================

async function loadKontak(){

    const response = await fetch(API);

    const data = await response.json();

    document.getElementById("alamat").value =
    (data.alamat || "").trim();

    document.getElementById("telepon").value =
    (data.telepon || "").trim();

    document.getElementById("email").value =
    (data.email || "").trim();

    document.getElementById("maps").value =
    (data.maps || "").trim();

    document.getElementById("instagram").value =
    data.instagram || "";

    document.getElementById("facebook").value =
    data.facebook || "";

    document.getElementById("tiktok").value =
    data.tiktok || "";

    document.getElementById("youtube").value =
    data.youtube || "";

}

loadKontak();


// ==========================
// SIMPAN
// ==========================

async function simpanKontak(){

    const body = {

        alamat:
        document.getElementById("alamat").value,

        telepon:
        document.getElementById("telepon").value,

        email:
        document.getElementById("email").value,

        maps:
        document.getElementById("maps").value,
        
        instagram:
        document.getElementById("instagram").value,

        facebook:
        document.getElementById("facebook").value,

        tiktok:
        document.getElementById("tiktok").value,

        youtube:
        document.getElementById("youtube").value

    };

    const response = await fetch(API,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(body)

    });

    const result = await response.json();

    if(response.ok){

        alert(result.message);

    }else{

        alert(result.message);

    }

}