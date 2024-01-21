const NewsModel = require("../../models/NewsModel");



const NewsService = {
  add: async ({title, content, category, cover, isPublish, editTime}) => {
    // 数据库的模型处理
    return NewsModel.create({title, content, category, cover, isPublish, editTime})
  },

  getList: async ({_id}) => {
    return _id?NewsModel.find({_id}):NewsModel.find({})
  },

  publish: async ({_id, isPublish, editTime}) => {
    return NewsModel.updateOne({_id}, { isPublish, editTime})
  },

  delList: async ({_id}) => {
    return NewsModel.deleteOne({_id})
  },

  updateList: async ({_id, title, content, category, cover, isPublish, editTime}) => {
    if(cover) {
      return NewsModel.updateOne({_id}, {title, content, category, cover, isPublish, editTime})
    }else {
      return NewsModel.updateOne({_id}, {title, content, category, isPublish, editTime})
    }
  }
}

module.exports = NewsService