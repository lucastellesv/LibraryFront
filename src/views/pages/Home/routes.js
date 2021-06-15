import Home from "./Home";

const HomeRoutes = {
  component: () => import("../../Internal/Layout.vue"),
  children: [
    {
      path: "",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
  ],
};

export default HomeRoutes;
