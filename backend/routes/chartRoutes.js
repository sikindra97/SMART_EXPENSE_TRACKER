const express = require("express");
const router = express.Router();
const { getCategoryChart } = require("../controllers/chartController");

router.get("/category", getCategoryChart);

module.exports = router;



