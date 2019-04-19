import Vue from 'vue'
import App from './App.vue'
import InputForm from './components/InputForm.vue'
import TrackingMap from './components/TrackingMap.vue'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl;

import retina from 'leaflet/dist/images/marker-icon-2x.png'
import icon from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
Icon.Default.mergeOptions({
  iconRetinaUrl: retina,
  iconUrl: icon,
  shadowUrl: shadow
});

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/input'},
  { path: '/input', component: InputForm },
  { path: '/track', component: TrackingMap }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false

document.title = "Lacak GPS"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
