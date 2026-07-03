const admin = JSON.parse(localStorage.getItem("admin"));

if (!admin) {

    window.location.href = "../login.html";

}

// tampilkan username

const adminName = document.getElementById("adminName");

if (adminName) {

    adminName.innerText = admin.nama_lengkap;

}

// logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("admin");

        window.location.href = "../login.html";

    });

}