import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from '@/common/i8n';

import 'normalize.css';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

router.isReady().then(() => {
  try {
    const redirectPath = sessionStorage.getItem('spa-fallback-redirect');
    if (redirectPath && redirectPath !== window.location.pathname) {
      sessionStorage.removeItem('spa-fallback-redirect');
      router.replace(redirectPath);
    }
  } catch (error) {
    console.error('Error handling SPA fallback redirect:', error);
  }
});

app.mount('#app');
