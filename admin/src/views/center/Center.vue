<template>
  <div>
    <el-page-header
      content="个人中心"
      icon=""
      title="企业门户网站管理系统"
    ></el-page-header>

    <el-row :gutter="20" class="el-row">
      <el-col :span="6">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h5>{{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h5>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userRules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username" style="width: 540px">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                class="m-2"
                size="large"
                style="width: 440px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="个人简介"
              prop="introduction"
              style="width: 540px"
            >
              <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @changeFile="handleChange" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import { useStore } from "vuex";
import { upload } from "@/util/upload";
import { ElMessage } from "element-plus";

const store = useStore();
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

const userRules = reactive({
  username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

const options = [
  { value: 0, label: "保密" },
  { value: 1, label: "男" },
  { value: 2, label: "女" },
];

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType == "OK") {
        store.commit("changeUserInfo", res.data);
        ElMessage.success("修改成功");
      }
    }
  });
};

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https:e.elemec//cubdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`
);
</script>

<style scoped lang="scss">
.el-row {
  padding-left: 20px;
  .box-card {
    text-align: center;
    height: 300px;
  }
}
</style>
