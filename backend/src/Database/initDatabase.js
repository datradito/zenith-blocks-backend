import logger from "../services/logger/logger.js";
import sequelize from "./db.js";


const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");

    // Initialize models and associations
    // initModels();

    // sequelize.sync({ alter: true });

    // Optionally sync models (only in dev or initial setup)
    if (process.env.NODE_ENV !== "production") {
      // await sequelize.sync({ alter: true });
    }
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

export { initDatabase };
