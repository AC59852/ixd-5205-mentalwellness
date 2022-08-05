import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay, faBackwardStep, faForwardStep, faShuffle, faRepeat, faPause } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faBackwardStep, faForwardStep, faShuffle, faRepeat, faPause);

import './assets/reset.css'
import './assets/main.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
