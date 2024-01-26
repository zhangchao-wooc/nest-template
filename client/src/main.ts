import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/element/index.css'

import App from './App.vue'
import router from '@/router'
import 'normalize.css/normalize.css'


const app = createApp(App)

app.config.globalProperties.$message = ElMessage

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  const comp: any = component
  app.component(key, comp)
}

// app.use(ElementPlus)
app.use(router)

app.mount('#app')
