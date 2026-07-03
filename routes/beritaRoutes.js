const express = require("express");

const router = express.Router();

const upload = require("../config/upload");

const beritaController =
require("../controllers/beritaController");

router.get("/",
beritaController.getAllBerita);

router.post(
    "/",
    upload.single("gambar"),
    beritaController.tambahBerita
);

router.put(
    "/:id",
    upload.single("gambar"),
    beritaController.editBerita
);

router.delete("/:id",
beritaController.hapusBerita);

module.exports = router;