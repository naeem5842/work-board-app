import express from 'express';
import {getAllTasks, saveAllTasks, deleteTask, updatePosition} from '../Controllers/taskControllers.js';
import taskMiddleware from '../Middlewares/userMiddleware.js';


const router = express.Router();

router.get('/get-all-tasks',taskMiddleware, getAllTasks);
router.post('/save-all-tasks', taskMiddleware, saveAllTasks);
router.post('/delete-task',taskMiddleware , deleteTask );
router.post("/update-position" , taskMiddleware, updatePosition)
export default router;