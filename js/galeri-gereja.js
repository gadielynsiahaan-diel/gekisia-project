const currentAdmin = JSON.parse(localStorage.getItem("admin"));

const API =
`http://localhost:5000/api/galeri/${currentAdmin.church_id}`;

let editId = null;

async function loadGaleri(){

    const response = await fetch(API);

    const data = await response.json();

    let html = "";

    data.forEach(item=>{

        const tanggal = item.tanggal
        ? new Date(item.tanggal).toLocaleDateString("id-ID")
        : "-";

        html += `

        <tr>

            <td>

                <img
                src="http://localhost:5000/uploads/${item.gambar}"
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

loadGaleri();

async function editGaleri(id){

    const response = await fetch(API);

    const data = await response.json();

    const galeri = data.find(item => item.id == id);

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

    formData.append(
        "judul",
        document.getElementById("judul").value
    );

    formData.append(
        "deskripsi",
        document.getElementById("deskripsi").value
    );

    formData.append(
        "church_id",
        currentAdmin.church_id
    );

    if(document.getElementById("gambar").files[0]){

        formData.append(
            "gambar",
            document.getElementById("gambar").files[0]
        );

    }

    let url = API;
    let method="POST";

    if(editId){

        url = API.replace(

            `/${currentAdmin.church_id}`,

            `/${editId}/${currentAdmin.church_id}`

        );

        method = "PUT";

    }

    console.log(url);
    console.log(method);

    const response = await fetch(url,{
        method,
        body:formData
    });

    console.log("STATUS :",response.status);

    const data = await response.json();

    if(response.ok){

        alert(data.message);

        tutupModal();

        loadGaleri();

    }else{

        alert(data.message);

    }

}

async function hapusGaleri(id){

    const yakin = confirm("Yakin ingin menghapus foto ini?");

    if(!yakin) return;

    try{

        const response = await fetch(

            API.replace(

                `/${currentAdmin.church_id}`,

                `/${id}/${currentAdmin.church_id}`

            ),

            {

                method:"DELETE"

            }

        );

        const hasil = await response.json();

        alert(hasil.message);

        loadGaleri();

    }catch(err){

        console.log(err);

    }

}