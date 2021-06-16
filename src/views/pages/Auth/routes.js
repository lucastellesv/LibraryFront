import Auth from "./Auth.vue";
import ForgotPassword from './ForgotPassword.vue'

const AuthRoutes = {
  component: () => import("../../External/Layout.vue"),
  children: [
    {
      path: "",
      name: "Auth",
      component: Auth,
      meta: {
        requiresAuth: false,
      },
    },
    {
    path: "forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
    }
    },

    { path: "*", redirect: "/auth" },
  ],
};

export default AuthRoutes;
