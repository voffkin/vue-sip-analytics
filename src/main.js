import Vue from 'vue'
import App from './App.vue'
import Analytics from './plugins/Analytics';

// Vue.use(Analytics);

Vue.config.productionTip = false
Vue.prototype.$analytics = Analytics

new Vue({
  render: h => h(App),
}).$mount('#app')
