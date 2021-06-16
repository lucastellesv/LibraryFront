import Register from "./Register";

const RegisterRoutes = {
  component: () => import("../../Internal/Layout.vue"),
  children: [
    {
      path: "",
      name: "Register",
      component: Register,
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default RegisterRoutes;
