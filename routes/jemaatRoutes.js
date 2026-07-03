const express = require("express");

const router = express.Router();

const jemaatController = require("../controllers/jemaatController");

// ==============================
// GET
// ==============================

router.get(

    "/:church_id",

    jemaatController.getJemaat

);

// ==============================
// TAMBAH
// ==============================

router.post(

    "/:church_id",

    jemaatController.tambahJemaat

);

// ==============================
// UPDATE
// ==============================

router.put(

    "/:id/:church_id",

    jemaatController.updateJemaat

);

// ==============================
// HAPUS
// ==============================

router.delete(

    "/:id/:church_id",

    jemaatController.hapusJemaat

);

module.exports = router;