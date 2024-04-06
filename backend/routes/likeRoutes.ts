import express from "express";
const router = express.Router();
import likeController from "../controllers/likeControllers";

// Route to get all likes
router.get("/", likeController.getLikes);

// Route to get a like by its ID
router.get("/:likeId", likeController.getLike);

// Route to create a like by artwork ID
router.post("/:artworkId", likeController.createLikeByArtworkId);

// Route to delete a like by its ID
router.delete("/delete/:likeId", likeController.deleteLike);

export default router;
