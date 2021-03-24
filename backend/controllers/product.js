import Product from "../models/product";
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash'

export const create = (req, res) => {
    const product = new Product(req.body);
    product.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Add product failed",
            });
        }
        res.json(data);
    });
};
export const read = (req, res) => {
    return res.json(req.product);
};
export const list = (req, res) => {
    console.log("product list");
    res.json({
        message: "Successfully",
    });
};
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "không xóa được sản phẩm",
            });
        }
        res.json({
            product: deleteProduct,
            message: "Sẩn phẩm xóa thành công",
        });
    });
};

export const productById = (res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            res.status(400).json({
                error: "không tìm thấy sản phẩm",
            });
        }
        res.product = product;
        next();
    });
};
export const update = (req, res) => {
    
}
