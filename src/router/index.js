import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Items from "@/pages/Items.vue";
import SellNFT from "@/pages/Market/SellNFT.vue";
import ListItems from "@/pages/ListItems.vue";
import MyItems from "@/pages/MyItems.vue";
import WarStats from "@/pages/WarStats.vue";
import Wars from "@/pages/Wars.vue";
import Enlistment from "@/pages/Wars/Enlistment.vue";
import Round1 from "@/pages/Wars/Round1.vue";
import Round2 from "@/pages/Wars/Round2.vue";
import WarReport from "@/pages/Wars/WarReport.vue";
import BlackMarket from "@/pages/BlackMarket.vue";

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
        path: "/sell-nft/:nftId",
        name: "/sell-nft",
        component: SellNFT,
      },
      {
        path: "/game-items",
        name: "/game-items",
        component: ListItems,
      },
      {
        path: "/black-market",
        name: "/black-market",
        component: BlackMarket,
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
        path: "/wars",
        name: "/wars",
        component: Wars,
      },
      {
        path: "/wars/:contractWar/enlistment",
        name: "/wars-enlistment",
        component: Enlistment,
      },
      {
        path: "/wars/:contractWar/round-1",
        name: "/wars-round-1",
        component: Round1,
      },
      {
        path: "/wars/:contractWar/round-2",
        name: "/wars-round-2",
        component: Round2,
      },
      {
        path: "/wars/:contractWar/report",
        name: "/wars-report",
        component: WarReport,
      },
      {
        path: "/farms",
        beforeEnter() {
          redirectBlank("https://farms.apwars.farm");
        },
      },
      {
        path: "/exchange",
        beforeEnter() {
          redirectBlank("https://exchange.apwars.farm");
        },
      },
    ],
  },
];

const redirectBlank = (url) => {
  var a = document.createElement("a");
  a.target = "_blank";
  a.href = url;
  a.click();
};

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
