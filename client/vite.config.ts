import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({ autoInstall: true, compiler: 'vue3' }),
    AutoImport({
      imports: [VueRouterAutoImports],
      resolvers: [ElementPlusResolver(), IconsResolver({
        prefix: 'Icon',
      }),],
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({})],
    }),
    VueRouter({
      routesFolder: ['src/views'],
      extensions: ['.vue'],
      extendRoute: (route: any) => {
        return route
      }
    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': 'https://wooc.com:8000',
      // '/api': {
      //   target: 'https://wooc.com:8000/',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy 是 'http-proxy' 的实例
      //     console.log(proxy, options)
      //   }
      // },
    }
  }
})
