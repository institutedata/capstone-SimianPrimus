import express from "express";
const router = express.Router();
import galleryLikeController from '../controllers/galleryLikeControllers';


router.get('/galleryLike/:likeId', galleryLikeController.getGalleryLike);

router.post('/galleryLike/:objectID', galleryLikeController.createLikeByObjectId);

router.delete('/galleryLike/delete/:likeId', galleryLikeController.deleteGalleryLike);

router.delete('/galleryLike/deleteByUserId/:userId', galleryLikeController.deleteGalleryLikeByUserId);

router.delete('/galleryLike/deleteByObjectId/:objectID', galleryLikeController.deleteGalleryLikeByObjectId);

router.get('/galleryLikes', galleryLikeController.getGalleryLikes);

router.get('/galleryLikes/:userId', galleryLikeController.getGalleryLikesByUserId);

router.get('/galleryLikes/object/:objectID', galleryLikeController.getGalleryLikesByObjectID);

export default router;

