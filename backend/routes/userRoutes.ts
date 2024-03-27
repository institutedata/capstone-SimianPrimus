import userController from "../controllers/userControllers";
import router from "./ArtworkRoutes";

router.get('/user', userController.getUsers);

router.get('/user/:id', userController.getUser);

router.post('/user/signup', userController.createUser);

router.put('/user/:id', userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

router.post('/user/login', userController.loginUser);

export default router;