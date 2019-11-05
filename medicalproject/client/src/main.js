import Vue from "vue";
import App from "./App.vue";
import store from './assets/state/store';
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { routes } from "./routes";
import Toasted from 'vue-toasted';

Vue.use(Toasted);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);


Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.directive("focus", {
  inserted: function(el) {
    // Focus the element
    el.focus();
  },
  update: function(el, binding) {
    var value = binding.value;
    el.style.color = "red";
    if (value) {
      Vue.nextTick(function() {
        el.style.color = "red";
        el.focus();
      });
    }
  }
})

const router = new VueRouter({
  // mode: 'history',
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
