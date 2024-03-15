import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import SplashScreen from "../views/SplashScreen.vue"
import Login from "../views/Login.vue"
import SignUp from "../views/Signup.vue"
import Posts from "../views/Posts.vue"

const routes = [
  {
    path: '/',
    name: 'splash-screen',
    component: SplashScreen
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
