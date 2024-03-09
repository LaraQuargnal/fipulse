import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-flag-icon'
import i18n from '@/plugins/i18n'
import FlagIcon from 'vue-flag-icon'


library.add(fas);

createApp(App)
.use(router)
.use(i18n)
.use(FlagIcon)
.component('fa', FontAwesomeIcon)
.mount('#app')
