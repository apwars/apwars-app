import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CreateOrders from "@/pages/Market/CreateOrders.vue";
import ListItems from "@/pages/GateItems.vue";
import Inventory from "@/pages/Inventory.vue";
import WarStats from "@/pages/WarStats.vue";
import Wars from "@/pages/Wars.vue";
import Enlistment from "@/pages/Wars/Enlistment.vue";
import Round1 from "@/pages/Wars/Round1.vue";
import Round2 from "@/pages/Wars/Round2.vue";
import WarReport from "@/pages/Wars/WarReport.vue";
import BlackMarket from "@/pages/BlackMarket.vue";
import WarPreparation from "@/pages/WarPreparation.vue";

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
        component: BlackMarket
      },
      {
        path: "/game-items/:nftId/:type-orders/new",
        name: "/game-items-create-orders",
        component: CreateOrders
      },
      {
        path: "/game-items",
        name: "/game-items",
        component: ListItems
      },
      {
        path: "/inventory",
        name: "/inventory",
        component: Inventory
      },
      {
        path: "/war-stats",
        name: "/war-stats",
        component: WarStats
      },
      {
        path: "/wars",
        name: "/wars",
        component: Wars
      },
      {
        path: "/war-preparation",
        name: "/war-preparation",
        component: WarPreparation
      },
      {
        path: "/wars/:contractWar/enlistment",
        name: "/wars-enlistment",
        component: Enlistment
      },
      {
        path: "/wars/:contractWar/round-1",
        name: "/wars-round-1",
        component: Round1
      },
      {
        path: "/wars/:contractWar/round-2",
        name: "/wars-round-2",
        component: Round2
      },
      {
        path: "/wars/:contractWar/report",
        name: "/wars-report",
        component: WarReport
      },
      {
        path: "/farms",
        beforeEnter() {
          redirectBlank("https://farms.apwars.farm");
        }
      },
      {
        path: "/exchange",
        beforeEnter() {
          redirectBlank("https://exchange.apwars.farm");
        }
      }
    ]
  }
];

const redirectBlank = url => {
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
  routes
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
