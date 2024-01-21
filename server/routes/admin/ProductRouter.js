var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');

var ProductRouter = express.Router();

// 图片上传插件,解析form表单数据
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

// 涉及文件上传, 普通的post不行,需要加上multer中间件
ProductRouter.post("/adminapi/product/add", upload.single("file"), ProductController.add)
ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList)
ProductRouter.post("/adminapi/product/list", upload.single("file"), ProductController.updateList)
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList)

module.exports = ProductRouter