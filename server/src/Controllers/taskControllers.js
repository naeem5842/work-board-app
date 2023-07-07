import { request, response } from "express";
import Task from "../Models/taskmodel.js"



export const getAllTasks = async (req, res)=>{
    const userId = req.query.id;
   try{
    const tasks = await Task.findOne({userId : userId});
    
    if(tasks){
        return res.status(200).json(tasks.tasks);
    }
   }
   catch(error){
    console.error(error);
   }

}

export const saveAllTasks = async (req, res) =>{
    const userId = req.query.id;
    const {task} = req.body;
    try{
        const tasks = await Task.findOne({ userId : userId});

        if(!tasks){
            const newTask = new Task({ userId : userId, tasks:[task]
            });
            await newTask.save();
            return res.status(201).json(newTask);
        }
        else{
            tasks.tasks.push(task);
            await tasks.save();
            res.status(201).json(tasks);
            
        }
        
    }
    catch(error){
        console.error(error);
    }


}

export const deleteTask = async (req, res) =>{
    const userId = req.query.id;
    const {task} = req.body;    

    console.log(req.body);

    try{
        const deleted = await Task.findOneAndUpdate({userId : userId}, { $pull: { tasks: { id : task.id } } });
        console.log("deleted" , deleted)
        const tasks = await Task.findOne({ userId : userId});
        res.status(200).json(tasks);
        console.log("tasks", tasks);
    }
    catch(error){
        console.error(error);
    }


}


export const updatePosition = async(req, res) =>{
    const userId = req.query.id;
    const {task} = req.body;

    console.log(userId);
    console.log(task);

    try{
        const data = await Task.findOneAndUpdate({userId : userId, "tasks.id" : task.id},
        {$set : {"tasks.$.position" : task.position}} ,
        {new : true}
        );

        const alltasks = await Task.findOne({userId : userId});
        return res.status(200).json(alltasks)
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error ", "Error": error});
    }
    
}