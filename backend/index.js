import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";

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
    //* here the client is connected so the connection in the method is skipped
    await RestaurantsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(
        "🚀 ~ file: index.js ~ line 26 ~ app.listen ~ `listening on port ${port}`",
        `listening on port ${port}`
      );
    });
  });
