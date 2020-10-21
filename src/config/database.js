import { config } from "dotenv";
import Sequelize from "sequelize";

config();

export default new Sequelize(process.env.DATABASE_URL);
