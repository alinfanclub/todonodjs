import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from "./store/store";
import infiniteScroll from 'vue-infinite-scroll'

createApp(App).use(router).use(store).use(infiniteScroll).mount('#app');
