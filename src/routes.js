import Auth from './components/Auth.vue'
import Home from './components/Home.vue'
import TieBreaker from './components/TieBreaker.vue'
import Logout from './components/Logout.vue'

export default [
  {path: '/auth', component: Auth},
  {path: '/logout', component: Logout},

  {path: '/tiebreaker', component: TieBreaker},
  {path: '/', component: Home}
]
