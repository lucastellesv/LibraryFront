import Auth from "./Auth.vue";

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
    { path: "*", redirect: "/auth" },
  ],
};

export default AuthRoutes;
