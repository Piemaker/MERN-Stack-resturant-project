import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js"


const app = express();
app.use(cors());
// * accepts JSON in the body of the request no need for body parser
app.use(express.json()); 

// main URL

app.use("/api/v1/restaurants", restaurants);

// * response for non-existing routes
app.use("*", (req, res) => { res.status(404).json({ error: "Page not found" }) });

export default app;
