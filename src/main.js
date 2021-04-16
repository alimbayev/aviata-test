import Vue from 'vue'
import App from './App.vue'
import "normalize.css"
import FiltersItem from './components/FiltersItem.vue'

Vue.config.productionTip = false
Vue.component('FiltersItem', FiltersItem)

new Vue({
  render: h => h(App),
}).$mount('#app')
