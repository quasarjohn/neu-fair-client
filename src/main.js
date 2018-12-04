import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import Auth from './components/Auth.vue'
import axios from 'axios'
import server_urls from './server-urls'

import ScoreEditModal from './components/ScoreEditModal.vue'
Vue.component('score-edit-modal', ScoreEditModal);

import ConfirmationModal from './components/ConfirmationModal.vue'
Vue.component('confirmation-modal', ConfirmationModal);

import SuccessModal from './components/SuccessModal.vue'
Vue.component('success-modal', SuccessModal);

import Rankings from './components/Rankings.vue'
Vue.component('rankings-modal', Rankings);

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})

//check session to get user info
axios.get(server_urls.root, {withCredentials: true}).then((res) => {
  if(isNaN(res.data.judge_num)) {
    //if session can't be found, open login page
    router.push('/auth')
  } else {
    //else open home
    router.push('/')
  }
})
