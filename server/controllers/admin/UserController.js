const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    // req.body
    var result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "用户名和密码不匹配",
      });
    } else {
      // 生成token
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, // 性别
          introduction: result[0].introduction, // 简介
          avatar: result[0].avatar, // 头像
          role: result[0].role, //管理员1, 编辑2
        },
      });
    }
  },

  upload: async (req, res) => {
    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    var payload = JWT.verify(token);
    // 调用service模块更新数据库
    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });

    if (avatar) {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
        },
      });
    }
  },

  add: async (req, res) => {
    const { username, introduction, gender, role, password } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    // 调用service模块更新数据库
    await UserService.add({
      username,
      introduction,
      gender: Number(gender),
      avatar,
      password,
      role: Number(role),
    });
    res.send({
      ActionType: "OK",
    });
  },

  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },

  delList: async (req, res) => {
    const result = await UserService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },

  putList: async (req, res) => {
    const result = await UserService.putList(req.body)
    res.send({
      ActionType: 'OK'
    })
  }
};

module.exports = UserController;
