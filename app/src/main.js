import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/aura-light-green/theme.css'
// import Lara from '@/presets/lara'

import 'primevue/resources/themes/aura-light-green/theme.css'

import './assets/tailwind.css' // Import Tailwind CSS

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Button', Button)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
