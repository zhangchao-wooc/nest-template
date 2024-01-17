<template>
  <el-container class="layout">
    <el-aside class="layout-aside" width="200px"><Aside /></el-aside>
    <el-container>
      <el-header class="layout-header"><Header /></el-header>
      <el-main class="layout-main"><slot /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Header from "./header.vue";
import Aside from "./aside.vue";

export default {
  components: {
    Header,
    Aside,
  },
};
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  &-header {
    padding: 0 10px;
  }
  &-main {
    padding: 10px;
  }
}
</style>
