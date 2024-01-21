const mongoose = require("mongoose")
const Schema = mongoose.Schema


// user模型 ==> users集合

const ProductType = {
  title: String,
  introduction: String,
  detail: String, // 类别 1 2 3
  cover: String,// 封面
  editTime: Date
}

const ProductModel = mongoose.model("product", new Schema(ProductType))

module.exports = ProductModel