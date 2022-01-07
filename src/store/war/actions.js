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
    const controller = new WarsController();
    const board = await controller.getBoard(warId, raceName);
    commit("setBoard", { raceName, board });
  },
  drawFullBoard({ state, commit }) {
    let upperBoard = [];
    for (let i = 0; i < 5; i++) {
      let row = [].concat(
        state.humansBoard.data.slots[i],
        state.orcsBoard.data.slots[i]
      );
      upperBoard.push(row);
    }

    let bottomBoard = [];
    for (let i = 0; i < 5; i++) {
      let row = [].concat(
        state.elvesBoard.data.slots[i],
        state.undeadsBoard.data.slots[i]
      );
      bottomBoard.push(row);
    }

    const fullBoard = [].concat(upperBoard, bottomBoard);
    commit("setFullBoard", fullBoard);
  },
};
