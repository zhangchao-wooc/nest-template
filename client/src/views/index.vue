<template>
  <div class="home">index page</div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { CommonApi, AccountApi } from "@/api";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getApplicateHealth();
    this.getUserInfoById();
    // ElMessage({
    //   message: `错误码`,
    //   type: "error",
    // });
    // @ts-ignore
    // this.$message.error("错误码");
  },
  methods: {
    async getApplicateHealth() {
      const result = await CommonApi.getApplicateHealth();
      console.log(result);
    },

    async getUserInfoById() {
      const result = await AccountApi.getUserInfoById({ id: "1" });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
