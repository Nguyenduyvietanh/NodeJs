import express from "express";
import { update, list, create, productById, read, remove } from "../controllers/product";

const router = express.Router();

router.post('/products', create);
router.get('/products', list);
router.get('/product/:productId', read);
router.put('/product/:productId', update)
//delete product
router.delete('/product/:productId', remove);
//detail product
router.param('productId', productById);
module.exports = router;