import { DataTypes, Model } from "sequelize";
import dbConnect from "../dbConnect";
import OriginalArtwork from "./originalArtwork";
import Artwork from "./artworkModel";

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
  }
);

Like.belongsTo(OriginalArtwork, {
  foreignKey: "artworkId",
  targetKey: "artworkId",
});

Like.belongsTo(Artwork, {
  foreignKey: "objectID",
  targetKey: "objectID",
});

export default Like;