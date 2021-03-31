import Category from "../models/category";
import formidable from "formidable";
import _ from "lodash"

export const create = (req, res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        err: "thêm sản phẩm không thành công",
      });
    }
    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        err: "bạn cần nhập đầy đủ thông tin",
      })
    }
    const category = new Category(fields);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "không thêm được danh mục",
        });
      }
      res.json({ data });
    });
  });
};

export const list = (req, res) => {
  Category.find((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Danh mục không tôn tại",
      });
    }
    res.json({ categories });
  });
};

export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "không tìm thấy danh mục",
      });
    }
    req.category = category;
    next();
  });
};

export const read = (req, res) => {
  return res.json(req.category);
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        err: "Sửa sản phẩm không thành công",
      });
    }
    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        err: "Bạn cần nhập đầy đủ thông tin",
      })
    }
    let category = req.category;
      category =_.assignIn(category, fields); 
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Không sửa được danh mục",
        });
      }
      res.json({ data });
    });
  });
};

export const remove = (req, res) => {
  let category = req.category;
  console.log(category);
  category.remove((err, deleteCategory) => {
    if (err || !category) {
      res.status(400).json({
        error: "Danh mục không tồn tại",
      });
    }
    res.json({
      deleteCategory,
      message: "Xóa thành công",
    });
  });
};
