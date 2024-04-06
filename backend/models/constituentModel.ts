import { Model } from "sequelize";

// Define the Constituent interface
class Constituent extends Model {
  public constituentID!: number;
  public role!: string;
  public name!: string;
  public constituentULAN_URL!: string;
  public constituentWikidata_URL!: string;
  public gender!: string;
}

export default Constituent;
