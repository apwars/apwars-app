import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Items from "@/pages/Items.vue";
import MyItems from "@/pages/MyItems.vue";
import WarStats from "@/pages/WarStats.vue";
import BattleRound1 from "@/pages/BattleRound1.vue";
import BattleRound2 from "@/pages/BattleRound2.vue";

Vue.use(Router);

export const routes = [
  ,
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "/",
        component: Items,
      },
      {
        path: "/collection",
        name: "/collection",
        component: MyItems,
      },
      {
        path: "/war-stats",
        name: "/war-stats",
        component: WarStats,
      },
      {
        path: "/battle/round-1",
        name: "/battle-round-1",
        component: BattleRound1,
      },
      {
        path: "/battle/round-2",
        name: "/battle-round-2",
        component: BattleRound2,
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

// /**
//  * Before each route update
//  */
// router.beforeEach((to, from, next) => {
//   return next();
// });

// /**
//  * After each route update
//  */
// router.afterEach((to, from) => {});

export default router;
