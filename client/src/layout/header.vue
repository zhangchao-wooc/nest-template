<template>
  <div class="header">
    <!-- <div class="header-center"></div> -->
    <div class="header-right">
      <el-dropdown trigger="click">
        <el-icon :size="18"><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="User">个人中心</el-dropdown-item>
            <el-dropdown-item :icon="Back">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { User, Back } from "@element-plus/icons-vue";
</script>

<style lang="scss" scopde>
.header {
  padding: 0 10px;
  height: 60px;
  display: grid;
  align-items: center;
  justify-content: end;
  background-color: #fff;
  border-radius: 5px;
}
</style>
