import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const mongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

// Connect to DB

mongoClient
  .connect(process.env.RESTAURANTS_MONGO_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(
        "🚀 ~ file: index.js ~ line 26 ~ app.listen",
        `listening on port ${port}`
      );
    });
  });
