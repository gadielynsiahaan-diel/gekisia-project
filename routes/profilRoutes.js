const express = require("express");

const router = express.Router();

console.log("=== PROFIL ROUTES LOADED ===");

const upload = require("../config/upload");

const profilController =
require("../controllers/profilController");

// ==========================
// GET PROFIL
// ==========================

router.get(

    "/:church_id",

    profilController.getProfil

);

// ==========================
// SIMPAN / UPDATE
// ==========================

router.post(

    "/:church_id",

    upload.fields([

        {
            name:"foto_gereja",
            maxCount:1
        },

        {
            name:"foto_pendeta",
            maxCount:1
        }

    ]),

    profilController.simpanProfil

);

// ==========================
// HAPUS FOTO GEREJA
// ==========================

router.delete(

    "/:church_id/foto-gereja",

    profilController.hapusFotoGereja

);

// ==========================
// HAPUS FOTO PENDETA
// ==========================

router.delete(

    "/:church_id/foto-pendeta",

    profilController.hapusFotoPendeta

);

module.exports = router;