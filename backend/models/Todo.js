import mongoose, { mongo } from "mongoose";

const TodoSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;