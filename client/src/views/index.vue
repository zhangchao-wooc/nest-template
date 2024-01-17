<template>
  <div>index</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { CommonApi } from "@/api";

onMounted(() => {
  getUserInfo();
});

const getUserInfo = async () => {
  const result = await CommonApi.getUserInfo();
  console.log(result);
};
</script>
