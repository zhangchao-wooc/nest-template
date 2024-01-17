<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "./layout/index.vue";

const route = useRoute();
</script>

<template>
  <Layout v-if="$route.path !== '/login'"><router-view></router-view></Layout>
  <router-view v-else></router-view>
</template>

<style scoped></style>
