import express from 'express';
import {login, register, dashboard} from '../Controllers/userController.js';
import userMiddleware from '../Middlewares/userMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/dashboard', userMiddleware, dashboard);

export default router;