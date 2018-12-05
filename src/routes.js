import Auth from './components/Auth.vue'
import Home from './components/Home.vue'
import TieBreaker from './components/TieBreaker.vue'

export default [
  {path: '/auth', component: Auth},
  {path: '/tiebreaker', component: Auth},
  {path: '/', component: Home}
]
