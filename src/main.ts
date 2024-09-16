import './assets/application.scss'

import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import CarbonComponentsVue from '@carbon/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CarbonComponentsVue)

initializeApp({
  apiKey: 'AIzaSyB4kgXI5egx-ZLwgpjOJP_r4nSM2YkKToM',
  authDomain: 'ibm-table-tennis-a1532.firebaseapp.com',
  projectId: 'ibm-table-tennis-a1532',
  storageBucket: 'ibm-table-tennis-a1532.appspot.com',
  messagingSenderId: '44006916441',
  appId: '1:44006916441:web:433d466ca6f5fd9bb34c48'
})

app.mount('#app')
