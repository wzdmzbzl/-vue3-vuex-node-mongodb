<template>
    <Navbar></Navbar>
    <router-view></router-view>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}
.el-page-header {
  margin: 20px;
}
</style>
