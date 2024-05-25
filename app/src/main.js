import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

import { plugin as FormKit, defaultConfig } from '@formkit/vue'
import formkitConfig from '../formkit.config'

import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import FileUpload from 'primevue/fileupload'

import Menubar from 'primevue/menubar'
// import 'primevue/resources/themes/vela-blue/theme.css'

// console.log('API URL:', imp)
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
app.use(FormKit, defaultConfig(formkitConfig))
const authStore = useAuthStore()
if (authStore.token) {
  authStore.fetchUser()
}

app.mount('#app')
