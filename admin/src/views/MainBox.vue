<template>
  <div>
    <el-container>
      <SideMenu></SideMenu>
      <el-container direction="vertical">
        <TopHeader></TopHeader>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import TopHeader from "@/components/mainBox/TopHeader"
import SideMenu from "@/components/mainBox/SideMenu"
</script>