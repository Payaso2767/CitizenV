import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import Toaster from '@meforma/vue-toaster'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
createApp(App).use(store).use(Toaster).use(BootstrapVue3).use(router).mount('#app')
