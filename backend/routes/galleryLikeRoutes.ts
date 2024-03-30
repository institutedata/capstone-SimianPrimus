import express from "express";
const router = express.Router();
import galleryLikeController from '../controllers/galleryLikeControllers';


router.get('/:likeId', galleryLikeController.getGalleryLike);

router.post('/', galleryLikeController.createLikeByObjectId);

router.delete('/delete/:likeId', galleryLikeController.deleteGalleryLike);

router.delete('/deleteByUserId/:userId', galleryLikeController.deleteGalleryLikeByUserId);

router.delete('/deleteByObjectId/:objectID', galleryLikeController.deleteGalleryLikeByObjectId);

router.get('/', galleryLikeController.getGalleryLikes);

router.get('/:userId', galleryLikeController.getGalleryLikesByUserId);

router.get('/object/:objectID', galleryLikeController.getGalleryLikesByObjectID);

export default router;

