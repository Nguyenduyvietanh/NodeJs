import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash"

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      // console.log('hellos');
      return res.status(400).json({
        err: "thêm sản phẩm không thành công",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        err: "bạn cần nhập đầy đủ thông tin",
      });
    }
    let product = new Product(fields);
    //1kb = 1000
    //1mb = 100000
    if (files.photo) {
      if (files.photo.size > 100000) {
        console.log('hellos');
        return res.status(400).json({
          err: "bạn nên upload ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      // console.log('hehheh');
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "không thêm được sản phẩm",
        });
      }
      res.json(data);
    });
  });
};
export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "sửa sản phẩm không thành công",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Bạn cần nhận đủ thông tin",
      });
    }
    let product = req.product;
    product = _.assignIn(product, fields);
    if (files.photo) {
      if (files.photo.size > 100000) {
        res.status(400).json({
          error: "bạn nên upload ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "không sửa được sản phẩm",
        });
      }
      res.json(data);
    });
  });
};
export const read = (req, res) => {
  return res.json(req.product);
};
export const list = (req, res) => {
  Product.find((err, data) => {
    if (err) {
      error: "không tìm thấy sản phẩm";
    }
    res.json(data);
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
      deleteProduct,
      message: "Sẩn phẩm xóa thành công",
    });
  });
};

export const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      res.status(400).json({
        error: "không tìm thấy sản phẩm",
      });
    }
    req.product = product;
    next();
  });
};
export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}
