const express = require("express");

const router = express.Router();

const kontakController = require("../controllers/kontakController");

// ======================
// GET KONTAK
// ======================

router.get(

    "/:church_id",

    kontakController.getKontak

);

// ======================
// UPDATE KONTAK
// ======================

router.put(

    "/:church_id",

    kontakController.updateKontak

);

module.exports = router;