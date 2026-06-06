const express=require("express");
const router = express.Router();
const {parseVoiceExpense}=require("../controllers/voiceController");

router.post("/parse", parseVoiceExpense);

module.exports = router;

