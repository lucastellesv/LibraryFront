import Vue from "vue";
import Router from "vue-router";
import AuthRoutes from "./views/pages/Auth/routes";
import AboutRoutes from './views/pages/About/routes'
import HomeRoutes from "./views/pages/Home/routes";
import RegisterRoutes from "./views/pages/Register/routes";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/auth",
      ...AuthRoutes,
    },
    {
      path: "/",
      redirect: "/auth"
    },
    {
      path: "/home",
      ...HomeRoutes,
    },
    {
      path: "/about/:id",
      ...AboutRoutes,
    },
    {
      path: "/register",
      ...RegisterRoutes,
    },
    {
      path: "/auth",
      ...AuthRoutes,
    }
  ],
});

