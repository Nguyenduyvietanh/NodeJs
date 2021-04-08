import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import categoryRouter from "./routes/category";
import cors from "cors";
import authRouter from "./routes/auth";
import expressValidator from "express-validator";

const app = express();
app.use(cors());
//middle
app.use(bodyParser.json());
dotenv.config();
app.use(morgan("dev"));
app.use(expressValidator());



//Router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

//connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch(() => {
    console.log(`BD it not connect`);
  });
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
