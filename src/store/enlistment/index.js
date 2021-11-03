import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import { getTroops } from "@/data/Troops";
import { getCollectibleById } from "@/data/Collectibles";

const state = {
  troops: getTroops().map((t) => ({
    ...t,
    amount: 0,
    balance: 0,
    enlisted: 0,
    weapons:
      t.availableWeapons?.map((w) => ({
        ...getCollectibleById(w),
        amount: 0,
        balance: 0,
        enlisted: 0,
      })) || [],
  })),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
