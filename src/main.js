import Vue from 'vue'
import App from './App.vue'
import router from './routes/'
import store from './store/index'

// plugins
import AtUI from 'at-ui'
import Multiselect from 'vue-multiselect'

// register globally
import 'at-ui-style/css/at.css'
import './assets/css/main.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import vuetify from './plugins/vuetify' // path to vuetify export
// widget setup
// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'
// vue-custom-element by karol-f
import vueCustomElement from 'vue-custom-element'
import TextHighlight from 'vue-text-highlight';

Vue.use(vueCustomElement)
Vue.use(vuetify)
Vue.use(AtUI)
Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)

Vue.component('text-highlight', TextHighlight);
// new Vue is not needed anymore, as you're initializing the app through vue-custom-element
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// use vue-custom-element
App.store = store
App.router = router
App.vuetify = vuetify
console.log('App: ',App)
Vue.customElement('bancor-widget', App)
