import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import DataUpdater from '@/api/DataUpdater';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data() {
    return {
      dataUpdater: new DataUpdater(),
    };
  },
  render: h => h(App),
}).$mount('#app');
