import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

import { plugin as FormKit, defaultConfig } from '@formkit/vue'
import formkitConfig from '../formkit.config'

import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'

import Spinner from './components/Spinner.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import FileUpload from 'primevue/fileupload'
import ToggleButton from 'primevue/togglebutton'

import Menubar from 'primevue/menubar'
// import 'primevue/resources/themes/vela-blue/theme.css'

// console.log('API URL:', imp)
import 'primeicons/primeicons.css'
import './assets/tailwind.css' // Import Tailwind CSS

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
import 'primeicons/primeicons.css'
// import Toast, { POSITION } from 'vue-toastification'
app.component('Button', Button)
app.component('Menubar', Menubar)
app.component('InputText', InputText)
app.component('ProgressSpinner', ProgressSpinner)
app.component('FileUpload', FileUpload)
app.component('ToggleButton', ToggleButton)
app.component('Spinner', Spinner)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(FormKit, defaultConfig(formkitConfig))
const authStore = useAuthStore()
if (authStore.token) {
  authStore.fetchUser()
}

// app.use(Toast, {
//   position: POSITION.TOP_CENTER,
//   timeout: 5000,
//   hideProgressBar: true,
//   closeOnClick: true,
//   pauseOnFocusLoss: true,
//   pauseOnHover: true,
//   draggable: true,
//   draggablePercent: 0.6,
//   showCloseButtonOnHover: false,
//   hideCloseButton: false,
//   closeButton: 'button',
//   icon: true,
//   rtl: false
// })
app.mount('#app')

const spinnerApp = createApp(Spinner)
const spinnerInstance = spinnerApp.use(pinia).mount(document.createElement('div'))
document.body.appendChild(spinnerInstance.$el)
