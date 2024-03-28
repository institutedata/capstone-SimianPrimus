import { DataTypes, Model } from "sequelize";
import dbConnect from "../dbConnect";
import bcrypt from 'bcrypt';

const sequelize = dbConnect.Sequelize;

class User extends Model {
  [x: string]: any;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "Users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    }
  }
);

export default User;

