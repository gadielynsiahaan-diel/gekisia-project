const express = require("express");

const router = express.Router();

const upload = require("../config/upload");

const galeriController =
require("../controllers/galeriController");

// ======================
// ADMIN SINODE
// ======================

router.get("/:church_id", galeriController.getAllGaleri);

router.post("/:church_id", upload.single("gambar"), galeriController.tambahGaleri);

router.put("/:id/:church_id", upload.single("gambar"), galeriController.editGaleri);

router.delete("/:id/:church_id", galeriController.hapusGaleri);

module.exports = router;