const currentAdmin = JSON.parse(localStorage.getItem("admin"));

const API =
`https://gekisia-project.vercel.app/api/agenda/${currentAdmin.church_id}`;

let editId = null;

// =========================
// LOAD
// =========================

async function loadAgenda(){

    const response = await fetch(API);

    const data = await response.json();

    if (!Array.isArray(data)) {

        return;

    }

    let html = "";

    data.forEach(item=>{

        html += `
        <tr>

            <td>${item.judul}</td>

            <td>

                <a
                href="https://gekisia-project.vercel.app/uploads/${item.file_pdf}"
                target="_blank">

                Lihat PDF

                </a>

            </td>

            <td>

                <button

                class="btn-edit"

                onclick='editAgenda(${JSON.stringify(item)})'>

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button

                class="btn-delete"

                onclick="hapusAgenda(${item.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("tbodyAgenda").innerHTML = html;

}

loadAgenda();


// =========================
// MODAL
// =========================

function bukaModal(){

    resetForm();

    document.getElementById("modalAgenda").style.display="flex";

}

function tutupModal(){

    resetForm();

    document.getElementById("modalAgenda").style.display="none";

}

// =========================
// SIMPAN AGENDA
// =========================

async function simpanAgenda(){

    const judul = document.getElementById("judul").value.trim();

    if(judul===""){

        alert("Judul warta tidak boleh kosong.");

        return;

    }

    const formData = new FormData();

    formData.append("judul", judul);
    
    if(document.getElementById("pdf").files.length > 0){

        formData.append(
            "pdf",
            document.getElementById("pdf").files[0]
        );

    }

    const url = editId

    ? API.replace(

    `/${currentAdmin.church_id}`,

    `/${editId}/${currentAdmin.church_id}`

    )

    : API;

    const method = editId ? "PUT" : "POST";

    const response = await fetch(url,{

        method,

        body:formData

    });

    const result = await response.json();

    console.log(result);

    if(response.ok){

        alert(result.message);

        loadAgenda();

        tutupModal();

    }else{

        alert(result.message);

    }

}

function resetForm(){

    editId = null;

    document.getElementById("judul").value = "";

    document.getElementById("pdf").value = "";

}

function editAgenda(item){

    editId = item.id;

    document.getElementById("judul").value =
    item.judul;

    document.getElementById("modalAgenda").style.display =
    "flex";

}

async function hapusAgenda(id){

    if(!confirm("Yakin ingin menghapus agenda?")){

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

        loadAgenda();

    }else{

        alert(result.message);

    }

}
