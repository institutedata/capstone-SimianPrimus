import { DataTypes, Model } from "sequelize";
import dbConnect from "../dbConnect";

const sequelizeInstance = dbConnect.Sequelize;

class OriginalArtwork extends Model {
  public artworkId!: number;
  public userId!: number;
  public title!: string;
  public artist!: string;
  public yearCreated!: string;
  public medium!: string;
  public dimensions!: string;
  public description!: string;
  public imageURL!: string;
  public comments!: string[];
  public likeCount!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

OriginalArtwork.init(
  {
    artworkId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearCreated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "originalArtwork",
  }
);

export default OriginalArtwork;
