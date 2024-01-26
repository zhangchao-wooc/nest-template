<template>
  <div class="header">
    <!-- <div class="header-center"></div> -->
    <div class="header-setting">
      <el-dropdown trigger="click">
        <el-icon :size="18"><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scopde>
.header {
  padding: 10px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: end;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;

  &-setting {
    cursor: pointer;
  }
}
</style>
