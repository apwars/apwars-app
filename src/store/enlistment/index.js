import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import { getTroops } from "@/data/Troops";
import { getWeapons } from "@/data/Collectibles/Weapons";

const state = {
  troops: getTroops().map((t) => ({
    ...t,
    amount: 0,
    balance: 0,
    weaponAmount: 0,
    enlisted: 0,
  })),
  weapons: getWeapons().map((w) => ({ ...w, amount: 0, balance: 0 })),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};