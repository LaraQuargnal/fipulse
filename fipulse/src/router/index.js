import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import SplashScreen from "../views/SplashScreen.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import Posts from "../views/Posts.vue";
import UserCard from "@/views/UserCard.vue";
import store from "@/store";

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
    path: "/usercard",
    name: "usercard",
    component: UserCard,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.currentUser === null;

  if (isLoggedIn && to.meta.requiresAuth) {
    next("login");
  } else {
    next();
  }
});

export default router;
