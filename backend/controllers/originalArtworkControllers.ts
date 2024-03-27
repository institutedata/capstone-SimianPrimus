'use strict'
import Models from '../models/originalArtwork';

export const getOriginalArtworks = async (_req: any, res: any) => {
    try {
        const originalArtworks = await Models.findAll();
        res.json(originalArtworks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOriginalArtwork = async (req: any, res: any) => {
    try {
        const originalArtwork = await Models.findByPk(req.params.artworkId);
        res.json(originalArtwork);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createOriginalArtwork = async (req: any, res: any) => {
    try {
        const originalArtwork = await Models.create(req.body);
        res.json(originalArtwork);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOriginalArtwork = async (req: any, res: any) => {
    try {
        const originalArtwork = await Models.findByPk(req.params.artworkId);
        if (originalArtwork) {
            originalArtwork.update(req.body);
            res.json(originalArtwork);
        } else {
            res.status(404).json({ message: "OriginalArtwork not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOriginalArtwork = async (req: any, res: any) => {
    try {
        const originalArtwork = await Models.findByPk(req.params.artworkId);
        if (originalArtwork) {
            originalArtwork.destroy();
            res.json({ message: "OriginalArtwork deleted" });
        } else {
            res.status(404).json({ message: "OriginalArtwork not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getOriginalArtworks,
    getOriginalArtwork,
    createOriginalArtwork,
    updateOriginalArtwork,
    deleteOriginalArtwork
};