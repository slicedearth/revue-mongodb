import Vue from 'vue';
import App from './App.vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from '@/store/store';
import Vuelidate from 'vuelidate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
sync(store, router);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
