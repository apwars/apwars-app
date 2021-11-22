import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CreateOrders from "@/pages/Market/CreateOrders.vue";
import GameItems from "@/pages/GameItems.vue";
import Inventory from "@/pages/Inventory.vue";
import Units from "@/pages/Units.vue";
import Wars from "@/pages/Wars.vue";
import Enlistment from "@/pages/Wars/Enlistment.vue";
import UnitEnlistment from "@/pages/Wars/UnitEnlistment.vue";
import MonsterBattle from "@/pages/Wars/MonsterBattle.vue";
import Round1 from "@/pages/Wars/Round1.vue";
import Round2 from "@/pages/Wars/Round2.vue";
import WarReport from "@/pages/Wars/WarReport.vue";
import BlackMarket from "@/pages/BlackMarket.vue";
import PrivateSale from "@/pages/Arcadia/PrivateSale.vue";
import ArcadiaExpansion from "@/pages/Arcadia/Landing.vue";
import WarPreparation from "@/pages/WarPreparation.vue";
import TrainingCenter from "@/pages/TrainingCenter.vue";
import Worker from "@/pages/Worker.vue";
import Home from "@/pages/Home.vue";
import Arcadia from "@/pages/Arcadia/Arcadia.vue";
import Battle from "@/pages/Wars/Battle.vue";

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
        component: Home
      },
      {
        path: "/black-market",
        name: "/black-market",
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
        component: GameItems
      },
      {
        path: "/inventory",
        name: "/inventory",
        component: Inventory
      },
      {
        path: "/war-stats",
        name: "/war-stats",
        component: Units
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
        path: "/training-center",
        name: "/training-center",
        component: TrainingCenter
      },
      {
        path: "/wars/:contractWar/battle",
        name: "war-battle",
        component: Battle
      },
      {
        path: "/wars/:contractWar/enlistment",
        name: "Enlistment",
        component: Enlistment
      },
      {
        path: "/wars/:contractWar/enlistment/:raceId",
        name: "unit-enlistment",
        component: UnitEnlistment
      },
      {
        path: "/wars/:contractWar/enlistment/:raceId/battle",
        name: "monster-battle",
        component: MonsterBattle
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
        path: "/private-sale",
        name: "/private-sale",
        component: PrivateSale
      },
      {
        path: "/worker",
        name: "/worker",
        component: Worker
      },
      {
        path: "/arcadia-expansion",
        name: "/arcadia-expansion",
        component: ArcadiaExpansion
      },
      {
        path: "/arcadia",
        name: "/arcadia",
        component: Arcadia
      },
      {
        path: "/farms",
        beforeEnter() {
          redirectBlank("https://farms.apwars.farm?showFarms=true");
        }
      },
      {
        path: "/exchange",
        beforeEnter() {
          redirectBlank("https://exchange.apwars.farm");
        }
      },
      {
        path: "/docs",
        beforeEnter() {
          redirectBlank("https://apwars.farm/docs");
        }
      },
      {
        path: "/buy-wland",
        beforeEnter() {
          redirectBlank("https://pancakeswap.finance/swap?outputCurrency=0x2c6107c27a15d2c7f397d88d76257ea42c12f89f&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");
        }
      },
    ]
  }
];

const redirectBlank = url => {
  var a = document.createElement("a");
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
