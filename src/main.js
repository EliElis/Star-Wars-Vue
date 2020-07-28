import Vue from 'vue'
import App from './App.vue'
import vSelect from "vue-select";
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/main.scss'

Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data(){
    return{
      info: {}
    }
  },

  render: h => h(App)
}).$mount('#app')
