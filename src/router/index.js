import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const routes = [
  ,
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layout-default" */ "@/layouts/DefaultLayout.vue"
      ),
    children: [
      {
        path: "/",
        name: "/",
        component: () =>
          import(/* webpackChunkName: "Items" */ "@/pages/Items.vue"),
      },
      {
        path: "/collection",
        name: "/collection",
        component: () =>
          import(/* webpackChunkName: "/collection" */ "@/pages/MyItems.vue"),
      },
      {
        path: "/war-stats",
        name: "/war-stats",
        component: () =>
          import(/* webpackChunkName: "/war-stats" */ "@/pages/WarStats.vue"),
      },
      {
        path: "/battle",
        name: "/battle",
        component: () =>
          import(/* webpackChunkName: "/battle" */ "@/pages/Battle.vue"),
      },
      {
        path: "/farms",
        beforeEnter() {
          location.href = "https://farms.apwars.farm";
        },
      },
      {
        path: "/exchange",
        beforeEnter() {
          location.href = "https://exchange.apwars.farm";
        },
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL || "/",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next();
});

/**
 * After each route update
 */
router.afterEach((to, from) => {});

export default router;
