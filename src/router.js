import Vue from "vue";
import Router from "vue-router";
import AuthRoutes from "./views/pages/Auth/routes";
import AboutRoutes from './views/pages/About/routes'
import HomeRoutes from "./views/pages/Home/routes";
import RegisterRoutes from "./views/pages/Register/routes";
import moment from 'moment';


Vue.use(Router);

const route = new Router({
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

route.beforeEach((to, from, next) => {
  let Token = localStorage.getItem("token");
  let ExpiresToken = localStorage.getItem("expires");

  if(to.meta.requiresAuth){
    if(Token){
      if(moment().isBefore(moment(ExpiresToken)))
      {
        next();
      } else {
        if(from.path != "/auth"){
        next('/auth');
      }
      alert("Acesso negado")
      }
    }else {
      next('/auth');
    }
  }else {
    next();
  }
})

export default route;

