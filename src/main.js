import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {BootstrapVue} from 'bootstrap-vue';
import dataPluguin from './plugins/eventemitter.plugin.js';
import binancePlugin from './plugins/binance.plugin.js';
import amountFilter from './filters/amountFilter.js';
import priceFilter from './filters/priceFilter.js';
import totalFilter from './filters/totalFilter.js';
import '../public/reset.css';
import '../public/bootstrap.scss';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(dataPluguin);
Vue.use(binancePlugin);
Vue.filter('amountFilter', amountFilter);
Vue.filter('priceFilter', priceFilter);
Vue.filter('totalFilter', totalFilter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
