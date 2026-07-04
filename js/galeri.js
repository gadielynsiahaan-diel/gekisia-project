const adminData = JSON.parse(localStorage.getItem("admin"));

console.log("ADMIN :", adminData);

const API = "https://gekisia-project-production.up.railway.app/api/galeri-sinode";

let editId = null;

async function loadGaleriSinode(){

    const response = await fetch(API);

    const data = await response.json();

    if(!Array.isArray(data)){

        return;

    }

    let html = "";

    data.forEach(item=>{

        const tanggal = new Date(item.tanggal)
        .toLocaleDateString("id-ID");

        html += `

        <tr>

            <td>

                <img
                src="https://gekisia-project-production.up.railway.app/uploads/${item.gambar}"
                class="foto-galeri">

            </td>

            <td>${item.judul}</td>

            <td>${item.deskripsi}</td>

            <td>${tanggal}</td>

            <td>

                <button
                class="btn-edit"
                onclick="editGaleri(${item.id})">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                </button>

                <button
                    class="btn-delete"
                    onclick="hapusGaleri(${item.id})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("listGaleri").innerHTML = html;

}

loadGaleriSinode();

async function editGaleri(id){

    const response = await fetch(API);

    const data = await response.json();

    const galeri = data.find(item => item.id == id);

    if(!galeri){

        alert("Data galeri tidak ditemukan.");

        return;

    }

    editId = id;

    document.getElementById("judul").value =
        galeri.judul;

    document.getElementById("deskripsi").value =
        galeri.deskripsi;

    document.getElementById("modalGaleri").style.display =
        "block";

}

document.getElementById("btnTambah").onclick=function(){

    editId = null;

    document.getElementById("judul").value="";
    document.getElementById("deskripsi").value="";
    document.getElementById("gambar").value="";

    document.getElementById("modalGaleri").style.display="block";

}

function tutupModal(){

    editId = null;

    document.getElementById("modalGaleri").style.display="none";

}

async function simpanGaleri(){

    const formData = new FormData();

    const judul = document.getElementById("judul").value.trim();

    if(judul===""){

        alert("Judul galeri tidak boleh kosong.");

        return;

    }

    formData.append("judul", judul);

    formData.append(
        "deskripsi",
        document.getElementById("deskripsi").value
    );

    if(document.getElementById("gambar").files[0]){

        formData.append(
            "gambar",
            document.getElementById("gambar").files[0]
        );

    }

    let url = API;
    let method = "POST";

    if(editId){

        url = `${API}/${editId}`;

        method = "PUT";

    }

    const response = await fetch(url,{

        method,

        body:formData

    });

    const data = await response.json();

    if(response.ok){

        alert(data.message);

        editId = null;

        tutupModal();

        loadGaleriSinode();

    }else{

        alert(data.message);

    }

}

async function hapusGaleri(id){

    const yakin = confirm("Yakin ingin menghapus foto ini?");

    if(!yakin) return;

    try{

        const response = await fetch(

            `${API}/${id}`,

            {

                method:"DELETE"

            }

        );

        const hasil = await response.json();

        if(response.ok){

            alert(hasil.message);

            loadGaleriSinode();

        }else{

            alert(hasil.message);

        }

    }catch(err){

        console.log(err);

    }

}
