import express from "express";
import {create, list, categoryById, read, update, remove,} from "../controllers/category";

const router = express.Router();

//add 
router.post("/category", create);

//list 
router.get("/categories", list);

//update
router.put("/category/:categoryId", update);

//delete
router.delete("/category/:categoryId", remove);

router.get("/category/:categoryId", read);
router.param("categoryId", categoryById);

module.exports = router;
