import { createApp } from 'vue'
import App from './App.vue'
// import VueSession from "vue-session";
// createApp(App).use(VueSession);
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/css/main.css';
import router from './router'



// register jw pagination component globally


createApp(App).use(router).mount('#app')
// createApp(App).use({
//     router,
//     store,
//     render: h => h(App)
//   }).mount('#app');