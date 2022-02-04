import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CreateOrders from "@/pages/Market/CreateOrders.vue";
import GameItems from "@/pages/GameItems.vue";
import Inventory from "@/pages/Inventory.vue";
import Units from "@/pages/Units.vue";
import Report from "@/pages/Wars/Report.vue";
import UnitEnlistment from "@/pages/Wars/UnitEnlistment.vue";
import MonsterBattle from "@/pages/Wars/MonsterBattle.vue";
import BlackMarket from "@/pages/BlackMarket.vue";
import PrivateSale from "@/pages/Arcadia/PrivateSale.vue";
import ArcadiaExpansion from "@/pages/Arcadia/Landing.vue";
import WarPreparation from "@/pages/WarPreparation.vue";
import TrainingCenter from "@/pages/TrainingCenter.vue";
import Worker from "@/pages/Worker.vue";
import Home from "@/pages/Home.vue";
import Arcadia from "@/pages/Arcadia/Arcadia.vue";
import WarBattle from "@/pages/Wars/Battle.vue";
import WarIntro from "@/pages/Wars/Intro.vue";
import StarterPacks from "@/pages/StarterPacks.vue";
import Leaderboard from "@/pages/Leaderboard.vue";
import Bridge from "@/pages/Bridge.vue";
import Battle from "@/pages/Game/Battle.vue";
import LoyaltyProgram from "@/pages/Loyalty/Program.vue";
import LoyaltyShop from "@/pages/Loyalty/Shop.vue";

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
        path: "/war",
        name: "war-resume",
        component: WarBattle
      },
      {
        path: "/war/intro",
        name: "war-intro",
        component: WarIntro
      },
      {
        path: "/war/enlistment/:raceId",
        name: "unit-enlistment",
        component: UnitEnlistment
      },
      {
        path: "/war/enlistment/:raceId/battle",
        name: "monster-battle",
        component: MonsterBattle
      },
      {
        path: "/war/report",
        name: "/war-report",
        component: Report
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
        path: "/the-monstrous-journey",
        name: "/the-monstrous-journey",
        component: Battle
      },
      {
        path: "/packs",
        name: "/packs",
        component: StarterPacks
      },
      {
        path: "/leaderboard",
        name: "/leaderboard",
        component: Leaderboard
      },
      {
        path: "/bridge",
        name: "/bridge",
        component: Bridge
      },
      {
        path: "/loyalty-program",
        name: "/loyalty-program",
        component: LoyaltyProgram
      },
      {
        path: "/loyalty-program/shop",
        name: "loyalty-shop",
        component: LoyaltyShop
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
          redirectBlank("https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&inputCurrency=0x2c6107c27a15d2c7f397d88d76257ea42c12f89f");
        }
      },
      {
        path: "/add-liquidity/:baseToken/:sideToken",
        beforeEnter(to) {
          redirectBlank(`https://pancakeswap.finance/add/${to.params.baseToken}/${to.params.sideToken}`);
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

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next();
});

// /**
//  * After each route update
//  */
router.afterEach((to, from) => {
  router.app.$store.commit('app/setMenuDisplay', true);
});

export default router;
