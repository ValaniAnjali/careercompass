import express from 'express';
import { getUserById, getUserResumes, loginUser, registerUser, updateUser } from '../controllers/UserController.js';
import protect from '../middlewares/authMiddleWare.js';

const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserById)
userRouter.get('/resumes',protect,getUserResumes)
userRouter.put('/update', protect, updateUser);


userRouter.get('/', getAllUsers)
userRouter.delete('/:id', deleteUserById)

export default userRouter;
