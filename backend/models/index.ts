"use strict";
import Artwork from "./artworkModel";
import User from "./userModel";
import OriginalArtwork from "./originalArtwork";
import Like from "./likeModel";

// Create tables if they do not exist in the database
async function init() {
  try {
    await Artwork.sync();
    console.log("Artwork table created");
    await User.sync();
    console.log("User table created");
    await OriginalArtwork.sync();
    console.log("OriginalArtwork table created");
    await Like.sync();
    console.log("Like table created");
  } catch (error: any) {
    console.error("Error creating tables:", error);
  }
}

export default {
  Artwork,
  User,
  init,
};
