import './assets/main.scss'

// Import Bootstrap JS (for Modals/Dropdowns)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import Bootstrap CSS Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Import Font Awesome Icons
import '@fortawesome/fontawesome-free/js/all.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
