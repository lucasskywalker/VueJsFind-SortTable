// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './Store'
import App from './App.vue'
import {mapActions} from 'vuex'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: { App },
  methods: {
    ...mapActions(['loadApiData'])
  },
  created() {
    this.loadApiData();
  },
  render: h => h(App)
});