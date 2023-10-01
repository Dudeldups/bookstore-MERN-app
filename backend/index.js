import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse request body
app.use(express.json());

// Middleware to handle CORS policy
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome!");
});

app.use("/books", bookRoutes);

mongoose
  .connect(process.env.mongodbURI)
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log("App is listening to port:", PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
