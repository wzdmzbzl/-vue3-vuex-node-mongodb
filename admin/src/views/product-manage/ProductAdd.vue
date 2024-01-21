<template>
  <div>
    <el-page-header
      content="添加产品"
      icon=""
      title="产品管理"
    ></el-page-header>

    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productRules"
      label-width="160px"
      class="demo-ruleForm"
      style="width: 1000px;"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @changeFile="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload.vue";
import { upload } from "@/util/upload"
import { useRouter } from "vue-router"
const router = useRouter()

const productFormRef = ref();
let productForm = ref({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
});

const handleChange = (file) => {
  productForm.value.cover = URL.createObjectURL(file)
  productForm.value.file = file
}

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if(valid) {
      await upload("/adminapi/product/add", productForm.value)
      router.push(`/product-manage/productlist`)
    }
  })
};

const productRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简要描述", trigger: "blur" }],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});


</script>
