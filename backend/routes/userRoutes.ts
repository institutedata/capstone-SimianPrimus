import { Router, Request, Response, NextFunction } from 'express';
import userController from '../controllers/userControllers';
import upload from '../middleware/uploadMiddleware';

const router = Router();

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(userController.getUsers));

router.get('/:id', asyncHandler(userController.getUser));

router.post('/signup', upload.single('profileImage'), asyncHandler(userController.createUser));

router.put('/:id', upload.single('profileImage'), asyncHandler(userController.updateUser));

router.delete('/:id', asyncHandler(userController.deleteUser));

router.post('/login', asyncHandler(userController.loginUser));

// Error handling middleware should capture any errors thrown in the async handler
router.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500
    }
  });
});

export default router;