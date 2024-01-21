<template>
  <div>
    <el-page-header
      content="首页"
      icon=""
      title="企业门户网站管理系统"
    ></el-page-header>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎 {{ store.state.userInfo.username }} 回来, {{ welComeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>

      <el-carousel v-if="loopList.length" :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
            backgroundSize: 'cover'
          }">
            <h3>{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore();

const loopList = ref([])

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`
);

const welComeText = computed(() => {
  return new Date().getHours() < 12 ? "要开心每一天" : "喝杯咖啡提提神吧";
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  loopList.value = res.data.data; 
  console.log(loopList.value);
}

onMounted(() => {
  getTableData()
})
</script>

<style scoped lang="scss">
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #fff;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
