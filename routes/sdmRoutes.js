const express = require("express");

const router = express.Router();

const sdmController = require("../controllers/sdmController");

router.get("/", sdmController.getAllSDM);

router.post("/", sdmController.tambahSDM);

router.put("/:id", sdmController.editSDM);

router.delete("/:id", sdmController.hapusSDM);

module.exports = router;