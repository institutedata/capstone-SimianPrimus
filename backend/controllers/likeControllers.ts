"use strict";
import Models from "../models/likeModel";
import OriginalArtwork from "../models/originalArtwork";
import Like from "../models/likeModel";
import { Request, Response } from "express";

export const getLikes = async (_req: any, res: any) => {
  try {
    const likes = await Models.findAll();
    res.json(likes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLike = async (req: any, res: any) => {
  try {
    const like = await Models.findByPk(req.params.likeId);
    res.json(like);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLikeByArtworkId = async (req: Request, res: Response) => {
  try {
    const { userId, artworkId } = req.body;

    // Find the OriginalArtwork by artworkId
    const originalArtwork = await OriginalArtwork.findByPk(artworkId);

    if (!originalArtwork) {
      return res.status(404).json({
        message: `OriginalArtwork with artworkId ${artworkId} not found`,
      });
    }

    console.log("Original Artwork ID:", originalArtwork.artworkId);
    const like = await Like.create({
      userId,
      artworkId: originalArtwork.artworkId, 
    });

    res.json(like);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLike = async (req: any, res: any) => {
  try {
    const like = await Like.findByPk(req.params.likeId);

    if (!like) {
      console.log(`Like with likeId ${req.params.likeId} not found`);
      return res.status(404).json({ message: `Like with likeId ${req.params.likeId} not found` });
    }

    console.log(`Deleting like with likeId: ${like}`);

    await Like.destroy({
      where: {
        likeId: req.params.likeId,
      },
    });

    console.log(`Like with likeId ${req.params.likeId} deleted`);
    res.json({ message: `Like with likeId ${req.params.likeId} deleted` });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getLikes,
  getLike,
  createLikeByArtworkId,
  deleteLike,
};
