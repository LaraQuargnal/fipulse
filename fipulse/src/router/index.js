import { createRouter, createWebHistory } from "vue-router";
import SplashScreen from "../views/SplashScreen.vue";
import HomeView from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import Posts from "../views/Posts.vue";
import UserCard from "../views/UserCard.vue";
import StudentCorner from "../views/StudentCorner.vue";

const routes = [
  {
    path: "/",
    name: "splash-screen",
    component: SplashScreen,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/usercard/:nickname?",
    name: "UserCardWithNickname",
    component: UserCard,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/studentcorner",
    name: "studentcorner",
    component: StudentCorner,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
