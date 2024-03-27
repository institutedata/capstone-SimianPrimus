import { Request, Response } from "express";
import Like from "../models/likeModel";
import Artwork from "../models/artworkModel";

export const createLikeByObjectId = async (req: Request, res: Response) => {
  try {
    const { userId, objectID } = req.body;

    // Find the Artwork by objectID
    const artwork = await Artwork.findByPk(objectID);

    if (!artwork) {
      return res.status(404).json({
        message: `Artwork with objectID ${objectID} not found`,
      });
    }

    console.log("Artwork objectID:", artwork.objectID);

    // Create like
    const like = await Like.create({
      userId,
      objectID: objectID,
    });

    // Increment the likeCount for this artwork
    await artwork.increment("likeCount", { by: 1 });

    // Ensure the artwork instance is reloaded to reflect the new likeCount
    await artwork.reload();

    res.json({
      like,
      likeCount: artwork.likeCount,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryLike = async (req: any, res: any) => {
  try {
    const like = await Like.findByPk(req.params.likeId);

    if (!like) {
      console.log(`Like with likeId ${req.params.likeId} not found`);
      return res
        .status(404)
        .json({ message: `Like with likeId ${req.params.likeId} not found` });
    }

    console.log(`Deleting like with likeId: ${like}`);

    await Like.destroy({
      where: {
        likeId: req.params.likeId,
      },
    });

    res.json({ message: `Like with likeId ${req.params.likeId} deleted` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryLikeByObjectId = async (req: any, res: any) => {
  try {
    const like = await Like.findOne({
      where: {
        objectID: req.params.objectID,
      },
    });

    if (!like) {
      console.log(`Like with objectID ${req.params.objectID} not found`);
      return res
        .status(404)
        .json({ message: `Like with objectID ${req.params.objectID} not found` });
    }

    console.log(`Deleting like with objectID: ${req.params.objectID}`);

    await Like.destroy({
      where: {
        objectID: req.params.objectID,
      },
    });

    res.json({ message: `Like with objectID ${req.params.objectID} deleted` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryLikeByUserId = async (req: any, res: any) => {
  try {
    const like = await Like.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    if (!like) {
      console.log(`Like with userId ${req.params.userId} not found`);
      return res
        .status(404)
        .json({ message: `Like with userId ${req.params.userId} not found` });
    }

    console.log(`Deleting like with userId: ${req.params.userId}`);

    await Like.destroy({
      where: {
        userId: req.params.userId,
      },
    });

    res.json({ message: `Like with userId ${req.params.userId} deleted` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryLikes = async (_req: Request, res: Response) => {
  try {
    const likes = await Like.findAll();
    res.json(likes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryLike = async (req: Request, res: Response) => {
  try {
    const like = await Like.findByPk(req.params.likeId);
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.json(like);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryLikesByUserId = async (req: Request, res: Response) => {
  try {
    const likes = await Like.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(likes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryLikesByObjectID = async (
  req: Request,
  res: Response
) => {
  try {
    const likes = await Like.findAll({
      where: {
        objectID: req.params.objectID,
      },
    });
    console.log("objectID:", req.params.objectID)
    res.json(likes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createLikeByObjectId,
  deleteGalleryLike,
  deleteGalleryLikeByObjectId,
  deleteGalleryLikeByUserId,
  getGalleryLike,
  getGalleryLikesByUserId,
  getGalleryLikesByObjectID,
  getGalleryLikes,
};
