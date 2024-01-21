<template>
  <div>
    <el-card>
      <el-page-header
        content="用户列表"
        icon=""
        title="用户管理"
      ></el-page-header>

      <el-table :data="tableData" border>
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <div v-if="row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.role === 1" type="danger">管理员</el-tag>
            <el-tag v-else type="success">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button @click="handleEdit(row)" type="primary">编辑</el-button>
            <el-popconfirm
              :title="`你确定删除${row.username}吗?`"
              confirmButtonText="确定"
              cancelButtonText="取消"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="编辑用户" width="40%">
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" class="m-2" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input type="textarea" v-model="userForm.introduction" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive} from "vue";
import axios from "axios";

const dialogVisible = ref(false);
const userFormRef = ref();
let userForm = ref({
  username: "",
  password: "",
  introduction: "",
  role: 2
})

const userRules = reactive({
  username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
});

const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];

const tableData = ref([]);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  tableData.value = res.data.data;
};
// 编辑用户
const handleEdit = async (data) => {
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  userForm.value = res.data.data[0]
  dialogVisible.value = true;
};

// 确定更改
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if(valid) {
      // 更新后端  隐藏弹框 获取table数据
      let res = await axios.put(`/adminapi/user/list/${userForm.value._id}`, userForm.value)
      if(res.data.ActionType == 'OK') {
        dialogVisible.value = false
        getTableData()
      }
    }
  })
}

// 删除用户
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`);
  getTableData();
};
</script>
