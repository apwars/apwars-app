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
          import(/* webpackChunkName: "/collection" */ "@/pages/WarStats.vue"),
      },
      {
        path: "/farms",
        beforeEnter() {
          redirect_blank("https://farms.apwars.farm");
        },
      },
      {
        path: "/exchange",
        beforeEnter() {
          redirect_blank("https://exchange.apwars.farm");
        },
      },
    ],
  },
];

const redirect_blank = (url) => {
  var a = document.createElement("a");
  a.target = "_blank";
  a.href = url;
  a.click();
};

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
