<template>
  <div>
    <el-page-header
      content="添加用户"
      icon=""
      title="用户管理"
    ></el-page-header>

    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userRules"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 1000px"
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
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @changeFile="handleChange" />
      </el-form-item>

      <el-form-item>
              <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import { upload } from "@/util/upload";
import { useRouter } from "vue-router";

const router = useRouter()
const userFormRef = ref();
const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];

const userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1管理员 2编辑
  introduction: "",
  avatar: "",
  file: null,
  gender: 0
});

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if(valid) {
      await upload("/adminapi/user/add", userForm)
      router.push(`/user-manage/userlist`)
    }
  })
}

const userRules = reactive({
  username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
});
</script>
