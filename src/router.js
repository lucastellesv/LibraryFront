import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/about/:id",
      name: "About",
      component: () => import("./views/About.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("./views/Register.vue"),
    },
  ],
});
