console.log("jemaat.js berhasil dimuat");

const currentAdmin = JSON.parse(localStorage.getItem("admin"));

const API =
`https://gekisia-project.vercel.app/api/jemaat/${currentAdmin.church_id}`;

let editId = null;

// ======================
// LOAD DATA
// ======================

async function loadData(){

    const response = await fetch(API);

    const data = await response.json();

    if(!Array.isArray(data)){

        return;

    }

    console.log("DATA DARI API =", data);

    let html = "";

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.tahun}</td>
            <td>${item.anak}</td>
            <td>${item.remaja}</td>
            <td>${item.pemuda}</td>
            <td>${item.dewasa}</td>
            <td>${item.lansia}</td>
            <td>${item.total}</td>
            <td>
                <button onclick='editData(${JSON.stringify(item)})'>
                    Edit
                </button>

                <button onclick='hapusData(${item.id})'>
                    Hapus
                </button>
            </td>
        </tr>
        `;

    });

    console.log(html);

    document.getElementById("tbodyJemaat").innerHTML = html;

}

loadData();


// ======================
// MODAL
// ======================

function bukaModal(){

    document.getElementById("modal").style.display="flex";

}

function tutupModal(){

    document.getElementById("modal").style.display="none";

    resetForm();

}


// ======================
// RESET
// ======================

function resetForm(){

    editId=null;

    document.getElementById("anak").value="";

    document.getElementById("remaja").value="";

    document.getElementById("pemuda").value="";

    document.getElementById("dewasa").value="";

    document.getElementById("lansia").value="";

    document.getElementById("tahun").value="";

}


// ======================
// SIMPAN
// ======================

async function simpan() {

    const data = {     

        anak: Number(document.getElementById("anak").value),

        remaja: Number(document.getElementById("remaja").value),

        pemuda: Number(document.getElementById("pemuda").value),

        dewasa: Number(document.getElementById("dewasa").value),

        lansia: Number(document.getElementById("lansia").value),

        tahun: Number(document.getElementById("tahun").value)

    };

    let url = API;
    let method = "POST";

    if(editId){

        url = API.replace(

            `/${currentAdmin.church_id}`,

            `/${editId}/${currentAdmin.church_id}`

        );

        method = "PUT";

    }

    const response = await fetch(url,{

        method,

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    const result = await response.json();

    if(response.ok){

        alert(result.message);

        tutupModal();

        loadData();

    }else{

        alert(result.message);

    }

}

// ======================
// EDIT
// ======================

function editData(item){

    editId=item.id;

    document.getElementById("anak").value=item.anak;

    document.getElementById("remaja").value=item.remaja;

    document.getElementById("pemuda").value=item.pemuda;

    document.getElementById("dewasa").value=item.dewasa;

    document.getElementById("lansia").value=item.lansia;

    document.getElementById("tahun").value=item.tahun;

    bukaModal();

}


// ======================
// HAPUS
// ======================

async function hapusData(id){

    if(!confirm("Yakin ingin menghapus data ini?")){

        return;

    }

    const response = await fetch(

        API.replace(

            `/${currentAdmin.church_id}`,

            `/${id}/${currentAdmin.church_id}`

        ),

        {

            method:"DELETE"

        }

    );

    const result = await response.json();

    if(response.ok){

        alert(result.message);

        loadData();

    }else{

        alert(result.message);

    }

}
