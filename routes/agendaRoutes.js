const express = require("express");

const router = express.Router();

const upload = require("../config/upload");

const agendaController = require("../controllers/agendaController");

// ===========================
// GET AGENDA PER GEREJA
// ===========================

router.get(

    "/:church_id",

    agendaController.getAgenda

);

// ===========================
// TAMBAH AGENDA
// ===========================

router.post(

    "/:church_id",

    upload.single("pdf"),

    agendaController.tambahAgenda

);

// ===========================
// EDIT AGENDA
// ===========================

router.put(

    "/:id/:church_id",

    upload.single("pdf"),

    agendaController.editAgenda

);

// ===========================
// HAPUS AGENDA
// ===========================

router.delete(

    "/:id/:church_id",

    agendaController.hapusAgenda

);

module.exports = router;