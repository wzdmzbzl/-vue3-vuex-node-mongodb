<template>
  <div>
    <el-page-header
      content="创建新闻"
      icon=""
      title="新闻管理"
    ></el-page-header>

    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsRules"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 1000px;"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor @event="handleChange"/>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="newsForm.category">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @changeFile="changeFile"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">添加新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue"
import Editor from "@/components/editor/Editor"
import Upload from "@/components/upload/Upload.vue"
import {upload} from "@/util/upload"
import { useRouter } from "vue-router"
const router = useRouter()

const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if(valid) {
      console.log(newsForm);
      let res = await upload("/adminapi/news/add", newsForm)
      console.log(res);
      router.push(`/news-manage/newslist`)
    }
  })
}

const changeFile = (file) => {
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = file
}

const handleChange = (data) => {
  newsForm.content = data
}

const options = [
  {label: "最新动态", value: 1},
  {label: "典型案例", value: 2},
  {label: "通知公告", value: 3}
]

const newsFormRef = ref()
const newsForm = reactive({
  title: "",
  content: "",
  category: 2, // 1最新动态 2典型案例 3通知公告
  cover: "",
  file: null, // 提交给后端的二进制图片信息
  isPublish: 0 // 0 未发布 1 已发布
})

const newsRules = reactive({
  title: [
    {required: true, message: "请输入标题", trigger: "blur"}
  ],
  content: [
    {required: true, message: "请输入内容", trigger: "blur"}
  ],
  category: [
    {required: true, message: "请选择分类", trigger: "blur"}
  ],
  cover: [
    {required: true, message: "请上传图片", trigger: "blur"}
  ],
})

</script>

<style scoped lang="scss"> 

</style>
