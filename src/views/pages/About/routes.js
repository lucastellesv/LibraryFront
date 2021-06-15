import About from "./About";

const AboutRoutes = {
  component: () => import("../../Internal/Layout.vue"),
  children: [
    {
      path: "",
      name: "About",
      component: About,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
  ],
};

export default AboutRoutes;
