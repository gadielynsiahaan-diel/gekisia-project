const admin = JSON.parse(localStorage.getItem("admin"));

if(!admin){
    window.location.href="../login.html";
}

document.getElementById("adminName").innerHTML=admin.nama_lengkap;

async function loadDashboard(){

    const res = await fetch("https://gekisia-project.vercel.app/api/dashboard");

    const data = await res.json();

    console.log(data);

    document.getElementById("totalBerita").innerHTML = data.totalBerita;

    document.getElementById("totalSDM").innerHTML = data.totalSDM;

}

async function loadFotoTerbaru(){

    try{

        const response=await fetch("https://gekisia-project.vercel.app/api/galeri");
        const data=await response.json();

        console.log(data);

        if(data.length===0)return;

        const foto=data[0];

        document.getElementById("fotoTerbaru").src=
        "https://gekisia-project.vercel.app/uploads/"+foto.gambar;

        document.getElementById("judulFoto").innerHTML=
        foto.judul;

        document.getElementById("deskripsiFoto").innerHTML=
        foto.deskripsi;

        document.getElementById("tanggalFoto").innerHTML=
        new Date(foto.tanggal).toLocaleDateString("id-ID");

    }catch(err){

        console.log(err);

    }

}

loadDashboard();
loadFotoTerbaru();
