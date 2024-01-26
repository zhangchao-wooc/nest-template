<template>
  <div class="aside" :style="{ width: isCollapse ? '64px' : '200px' }">
    <div class="aside-item logo">
      {{ isCollapse ? "w" : "wooc" }}
    </div>
    <el-menu
      default-active="1"
      :collapse="isCollapse"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in menuData" :key="item.index">
        <el-menu-item :index="item.index">
          <el-icon><House /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="aside-item setting">
      <div class="setting-item">
        <el-dropdown trigger="click" @command="command">
          <el-icon :size="18"><Setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="PERSONAL_CENTER">个人中心</el-dropdown-item>
              <el-dropdown-item command="LOGOUT">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      isCollapse: true,
      activeMenu: "1",
      menuData: [
        {
          index: "1",
          icon: "House",
          title: "Home",
          path: "/",
          children: [],
        },
      ],
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string[]) {
      console.log(key, keyPath);
    },
    handleSelect(index: string, indexPath: string[], item: any) {
      this.activeMenu = index;
      const menu = this.menuData.find((item) => item.index === index);
      if (menu) {
        if (menu.path !== this.$route.path) {
          this.$router.push(menu.path);
        }
      }
    },
    handleClose(key: string, keyPath: string[]) {
      console.log(key, keyPath);
    },

    command(command: string) {
      switch (command) {
        case "PERSONAL_CENTER":
          this.$router.push("/personal-center");
          break;
        case "LOGOUT":
          // @ts-ignore
          this.$message.success("退出登录");
          localStorage.clear();
          this.$router.push("/login");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.aside {
  margin: 10px 0;
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  transition: all 0.6s;

  .logo {
    padding: 15px 0;
    display: grid;
    place-items: center;
    font-size: 25px;
  }
  .el-menu {
    height: 100%;
    border-right: none;
    border-radius: 5px;
  }

  .setting {
    padding: 10px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    &-item {
      .el-icon {
        cursor: pointer;
        &:hover {
          color: #ff6600;
        }
      }
    }
  }
}
</style>
