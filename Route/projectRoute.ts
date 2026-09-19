const express = require("express");
const router = express.Router();
const projectRoute = require("../Controller/projectController");

const protect = require("../Middleware/authMiddleware");
import adminOnly = require("../Middleware/authorization");

router.post("/createproject",protect,adminOnly, projectRoute.createProject);
router.get("/getall", projectRoute.getProjects);
router.get("/getproject/:id",projectRoute.getProjectById);
router.patch("/updateproject/:id",protect,adminOnly, projectRoute.updateProjectById);
router.delete("/deleteproject/:id", protect,adminOnly, projectRoute.deleteProjectById);
module.exports = router;
export{}; 