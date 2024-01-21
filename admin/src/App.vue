<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
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
