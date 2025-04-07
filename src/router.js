import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/LoginPage.vue'
import Register from './components/RegisterPage.vue'
import Home from './components/HomePage.vue'
const routes = [
  { path: '/Home', component: Home },
  { path: '/Login', component: Login },
  { path: '/Register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
