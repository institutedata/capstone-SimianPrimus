import express from "express";
const router = express.Router();
import originalArtworkController from "../controllers/originalArtworkControllers";

// Route for getting all original artworks
router.get("/", originalArtworkController.getOriginalArtworks);

// Route for creating a new original artwork
router.post("/", originalArtworkController.createOriginalArtwork);

// Route for getting an original artwork by ID
router.get("/:artworkId", originalArtworkController.getOriginalArtwork);

// Route for updating an original artwork
router.put("/:artworkId", originalArtworkController.updateOriginalArtwork);

// Route for deleting an original artwork
router.delete("/:artworkId", originalArtworkController.deleteOriginalArtwork);

export default router;
