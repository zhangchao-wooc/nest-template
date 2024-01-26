// @ts-ignore
// @ts-expect-error
import { createRouter, createWebHistory } from 'vue-router/auto'
import whiteList from './white-list'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes: any) => {
    return routes
  }
})

router.beforeEach((to: any, from: any) => {
  // if (!whiteList.includes(to.path)) {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     console.log('Please log in first!')
  //     // router.push('/login')
  //     return false
  //   }
  // }
  return true
})

export default router
