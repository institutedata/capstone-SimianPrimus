import { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/userControllers";
import upload from "../middleware/uploadMiddleware";

const router = Router();
// Define the type for an async route handler
type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
// Define a function that wraps an async route handler and catches any errors
const asyncHandler =
  (fn: AsyncRouteHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Define the routes for the user controller
// Route for getting all users
router.get("/", asyncHandler(userController.getUsers));

// Route for getting a user by userId
router.get("/:id", asyncHandler(userController.getUser));

// Route for creating a new user
router.post(
  "/signup",
  upload.single("profileImage"),
  asyncHandler(userController.createUser)
);

// Route for updating a user
router.put(
  "/:id",
  upload.single("profileImage"),
  asyncHandler(userController.updateUser)
);

// Route for deleting a user
router.delete("/:id", asyncHandler(userController.deleteUser));

// Route for logging in a user
router.post("/login", asyncHandler(userController.loginUser));

// Error handling middleware should capture any errors thrown in the async handler
router.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

export default router;
