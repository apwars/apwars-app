import WarsController from "@/controller/WarsController";

export default {
  async getWar({ state, commit, dispatch }, warId) {
    if (state.isLoading) {
      return;
    }
    try {
      commit("setLoading", true);
      const controller = new WarsController();
      const war = await controller.getOne(warId);
      commit("setWar", war);
      await dispatch("getFullBoard", warId);
      await dispatch("getFormation", "squadron");
      dispatch("checkWarCountdown");
      dispatch("enlistment/checkPlayerEnlistment", null, { root: true });
    } catch (error) {
      console.error(error);
    } finally {
      commit("setLoading", false);
    }
  },
  async getFullBoard({ state, dispatch }, warId) {
    const races = ["Humans", "Orcs", "Elves", "Undead"];
    for (let raceName of races) {
      await dispatch("getBoard", { warId, raceName });
    }
    dispatch("drawFullBoard");
  },
  async getBoard({ commit, state, dispatch }, { warId, raceName }) {
    try {
      const controller = new WarsController();
      const board = await controller.getBoard(warId, raceName);
      commit("setBoard", { raceName, board });
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
  async getFormation({ commit }, formation) {
    try {
      const controller = new WarsController();
      const f = await controller.getFormation(formation);
      console.log(f)
      commit("setFormationOptions", f);
    } catch (error) {
      console.error(error);
    }
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
        dispatch("checkWarCountdown");
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
        dispatch("checkWarCountdown");
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
        dispatch("checkWarCountdown");
      }, countdown);
      return;
    }
    commit("setWarPhase", { countdown: 0, phase: "finished" });
    return;
  },
};
