import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

if (!DATABASE || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error(
    "Missing required environment variables for database connection: DATABASE, DB_USER, DB_PASSWORD, DB_HOST, or DB_PORT"
  );
}

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: "mysql",
  logging: false, // Set to true for SQL query logging (for development purposes)
});

export default sequelize;
