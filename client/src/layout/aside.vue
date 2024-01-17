<template>
  <div class="menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Setting</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss">
.menu {
  height: 100%;
}
.el-menu {
  height: 100%;
  border-right: none;
}
</style>
