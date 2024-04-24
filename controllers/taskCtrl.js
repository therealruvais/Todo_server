const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found for this user" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const task = new Task({
      name,
      user: userId,
    });
    await task.save(); 
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ msg: "Invalid data" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { name, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ msg: "Invalid data" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
