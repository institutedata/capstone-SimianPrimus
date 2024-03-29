import express from "express";
const router = express.Router();
import originalArtworkController from '../controllers/originalArtworkControllers';

router.get('/originalArtwork', originalArtworkController.getOriginalArtworks);

router.get('/originalArtwork/:artworkId', originalArtworkController.getOriginalArtwork);

router.post('/originalArtwork', originalArtworkController.createOriginalArtwork);

router.put('/originalArtwork/:artworkId', originalArtworkController.updateOriginalArtwork);

router.delete('/originalArtwork/:artworkId', originalArtworkController.deleteOriginalArtwork); 

export default router;

