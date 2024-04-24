const express = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskCtrl");
const authVerify = require("../middlewares/auth");
const router = express.Router();


router.get("/", authVerify, getAllTasks);
router.post("/create", authVerify, createTask); 
router.get("/tasks", authVerify, getTask);
router.put("/:id", authVerify, updateTask); 
router.delete("/:id", authVerify, deleteTask); 

module.exports = router;
