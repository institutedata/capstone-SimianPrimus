import express from "express";
const router = express.Router();
import galleryLikeController from "../controllers/galleryLikeControllers";

// Route for getting a like by ID
router.get("/:likeId", galleryLikeController.getGalleryLike);

// Route for creating a new like
router.post("/", galleryLikeController.createLikeByObjectId);

// Route for updating a like
router.delete("/delete/:likeId", galleryLikeController.deleteGalleryLike);

// Route for deleting a like by user ID
router.delete(
  "/deleteByUserId/:userId",
  galleryLikeController.deleteGalleryLikeByUserId
);

// Route for deleting a like by object ID
router.delete(
  "/deleteByObjectId/:objectID",
  galleryLikeController.deleteGalleryLikeByObjectId
);

// Route for getting all likes
router.get("/", galleryLikeController.getGalleryLikes);

// Route for getting all likes by user ID
router.get("/:userId", galleryLikeController.getGalleryLikesByUserId);

// Route for getting all likes by object ID
router.get(
  "/object/:objectID",
  galleryLikeController.getGalleryLikesByObjectID
);

export default router;
