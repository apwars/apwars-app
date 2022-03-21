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
import WarArmy from "@/pages/Wars/Army.vue";
import StarterPacks from "@/pages/StarterPacks.vue";
import Leaderboard from "@/pages/Leaderboard/Leaderboard.vue";
import Bridge from "@/pages/Bridge.vue";
import Battle from "@/pages/Game/Battle.vue";
import LoyaltyProgram from "@/pages/Loyalty/Program.vue";
import LoyaltyShop from "@/pages/Loyalty/Shop.vue";
import StartSwap from "@/pages/StartSwap.vue";
import Soldier from "@/pages/Soldier.vue";
import Account from "@/pages/Account/Account";

Vue.use(Router);

const defaultMeta = {
  title: "APWars - Faction battles between races in a Medieval Metaverse",
  metaTags: [
    {
      name: "description",
      content:
        "APWars is the best strategy game to explore new lands, build foundations, belong to clans and to win against enemies and the dragon Louis. Evolve characters, win great rewards and have fun while playing the most innovative protocol on the BSC.",
    },
    {
      property: "og:description",
      content:
        "APWars is the best strategy game to explore new lands, build foundations, belong to clans and to win against enemies and the dragon Louis. Evolve characters, win great rewards and have fun while playing the most innovative protocol on the BSC.",
    },
    {
      property: "twitter:title",
      content:
        "APWars - Faction battles between races in a Medieval Metaverse",
    },
    {
      property: "twitter:description",
      content:
        "APWars is the best strategy game to explore new lands, build foundations, belong to clans and to win against enemies and the dragon Louis. Evolve characters, win great rewards and have fun while playing the most innovative protocol on the BSC.",
    },
    {
      property: "twitter:card",
      content:
        "summary",
    },
  ],
};

export const routes = [
  ,
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/start-swap/:referral?",
        name: "start-swap",
        component: StartSwap,
        meta: {
          noConnect: true,
          title: "The best way to join APWars",
          metaTags: [
            {
              name: "description",
              content: "Start playing APWars with a huge discount | Weekly returns | Active protocol for over an year | Off-chain environment | Interactive gameplay",
            },
            {
              property: "og:description",
              content: "Start playing APWars with a huge discount | Weekly returns | Active protocol for over an year | Off-chain environment | Interactive gameplay",
            },
          ],
        },
      },
      {
        path: "/",
        name: "/",
        component: Home,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/black-market",
        name: "/black-market",
        component: BlackMarket,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/game-items/:nftId/:type-orders/new",
        name: "/game-items-create-orders",
        component: CreateOrders,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/game-items",
        name: "/game-items",
        component: GameItems,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/inventory",
        name: "/inventory",
        component: Inventory,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war-stats",
        name: "/war-stats",
        component: Units,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war-preparation",
        name: "/war-preparation",
        component: WarPreparation,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/training-center",
        name: "/training-center",
        component: TrainingCenter,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war",
        name: "war-resume",
        component: WarBattle,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war/intro",
        name: "war-intro",
        component: WarIntro,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war/army",
        name: "war-army",
        component: WarArmy,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war/enlistment/:raceId",
        name: "unit-enlistment",
        component: UnitEnlistment,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war/enlistment/:raceId/battle",
        name: "monster-battle",
        component: MonsterBattle,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/war/report",
        name: "/war-report",
        component: Report,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/private-sale",
        name: "/private-sale",
        component: PrivateSale,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/worker",
        name: "/worker",
        component: Worker,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/arcadia-expansion",
        name: "/arcadia-expansion",
        component: ArcadiaExpansion,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/arcadia",
        name: "/arcadia",
        component: Arcadia,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/the-monstrous-journey",
        name: "/the-monstrous-journey",
        component: Battle,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/packs",
        name: "/packs",
        component: StarterPacks,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/leaderboard",
        name: "/leaderboard",
        component: Leaderboard,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/bridge",
        name: "/bridge",
        component: Bridge,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/loyalty-program",
        name: "/loyalty-program",
        component: LoyaltyProgram,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/loyalty-program/shop",
        name: "loyalty-shop",
        component: LoyaltyShop,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/unlock-soldier",
        name: "unlock-soldier",
        component: Soldier,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/profile/me",
        name: "your-profile",
        component: Account,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/profile/:address",
        name: "profile",
        component: Account,
        meta: {
          ...defaultMeta
        },
      },
      {
        path: "/farms",
        beforeEnter() {
          redirectBlank("https://farms.apwars.farm?showFarms=true");
        },
      },
      {
        path: "/exchange",
        beforeEnter() {
          redirectBlank("https://exchange.apwars.farm");
        },
      },
      {
        path: "/docs",
        beforeEnter() {
          redirectBlank("https://apwars.farm/docs");
        },
      },
      {
        path: "/buy-wland",
        beforeEnter() {
          redirectBlank(
            "https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&inputCurrency=0x2c6107c27a15d2c7f397d88d76257ea42c12f89f"
          );
        },
      },
      {
        path: "/buy-wgold",
        beforeEnter() {
          redirectBlank(
            "https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&inputCurrency=0x7Ab6eedd9443e0e98E5Ea93667CA5B250b8ddA51"
          );
        },
      },
      {
        path: "/buy-wcourage",
        beforeEnter() {
          redirectBlank(
            "https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&inputCurrency=0x5F51A3ce7f2233777328866F477E86a91CA9DdeC"
          );
        },
      },
      {
        path: "/add-liquidity/:baseToken/:sideToken",
        beforeEnter(to) {
          redirectBlank(
            `https://pancakeswap.finance/add/${to.params.baseToken}/${to.params.sideToken}`
          );
        },
      },
    ],
  },
];

const redirectBlank = (url) => {
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
  routes,
});

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  return next();
});

// /**
//  * After each route update
//  */
router.afterEach((to, from) => {
  router.app.$store.commit("app/setMenuDisplay", true);
});

export default router;
