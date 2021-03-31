import express from "express";
import { update, list, create, productById, read, remove } from "../controllers/product";

const router = express.Router();

//add product
router.post("/products", create);

//list product
router.get("/products", list);

//update product
router.put("/products/:productId", update);

//delete product
router.delete("/products/:productId", remove);

//detail product
router.param("productId", productById);
router.get("/products/:productId", read);
module.exports = router;