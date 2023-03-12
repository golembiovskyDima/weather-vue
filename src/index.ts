import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as faSolidStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons'

library.add(faStar, faSolidStar, faPlus, faMinus)

const pinia = createPinia();
const app = createApp(App);

app.use(router)
app.use(pinia)

// icons
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app');
