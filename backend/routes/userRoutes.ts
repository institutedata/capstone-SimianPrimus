import express from "express";
const router = express.Router();
import userController from "../controllers/userControllers";
import upload from "../middleware/uploadMiddleware";

router.get('/user', userController.getUsers);

router.get('/user/:id', userController.getUser);

router.post('/user/signup', upload.single('profileImage'), userController.createUser);

router.put('/user/:id', upload.single('profileImage'), userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

router.post('/user/login', userController.loginUser);

export default router;

