import Register from "./Register";

const RegisterRoutes = {
  component: () => import("../../Internal/Layout.vue"),
  children: [
    {
      path: "",
      name: "Register",
      component: Register,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
  ],
};

export default RegisterRoutes;
