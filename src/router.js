import { createRouter, createWebHistory } from 'vue-router'
import Login from './LoginPage.vue'
import Register from './RegisterPage.vue'
import Home from './HomePage.vue'
import Cart from './CartPage.vue'
import ProfilePage from './ProfilePage.vue'
const routes = [
  {
    path: '/',
    redirect: '/Home',
  },
  { path: '/Home', component: Home },
  { path: '/Login', component: Login },
  { path: '/Register', component: Register },
  { path: '/Cart', component: Cart },
  { path: '/Profile', component: ProfilePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
