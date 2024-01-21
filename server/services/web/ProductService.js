const ProductModel = require("../../models/ProductModel");

const ProductService = {
  getList: async ({ _id }) => {
    return _id ? ProductModel.find({ _id }) : ProductModel.find();
  },
};

module.exports = ProductService;
