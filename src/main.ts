import './assets/application.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CarbonComponentsVue from '@carbon/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CarbonComponentsVue)

app.mount('#app')
