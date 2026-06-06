const express = require("express");
const router = express.Router();

const { scanBill } = require("../controllers/ocrController");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/scan",
  upload.single("image"),
  scanBill
);

module.exports = router;