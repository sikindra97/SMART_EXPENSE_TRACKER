// const express = require("express");

// const authController = require("../controllers/authController");

// console.log(authController);

// const router = express.Router();

// router.post("/register", authController.registerUser);
// router.post("/login", authController.loginUser);

// module.exports = router;


const express = require("express");

const authController = require("../controllers/authController");



const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;