<template>
  <div>
    <el-card>
      <el-page-header
        content="产品列表"
        icon=""
        title="产品管理"
      ></el-page-header>

      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="产品名称" prop="title" />
        <el-table-column label="简要描述" prop="introduction" />
        <el-table-column label="更新时间">
          <template #default="{ row }">
            {{ timeFormat(row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
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
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { formatTime } from "@/util/formatTime";
import { Edit, Delete } from "@element-plus/icons-vue";
import axios from "axios";
import { useRouter } from "vue-router";



const router = useRouter()
const tableData = ref([]);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  let res = await axios.get("/adminapi/product/list");
  tableData.value = res.data.data;
};

// 格式化时间
const timeFormat = (data) => {
  return formatTime.getTime(data);
};

const handleDelete = async (row) => {
  await axios.delete(`/adminapi/product/list/${row._id}`)
  await getTableData()
};

const handleEdit = async (row) => {
  // 跳转到/news-manage/editproduct/:id
  router.push(`/product-manage/editproduct/${row._id}`)
}
</script>
<style>
::v-deep .htmlContent {
  max-width: 100%;
}
</style>
