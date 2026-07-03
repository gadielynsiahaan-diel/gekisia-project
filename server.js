require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sdmRoutes = require("./routes/sdmRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const beritaRoutes = require("./routes/beritaRoutes");
const galeriRoutes = require("./routes/galeriRoutes");
const profilRoutes = require("./routes/profilRoutes");
const jemaatRoutes = require("./routes/jemaatRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const kontakRoutes = require("./routes/kontakRoutes");
const galeriSinodeRoutes =
require("./routes/galeriSinodeRoutes");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/sdm", sdmRoutes);
app.use("/api/berita", beritaRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profil", profilRoutes);
app.use("/api/jemaat", jemaatRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/kontak", kontakRoutes);
app.use(
    "/api/galeri-sinode",
    galeriSinodeRoutes
);

app.post("/api/testlogin", (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
        message: "Test berhasil"
    });
});

app.get("/", (req, res) => {
    res.send("GEKISIA Backend Running");
});

app.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
