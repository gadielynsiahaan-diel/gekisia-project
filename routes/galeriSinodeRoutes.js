const express = require("express");

const router = express.Router();

const upload = require("../config/upload");

const galeriSinodeController =
require("../controllers/galeriSinodeController");

router.get(
    "/",
    galeriSinodeController.getAllGaleri
);

router.post(
    "/",
    upload.single("gambar"),
    galeriSinodeController.tambahGaleri
);

router.put(
    "/:id",
    upload.single("gambar"),
    galeriSinodeController.editGaleri
);

router.delete(
    "/:id",
    galeriSinodeController.hapusGaleri
);

module.exports = router;