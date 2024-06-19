import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeConnection } from './api/connection';
import Divider from './components/Divider.vue';
import { router } from './router';

initializeConnection();

// Create the app
const app = createApp(App);

// Components
app.component('Divider', Divider);

// Plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
