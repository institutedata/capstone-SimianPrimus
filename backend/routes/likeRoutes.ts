import express from "express";
const router = express.Router();
import likeController from "../controllers/likeControllers";

router.get('/like', likeController.getLikes);

router.get('/like/:likeId', likeController.getLike);

router.post('/like/:artworkId', likeController.createLikeByArtworkId);

router.delete('/like/delete/:likeId', likeController.deleteLike);

export default router;
