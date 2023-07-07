import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tasks : [
        {
            id: String,
            title: String,
            description: String,
            position: String
        }
    ]
})

const Task = mongoose.model("Task", taskSchema);

export default Task;