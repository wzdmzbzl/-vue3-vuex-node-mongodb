<template>
  <div class="container">
    <el-carousel height="calc(100vh - 100px)">
      <el-carousel-item :key="1">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/home1.jpg')})`,
          }"
        >
        <h3>互联网+时代</h3>
      </div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/home2.jpg')})`,
          }"
        >
        <h3>互联网+时代</h3>
      </div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/home3.jpg')})`,
          }"
        >
        <h3>互联网+时代</h3>
      </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.el-carousel div{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.el-carousel__item h3 {
  color: red;
  opacity: 0.75;
  line-height: 600px;
  margin: 0;
  text-align: center;
  font-size: 60px
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
