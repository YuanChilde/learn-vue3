import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { loadAllPlugins } from '@/plugins'
import { AppConfig } from '@/config/app'
import Axios from './libs/axios'

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  // require('./mock')
}

const app: ReturnType<typeof createApp> = createApp(App)

//AppConfig 变量与globalProperties绑定
app.config.globalProperties = AppConfig

app.provide('AppConfig', AppConfig)

loadAllPlugins(app)

app
  .use(store)
  .use(router)
  .use(Axios)
  .mount('#app')
