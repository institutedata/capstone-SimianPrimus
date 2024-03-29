import express from "express";
const router = express.Router();
import likeController from "../controllers/likeControllers";

router.get('/', likeController.getLikes);

router.get('/:likeId', likeController.getLike);

router.post('/:artworkId', likeController.createLikeByArtworkId);

router.delete('/delete/:likeId', likeController.deleteLike);

export default router;
