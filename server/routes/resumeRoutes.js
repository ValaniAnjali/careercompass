import express from 'express'
import protect from '../middlewares/authMiddleWare.js';
import { createResume, deleteResume, getPublicResumeById, getResumeByID, updateResume, uploadResume } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter=express.Router();

resumeRouter.post('/upload-resume', protect, uploadResume)
resumeRouter.post('/create',protect,createResume)
resumeRouter.put('/update', protect, upload.single('image'), updateResume);
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.get('/get/:resumeId',protect,getResumeByID);
resumeRouter.get('/public/:resumeId',getPublicResumeById);

export default resumeRouter;