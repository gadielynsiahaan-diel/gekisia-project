async function loadSDM() {

    const response = await fetch("https://gekisia-project-production.up.railway.app/api/sdm");
    const data = await response.json();

    let kependetaan = "";
    let vikaris = "";
    let orientasi = "";
    let emeritus = "";

    data.forEach((item) => {

        const row = `
            <tr>
                <td>${item.urutan}</td>
                <td>${item.nama}</td>
            </tr>
        `;

        switch(item.kategori){

            case "Tenaga Kependetaan":
                kependetaan += row;
                break;

            case "Tenaga Vikaris":
                vikaris += row;
                break;

            case "Tenaga Orientasi":
                orientasi += row;
                break;

            case "Tenaga Emeritus":
                emeritus += row;
                break;

        }

    });

    document.getElementById("kependetaanBody").innerHTML = kependetaan;
    document.getElementById("vikarisBody").innerHTML = vikaris;
    document.getElementById("orientasiBody").innerHTML = orientasi;
    document.getElementById("emeritusBody").innerHTML = emeritus;

}

loadSDM();
