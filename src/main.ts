import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './index.css'

import '@phosphor-icons/web/light'
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/regular'

import App from './App'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
