import axios from "axios";
import { Request, Response } from "express";
import Artwork from "../models/artworkModel";
import db from "../dbConnect";
import { literal } from "sequelize";

const sequelize = db.Sequelize;

// Fetch object IDs from the Met API and save them to the database
export const fetchObjectIDs = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    );
    const objectIDs: number[] = response.data.objectIDs;
    // Save the object IDs to the database
    await fetchAndSyncArtworks(objectIDs);

    res.json(objectIDs);
    console.log("Object IDs fetched and saved to the database.");
    // Error handling
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching object IDs:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Fetch artwork details from the Met API and save them to the database
export const fetchAndSyncArtworks = async (
  objectIDs: number[]
): Promise<void> => {
  for (const objectID of objectIDs) {
    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const artworkData = response.data;

      // Check if the artwork with the same objectID already exists in the database
      const existingArtwork = await Artwork.findOne({ where: { objectID } });
      if (existingArtwork) {
        console.log(
          `Artwork with objectID ${objectID} already exists in the database. Skipping.`
        );
        continue;
      }

      // If the artwork has a primary image and is classified as a Painting, save it to the database
      if (artworkData.primaryImage && artworkData.objectName === "Painting") {
        const newArtwork = new Artwork({
          objectID: artworkData.objectID,
          primaryImage: artworkData.primaryImage,
          title: artworkData.title,
          artist: artworkData.artistDisplayName,
          nationality: artworkData.artistNationality,
          date: artworkData.objectDate,
          medium: artworkData.medium,
          dimensions: artworkData.dimensions,
          culture: artworkData.culture,
          style: artworkData.artistDisplayBio,
          classification: artworkData.objectName,
          department: artworkData.department,
          link: artworkData.objectWikidata_URL,
          constituents: artworkData.constituents?.map(
            (constituent: {
              constituentID: any;
              role: any;
              name: any;
              constituentULAN_URL: any;
              constituentWikidata_URL: any;
              gender: any;
            }) => ({
              constituentID: constituent?.constituentID,
              role: constituent?.role,
              name: constituent?.name,
              constituentULAN_URL: constituent?.constituentULAN_URL,
              constituentWikidata_URL: constituent?.constituentWikidata_URL,
              gender: constituent?.gender,
            })
          ),
        });
        await newArtwork.save();
        console.log(
          `Artwork with objectID ${artworkData.objectID} saved to the database.`
        );
      } else if (!artworkData.primaryImage) {
        console.log(
          `Artwork with objectID ${artworkData.objectID} does not have a primary image and will not be saved to the database.`
        );
      } else if (artworkData.objectName !== "Painting") {
        console.log(
          `Artwork with objectID ${artworkData.objectID} is not classified as a Painting and will not be saved to the database.`
        );
      }
    } catch (error: any) {
      console.error(
        `Error fetching object details for ID ${objectID}:`,
        error.message
      );
      continue;
    }
  }
};

// Add artwork to the database
export const addArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artwork = await Artwork.create(req.body);
    res.json(artwork);
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error adding artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get artwork by objectID
export const getArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const objectID = parseInt(req.params.objectID);
    const artwork = await Artwork.findOne({
      where: {
        objectID,
      },
    });
    if (artwork) {
      res.json(artwork);
    } else {
      res
        .status(404)
        .json({ error: `Artwork with objectID ${objectID} not found.` });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get artwork by title
export const getArtworkByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = req.params.title;
    const artwork = await Artwork.findOne({
      where: {
        title,
      },
    });
    if (artwork) {
      res.json(artwork);
    } else {
      res.status(404).json({ error: `Artwork with title ${title} not found.` });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get 20 artworks by constituents name
export const getArtworksByConstituent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const name = req.params.name;
    const escapedName = sequelize.escape(`{"name": "${name}"}`);

    const artworks = await Artwork.findAll({
      where: sequelize.literal(`JSON_CONTAINS(constituents, ${escapedName})`),
      limit: 20,
    });
    if (artworks.length > 0) {
      res.json(artworks);
    } else {
      res.status(404).json({
        error: `Artworks with constituent name ${name} not found.`,
      });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching artworks:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get 20 artworks by department
export const getArtworksByDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const department = req.params.department;
    console.log(department);
    const artworks = await Artwork.findAll({
      where: {
        department,
      },
      limit: 20,
    });
    if (artworks.length > 0) {
      console.log(artworks);
      res.json(artworks);
    } else {
      res.status(404).json({
        error: `Artworks in department ${department} not found.`,
      });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching artworks:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get all artworks
export const getAllArtworks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const artworks = await Artwork.findAll();
    res.json(artworks);
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching artworks:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get a random artwork
export const getRandomArtwork = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const artwork = await Artwork.findOne({
      // Add a random order to the query
      order: literal("RAND()"),
    });
    if (artwork) {
      res.json(artwork);
    } else {
      res.status(404).json({ error: "No artworks found." });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching random artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Update artwork by objectID. For admin use only.
export const updateArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const objectID = parseInt(req.params.objectID);
    const updatedArtwork = await Artwork.update(req.body, {
      where: {
        objectID,
      },
    });
    if (updatedArtwork) {
      res.json({
        message: `Artwork with objectID ${objectID} has been updated.`,
      });
    } else {
      res
        .status(404)
        .json({ error: `Artwork with objectID ${objectID} not found.` });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error updating artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Delete artwork by objectID. For admin use only.
export const deleteArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const objectID = parseInt(req.params.objectID);
    const deletedArtwork = await Artwork.destroy({
      where: {
        objectID,
      },
    });
    if (deletedArtwork) {
      res.json({
        message: `Artwork with objectID ${objectID} has been deleted.`,
      });
    } else {
      res
        .status(404)
        .json({ error: `Artwork with objectID ${objectID} not found.` });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error deleting artwork:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Unknown error occurred:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default {
  fetchObjectIDs,
  fetchAndSyncArtworks,
  addArtwork,
  getArtwork,
  getAllArtworks,
  updateArtwork,
  deleteArtwork,
  getRandomArtwork,
  getArtworkByTitle,
  getArtworksByConstituent,
  getArtworksByDepartment,
};
