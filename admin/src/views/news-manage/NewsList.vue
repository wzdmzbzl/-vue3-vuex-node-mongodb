<template>
  <div>
    <el-card>
      <el-page-header
        content="新闻列表"
        icon=""
        title="新闻管理"
      ></el-page-header>

      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="标题" prop="title" />
        <el-table-column label="分类">
          <template #default="{ row }">
            {{ categoryFormat(row.category) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="{ row }">
            {{ timeFormat(row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="{ row }">
            <el-switch
              v-model="row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              :icon="Star"
              circle
              type="success"
              @click="handlePreview(row)"
            ></el-button>
            <el-button :icon="Edit" circle type="info" @click="handleEdit(row)"></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.title}吗? `"
              confirmButtonText="确定"
              cancelButtonText="取消"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button :icon="Delete" circle type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="font-size: 12px; color: gray">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewData.content" class="htmlContent"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { formatTime } from "@/util/formatTime";
import { Edit, Star, Delete, StarFilled } from "@element-plus/icons-vue";
import axios from "axios";
import { useRouter } from "vue-router";



const router = useRouter()
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  let res = await axios.get("/adminapi/news/list");
  tableData.value = res.data.data;
};
// 格式化分类信息
const categoryFormat = (data) => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[data - 1];
};
// 格式化时间
const timeFormat = (data) => {
  return formatTime.getTime(data);
};
// 修改发布状态
const changeSwitch = async (row) => {
  await axios.put(`/adminapi/news/publish`, {
    _id: row._id,
    isPublish: row.isPublish,
  });

  await getTableData();
};

// 预览回调
const handlePreview = (row) => {
  previewData.value = row;
  dialogVisible.value = true;
};

const handleDelete = async (row) => {
  await axios.delete(`/adminapi/news/list/${row._id}`)
  await getTableData()
};

const handleEdit = async (row) => {
  // 跳转到/news-manage/editnews/:id
  router.push(`/news-manage/editnews/${row._id}`)
}
</script>
<style>
::v-deep .htmlContent {
  max-width: 100%;
}
</style>
