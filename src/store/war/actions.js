import WarsController from "@/controller/WarsController";
import SoldierController from "@/controller/SoldierController";
import { NFT } from "@/data/NFTs";

export default {
  async getWar({ state, commit, dispatch }, warId) {
    if (state.isLoading) {
      return;
    }
    try {
      commit("setLoading", true);
      const controller = new WarsController();

      let currentWar = '';
      if (warId) {
        currentWar = { id: warId };
      } else {
        currentWar = await controller.getLastId();
      }

      const war = await controller.getOne(currentWar.id);
      commit("setWar", war);
      await dispatch("getFullBoard", currentWar.id);
      dispatch("checkWarCountdown");
      dispatch('getAccountPrizes', currentWar.id);
      await dispatch("user/fetchUserWallet", null, { root: true });
      await dispatch("checkSoldiers");
      dispatch("checkCompleteFormations");
      dispatch("enlistment/checkPlayerEnlistment", null, { root: true });
    } catch (error) {
      console.error(error);
    } finally {
      commit("setLoading", false);
    }
  },
  async getFullBoard({ dispatch }, warId) {
    const races = ["Humans", "Orcs", "Elves", "Undead"];
    for (let raceName of races) {
      await dispatch("getBoard", { warId, raceName });
    }
    dispatch("drawFullBoard");
  },
  async getBoard({ commit }, { warId, raceName }) {
    try {
      const controller = new WarsController();
      const board = await controller.getBoard(warId, raceName);
      commit("setBoard", { raceName, board });
    } catch (error) {
      console.error(error);
    }
  },
  async getAccountPrizes({ commit, rootState }, warId) {
    try {
      const controller = new WarsController();
      const prizes = await controller.getAccountPrizes(warId, rootState.user.account);
      commit("setPrizes", prizes);
    } catch (error) {
      console.error(error);
    }
  },
  drawFullBoard({ state, commit }) {
    let upperBoard = [];
    const rowLength = state.humansBoard.data.slots.length;
    for (let i = 0; i < rowLength; i++) {
      let row = [].concat(
        state.humansBoard.data.slots[i],
        state.orcsBoard.data.slots[i]
      );
      upperBoard.push(row);
    }

    let bottomBoard = [];
    for (let i = 0; i < rowLength; i++) {
      let row = [].concat(
        state.elvesBoard.data.slots[i],
        state.undeadBoard.data.slots[i]
      );
      bottomBoard.push(row);
    }

    const fullBoard = [].concat(upperBoard, bottomBoard);
    commit("setFullBoard", fullBoard);
  },
  checkWarCountdown({ state, commit, dispatch }) {
    const now = new Date().getTime();
    let countdown = Math.max(
      Date.parse(state.war.deadlines.startEnlistment) - now,
      0
    );
    if (countdown > 0) {
      commit("setWarPhase", { countdown, phase: "not-started" });
      setTimeout(() => {
        dispatch('getWar');
      }, countdown);
      return;
    }
    countdown = Math.max(
      Date.parse(state.war.deadlines.endEnlistment) - now,
      0
    );
    if (countdown > 0) {
      commit("setWarPhase", { countdown, phase: "enlistment" });
      setTimeout(() => {
        dispatch('getWar');
      }, countdown);
      return;
    }
    countdown = Math.max(
      Date.parse(state.war.deadlines.endClaimPrize) - now,
      0
    );
    if (countdown > 0) {
      commit("setWarPhase", { countdown, phase: "claim" });
      setTimeout(() => {
        dispatch('getWar');
      }, countdown);
      return;
    }
    commit("setWarPhase", { countdown: 0, phase: "finished" });
    return;
  },
  checkCompleteFormations({state, rootState, commit}) {
    const formations = ['squadron'];
    const races = ['Humans', 'Orcs', 'Elves', 'Undead'];

    let completeFormations = races.reduce((o, r) => Object.assign(o, {[r]: true}), {});
    for (let formation of formations) {
      for (let race of races) {
        const formationData = state.war.formationConfig[formation][race];
        const troopNames = Object.keys(formationData);
        for (const troopName of troopNames) {
          const troopBalance = rootState.user.balances[troopName] || 0;
            if (troopBalance < formationData[troopName].amount) {
              completeFormations[race] = false;
            };
        }
      }
    }
    commit('setCompleteFormations', completeFormations);
  },
  async checkSoldiers({commit, rootState}) {
    const controller = new SoldierController();
    commit('setSoldierLoading', true);
    try {
      const soldier = await controller.getNFTByType(rootState.user.account, NFT.HUMAN);
      console.log(soldier)
      commit('setSoldier', NFT.HUMAN, soldier);
    } catch (error) {
      console.error(error);
    }
    try {
      const soldier =  await controller.getNFTByType(rootState.user.account, NFT.ORC);
      commit('setSoldier', NFT.ORC, soldier);
    } catch (error) {
      console.error(error);
    }
    commit('setSoldierLoading', false);
  },
};
