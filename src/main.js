import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import "normalize.css"
import FiltersItem from './components/Filters/FiltersItem.vue'

Vue.config.productionTip = false
Vue.component('FiltersItem', FiltersItem)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
