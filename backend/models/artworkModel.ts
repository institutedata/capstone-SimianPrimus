import { DataTypes, Model } from 'sequelize';
import dbConnect from '../dbConnect';

const sequelizeInstance = dbConnect.Sequelize;

class Artwork extends Model {
  public id!: number;
  public objectID!: number;
  public isHighlight!: boolean;
  public primaryImage!: string;
  public department!: string;
  public objectName!: string;
  public title!: string;
  public constituentID!: number;
  public role!: string;
  public name!: string; 
  public constituentULAN_URL!: string; 
  public constituentWikidata_URL!: string;
  public gender!: string;
  public culture!: string;
  public period!: string;
  public dynasty!: string;
  public reign!: string;
  public portfolio!: string;
  public artistRole!: string;
  public artistPrefix!: string;
  public artistDisplayName!: string;
  public artistDisplayBio!: string;
  public artistSuffix!: string;
  public artistAlphaSort!: string;
  public artistNationality!: string;
  public artistBeginDate!: string;
  public artistEndDate!: string;
  public artistGender!: string;
  public artistWikidata_URL!: string;
  public artistULAN_URL!: string;
  public objectDate!: string;
  public objectBeginDate!: number;
  public objectEndDate!: number;
  public medium!: string;
  public dimensions!: string;
  public classification!: string;
  public objectWikidata_URL!: string;
  public likeCount!: number;
  
}

Artwork.init(
  {
    objectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    primaryImage: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistDisplayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistDisplayBio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistNationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistBeginDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistEndDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    objectBeginDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    objectEndDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    constituents: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dimensions: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    classification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },  
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'Artwork',
    tableName: 'Artworks',
  }
);

export default Artwork;