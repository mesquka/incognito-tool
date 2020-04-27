import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import Chart from 'highcharts';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import API from '@/api/api';

Vue.config.productionTip = false;

Vue.use(Chartkick.use(Chart));

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
