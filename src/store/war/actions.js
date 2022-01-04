import WarsController from "@/controller/WarsController";

export default {
    async getWar({ commit }, warId) {
        commit('setLoading', true);
        const controller = new WarsController();
        const war = await controller.getOne(warId);
        commit('setWar', war);
        commit('setLoading', false);
    },
    async getFullBoard({ state, dispatch }, warId) {
        if (!state.war) {
            await dispatch('getWar', warId);
        }
        const races = ['Humans', 'Orcs', 'Elves', 'Undead'];
        for (let raceName of races) {
            await dispatch('getBoard', { warId, raceName });
        }
    },
    async getBoard({ commit, state, dispatch }, { warId, raceName }) {
        if (!state.war) {
            await dispatch('getWar', warId);
        }
        const controller = new WarsController();
        const board = await controller.getBoard(warId, raceName);
        commit('setBoard', { raceName, board });
    },
}