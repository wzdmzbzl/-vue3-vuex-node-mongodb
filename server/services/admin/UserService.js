const UserModel = require("../../models/UserModel")


const UserService = {
  login: async ({username, password}) => {
    let res = await UserModel.find({
      username,
      password
    })
    return res
  },

  upload: async ({_id, username, introduction, gender, avatar}) => {
    if(avatar) {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender, avatar
      })
    }else {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender
      })
    }
  },

  add: async (data) => {
    return UserModel.create(data)
  },

  getList: ({id}) => {
    return id? UserModel.find({_id: id}):UserModel.find({}, ["username", "role", "avatar", "introduction", "gender"])
  },

  delList: async ({_id}) => {
    return UserModel.deleteOne({_id})
  },

  putList: async (body) => {
    return UserModel.updateOne({_id: body._id}, body)
  }

}


module.exports = UserService