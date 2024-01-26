<script setup lang="ts">
import Layout from "./layout/index.vue";
</script>

<template>
  <Layout v-if="$route.path !== '/login'"><router-view></router-view></Layout>
  <router-view v-else></router-view>
</template>

<style scoped>
#app {
  background-color: #ccc;
}
</style>
