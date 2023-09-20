import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000/",
//     methods: ["GET", "PUT", "POST", "Delete"],
//     allowedHeaders: ["content-Type"],
//   })
// );

// default route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Howdy, Rujia!");
});

// Use middleware for /book
app.use("/books", booksRoute);

// Connect Database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database Connected!");
    // Listen to PORT only if Database is connected
    // Listen to a Port:
    // app.listen(PORT, () => {
    //   console.log(`Listening ${PORT}`);
    // });
  })
  .catch((e) => {
    console.log(e);
  });
