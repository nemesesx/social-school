import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import FileUpload from 'primevue/fileupload'

import Menubar from 'primevue/menubar'
// import 'primevue/resources/themes/vela-blue/theme.css'

import 'primeicons/primeicons.css'
import './assets/tailwind.css' // Import Tailwind CSS

import App from './App.vue'
import router from './router'

const app = createApp(App)
import 'primeicons/primeicons.css'

app.component('Button', Button)
app.component('Menubar', Menubar)
app.component('InputText', InputText)
app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

const authStore = useAuthStore()
if (authStore.token) {
  authStore.fetchUser()
}

app.mount('#app')
