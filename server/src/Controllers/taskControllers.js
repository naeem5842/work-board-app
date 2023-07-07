import { request, response } from "express";
import Task from "../Models/taskmodel.js"



export const getAllTasks = async (req, res)=>{
    const userId = req.query.id;
   try{
    const tasks = await Task.findOne({userId : userId});
    
    if(tasks){
        console.log({message: "Returned Tasks form the server for the user",  tasks: tasks.tasks});
        return res.status(200).json({message: "Returned Tasks form the server for the user",  tasks: tasks.tasks});
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
            console.log({message : "new User Created and task saved in task db", tasks : newTask});
            return res.status(201).json({message : "new User Created and task saved in task db", tasks : newTask});
        }
        else{
            tasks.tasks.push(task);
            await tasks.save();
            console.log({message : "Task Saved Sucessfully in the Database", tasks : tasks.tasks , savedTask : task});
            res.status(200).json({message : "Task Saved Sucessfully in the Database", tasks : tasks.tasks , savedTask : task});
            
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
        const tasks = await Task.findOne({ userId : userId});
        res.status(200).json({message: "Task Deleted From the database", tasks: tasks.tasks , DeletedTask : deleted});
        console.log({message: "Task Deleted From the database", tasks: tasks.tasks , DeletedTask : deleted});
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
        console.log({message : "Position has been updated", tasks :alltasks.tasks, updatedTask : data.tasks});
        return res.status(200).json({message : "Position has been updated", tasks :alltasks.tasks, updatedTask : data.tasks})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error ", "Error": error});
    }
    
}