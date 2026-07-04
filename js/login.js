const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const role = document.getElementById("roleSelect").value;
    const church = document.getElementById("churchSelect").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validasi sederhana
    if (role === "") {
        alert("Pilih role terlebih dahulu!");
        return;
    }

    if (role === "gereja" && church === "") {
        alert("Pilih gereja terlebih dahulu!");
        return;
    }

    if (username === "" || password === "") {
        alert("Username dan Password wajib diisi!");
        return;
    }

    try {

        const response = await fetch("https://gekisia-project-production.up.railway.app/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                role,
                church,
                username,
                password
            })

        });

        const data = await response.json();

        if (data.success) {
            
            localStorage.setItem("admin", JSON.stringify(data.admin));
            
            alert("Login berhasil!");
            
            if (data.admin.role === "superadmin") {
                
                window.location.href = "./admin/dashboard-sinode.html";
            
            } else {
                window.location.href = "./admin/dashboard-gereja.html";
            
            }
        
        } else {
            
            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Tidak dapat terhubung ke server.");

    }

});
