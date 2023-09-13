import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

import './index.css'

import '@phosphor-icons/web/light'
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/regular'

import App from './App'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
