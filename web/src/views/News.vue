<template>
  <div class="container">
    <div
      class="news-header"
      :style="{
        backgroundImage: `url(${require('@/assets/news.jpg')})`,
      }"
    ></div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="检索结果"
        width="30%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            :prefix-icon="Search"
            v-model="searchText"
            placeholder="请输入新闻关键字"
            class="w-50 m-2"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchNewsList.length">
          <div
            v-for="item in searchNewsList"
            :key="item._id"
            class="search-item"
            @click="handleChangePage(item._id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无新闻" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>

    <div class="topNews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card shadow="hover" @click="handleChangePage(item._id)">
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-tabs style="margin: 20px" v-model="witchTab" class="demo-tabs">
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="(data, index) in tabNews[item.name]" :key="index">
              <el-card shadow="hover" @click="handleChangePage(data._id)">
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>
                <div style="padding: 14px; float: left; cursor: pointer">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in tabNews[item.name]"
                :key="index"
                :timestamp="whichTime(activity.editTime)"
              >
                {{ activity.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router"
import axios from "axios";

moment.locale("zh-cn");

const router = useRouter()
const searchText = ref("");
const visible = ref(false);
const newsList = ref([]);

const witchTab = ref(1);

const tabList = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  newsList.value = res.data.data;
});

const searchNewsList = computed(() =>
  searchText.value
    ? newsList.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topNewsList = computed(() => newsList.value.slice(0, 4));

const whichTime = (time) => {
  return moment(time).format("lll");
};

const tabNews = computed(() =>
  _.groupBy(newsList.value, (item) => item.category)
);

const handleChangePage = (id) => {
  router.push(`/news/${id}`)
}

</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 400px;
  background-size: 100% 100%;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  .el-input {
    width: 30%;
  }
}
.search-item {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.topNews {
  margin: 20px;
  cursor: pointer;
  .image {
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
  }
  .time {
    font-size: 13px;
    color: gray;
  }
}

.tab-image {
  width: 200px;
  height: 150px;
  background-size: 100% 100%;
  float: left;
}
.tab-time {
  font-size: 13px;
  color: gray;
}
</style>
