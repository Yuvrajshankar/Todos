import User from "../models/User.js";
import Todo from "../models/Todo.js";

// CREATE TODO
export const create = async (req, res, next) => {
    try {
        const { title } = req.body;

        const userId = req.user._id;
        const user = await User.findById(userId);
        const newTodo = new Todo({
            userId,
            title,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

// GET ALL
export const get = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleted = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const deleteTask = await Todo.findByIdAndDelete(taskId);

        if (deleteTask) {
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        next(error);
    }
};
