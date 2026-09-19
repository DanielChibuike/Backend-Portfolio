const express = require("express");

const router = express.Router();

/*Bring in the user controller */

const userRoute = require("../Controller/userController");

/*Import the security middlwares */

const protect = require("../Middleware/authMiddleware");
import adminOnly = require("../Middleware/authorization");

router.post("/createuser", protect,adminOnly,userRoute.createUser);
router.post("/login",userRoute.loginUser);

module.exports = router;