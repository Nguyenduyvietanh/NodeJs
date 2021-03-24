import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
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

app.use(bodyParser.json());
app.use("/api", productRouter);
app.use(morgan("dev"));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});