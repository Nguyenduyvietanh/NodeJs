import express from "express";
import { update, list, create, productById, read, remove, photo } from "../controllers/product";

const router = express.Router();

//add product
router.post("/products", create);

//list product
router.get("/products", list);

//update product
router.put("/products/:productId", update);

//photo
router.get("/products/photo/:productId", photo)

//delete product
router.delete("/products/:productId", remove);

//detail product
router.param("productId", productById);
router.get("/products/:productId", read);
module.exports = router;