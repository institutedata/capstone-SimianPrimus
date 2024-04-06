import { DataTypes, Model } from "sequelize";
import dbConnect from "../dbConnect";
import OriginalArtwork from "./originalArtwork";
import Artwork from "./artworkModel";
import User from "./userModel";

// Connect to the database
const sequelize = dbConnect.Sequelize;

class Like extends Model {}

Like.init(
  {
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    objectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    artworkId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "like",
    tableName: "Likes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "objectID"],
      },
      {
        unique: true,
        fields: ["userId", "artworkId"],
      },
    ],
  }
);

// Define the relationships between the models
Like.belongsTo(OriginalArtwork, {
  foreignKey: "artworkId",
  targetKey: "artworkId",
});
// Define the relationships between the models
Like.belongsTo(Artwork, {
  foreignKey: "objectID",
  as: "artwork",
  targetKey: "objectID",
});

Artwork.hasMany(Like, {
  foreignKey: "objectID",
  as: "likes",
});

Like.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "userId",
});

User.hasMany(Like, {
  foreignKey: "userId",
  sourceKey: "userId",
});

export default Like;
