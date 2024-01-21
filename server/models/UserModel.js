const mongoose = require("mongoose")
const Schema = mongoose.Schema


// user模型 ==> users集合

const userType = {
  username: String,
  password: String,
  gender: Number, // 性别
  introduction: String,// 简介
  avatar: String, // 头像
  role: Number, //管理员1, 编辑2
}

const UserModel = mongoose.model("user", new Schema(userType))

module.exports = UserModel