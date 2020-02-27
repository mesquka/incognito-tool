import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import API from '@/api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data() {
    return {
      api: new API(),
    };
  },
  render: h => h(App),
}).$mount('#app');
