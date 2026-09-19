const express = require("express");

const router = express.Router();

const messageRoute = require("../Controller/MessageController");

/* import the security middlewares */
const protect = require("../Middleware/authMiddleware");
import adminOnly = require("../Middleware/authorization");

router.post("/messages", messageRoute.createMessage);
router.get("/messages",protect,adminOnly, messageRoute.getMessages);
router.patch("/messages/:id",protect,adminOnly,messageRoute.markMessageAsRead);
router.delete("/messages/:id",protect, adminOnly,messageRoute.deleteMessageById);

module.exports = router;
export{};
