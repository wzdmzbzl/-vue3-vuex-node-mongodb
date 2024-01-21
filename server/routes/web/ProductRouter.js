var express = require('express');
const  ProductController = require('../../controllers/web/ProductController');

var ProductRouter = express.Router();



ProductRouter.get("/webapi/product/list", ProductController.getList)
// ProductRouter.get("/webapi/news/list/:id", ProductController.getList)
// ProductRouter.get("/webapi/news/toplist", ProductController.getTopList)


module.exports = ProductRouter