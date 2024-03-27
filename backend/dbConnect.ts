import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);
    
const connectMysql = async (sequelizeInstance: Sequelize, dbName: string) => {
    try {
        await sequelizeInstance.authenticate();
        console.log(`Connection to ${dbName} has been established successfully.`);
    } catch (error) {
        console.error(`Unable to connect to the database: ${dbName}`, error);
        process.exit(1);
    }
};

// Pass the required arguments to the connectMysql function
connectMysql(sequelize, process.env.DB_NAME ?? '');

export default {
    Sequelize: sequelize,
    connectMysql,
};

