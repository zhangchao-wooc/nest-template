// @ts-ignore
// @ts-expect-error
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes: any) => {
    return routes
  }
})

// router.beforeEach((to, from) => {
//   // ...
//   // 返回 false 以取消导航
//   return false
// })

export default router
