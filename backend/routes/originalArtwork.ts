import express from "express";
const router = express.Router();
import originalArtworkController from '../controllers/originalArtworkControllers';

router.get('/', originalArtworkController.getOriginalArtworks);

router.post('/', originalArtworkController.createOriginalArtwork);

router.get('/:artworkId', originalArtworkController.getOriginalArtwork);

router.put('/:artworkId', originalArtworkController.updateOriginalArtwork);

router.delete('/:artworkId', originalArtworkController.deleteOriginalArtwork); 

export default router;

