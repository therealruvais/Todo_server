const express = require("express");
const { createUser, loginUser, logOut, getUser } = require("../controllers/userCtrl");
const authVerify = require("../middlewares/auth");
const router = express.Router();


router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/logout", authVerify, logOut);
router.get("/verify", authVerify, getUser);




module.exports = router;
