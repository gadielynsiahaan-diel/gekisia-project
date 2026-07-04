async function loadSDM(){

    const res =
    await fetch("https://gekisia-project-production.up.railway.app/api/sdm");

    const data =
    await res.json();

    let html="";

    data.forEach((item,no)=>{

        html += `

        <tr>

            <td>${no + 1}</td>

            <td>${item.kategori}</td>

            <td>${item.nama}</td>

            <td>

                <button
                    class="btn-edit"
                    onclick="editSDM(${item.id})">

                    <i class="fa-solid fa-pen"></i> Edit

                </button>

                <button
                    class="btn-delete"
                    onclick="hapusSDM(${item.id})">

                    <i class="fa-solid fa-trash"></i> Hapus

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("tbodySDM").innerHTML=html;

}

loadSDM();

async function simpanSDM(){

    const id =
    document.getElementById("idSDM").value;

    const data={

        kategori:
        document.getElementById("kategori").value,

        nama:
        document.getElementById("nama").value,

        urutan:
        document.getElementById("urutan").value

    };

    let url="https://gekisia-project-production.up.railway.app/api/sdm";

    let method="POST";

    if(id!=""){

        url+="/"+id;

        method="PUT";

    }

    await fetch(url,{

        method,

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    location.reload();

}

async function editSDM(id){

    const res =
    await fetch("https://gekisia-project-production.up.railway.app/api/sdm");

    const data =
    await res.json();

    const item =
    data.find(x=>x.id==id);

    document.getElementById("idSDM").value=item.id;

    document.getElementById("kategori").value=item.kategori;

    document.getElementById("nama").value=item.nama;

    document.getElementById("urutan").value=item.urutan;

    document.getElementById("modalSDM").style.display="block";

}

async function hapusSDM(id){

    if(!confirm("Hapus data?")) return;

    await fetch(

        "https://gekisia-project-production.up.railway.app/api/sdm/"+id,

        {

            method:"DELETE"

        }

    );

    loadSDM();

}

function bukaModal(){

    document.getElementById("idSDM").value="";

    document.getElementById("kategori").value="";

    document.getElementById("nama").value="";

    document.getElementById("urutan").value="";

    document.getElementById("modalSDM").style.display="block";

}

