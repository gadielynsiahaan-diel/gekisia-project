let editId = null;

async function loadBerita(){

    const response = await fetch(
        "http://localhost:5000/api/berita"
    );

    const data = await response.json();

    let html = "";

    data.forEach(item=>{

      const tanggal = new Date(item.tanggal).toLocaleDateString("id-ID");  
      
      html += `
            <tr>

            <td>${item.kategori}</td>
            <td>${item.judul}</td>
            <td>${item.penulis}</td>
            <td>${tanggal}</td>
          
            <td>

              <button class="btn-edit" onclick="editBerita(${item.id})">
                  <i class="fa-solid fa-pen"></i>
                  Edit
              </button>

              <button class="btn-delete" onclick="hapusBerita(${item.id})">
                  <i class="fa-solid fa-trash"></i>
                  Hapus
              </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("listBerita").innerHTML = html;

}

// =======================
// EDIT BERITA
// =======================

async function editBerita(id){

    const response = await fetch(
        "http://localhost:5000/api/berita"
    );

    const data = await response.json();

    const berita = data.find(item => item.id == id);

    editId = id;

    document.getElementById("kategori").value = berita.kategori;
    document.getElementById("judul").value = berita.judul;
    document.getElementById("isi").value = berita.isi;
    document.getElementById("penulis").value = berita.penulis;
    document.getElementById("tanggal").value =
        berita.tanggal.substring(0,10);

    document.getElementById("modalBerita").style.display = "block";

}

async function hapusBerita(id){

    const konfirmasi = confirm("Hapus berita ini?");

    if(!konfirmasi) return;

    await fetch(

        "http://localhost:5000/api/berita/"+id,

        {

            method:"DELETE"

        }

    );

    loadBerita();

}

document.getElementById("btnTambah").onclick=function(){

    document.getElementById("modalBerita").style.display="block";

}

function tutupModal(){

    document.getElementById("modalBerita").style.display="none";

}

loadBerita();

async function simpanBerita(){

    const formData = new FormData();

    formData.append(
        "kategori",
        document.getElementById("kategori").value
    );

    formData.append(
        "judul",
        document.getElementById("judul").value
    );

    formData.append(
        "isi",
        document.getElementById("isi").value
    );

    formData.append(
        "penulis",
        document.getElementById("penulis").value
    );

    formData.append(
        "tanggal",
        document.getElementById("tanggal").value
    );

    formData.append(
        "gambar",
        document.getElementById("gambar").files[0]
    );

    const response = await fetch(

        "http://localhost:5000/api/berita",

        {

            method: "POST",

            body: formData

        }

    );

    const data = await response.json();

    console.log(data);

    if(data.success){

        alert(data.message);

        tutupModal();

        loadBerita();

    }else{

        alert(data.message);

    }

}