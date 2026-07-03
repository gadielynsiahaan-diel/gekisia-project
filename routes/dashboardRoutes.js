const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getDashboard);

router.get(
"/gereja/:church_id",
dashboardController.getDashboardGereja
);

module.exports = router;