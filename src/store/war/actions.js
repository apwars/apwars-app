import WarsController from "@/controller/WarsController";

export default {
    async getFullBoard({ dispatch }, warId) {
        const races = ['Humans', 'Orcs', 'Elves', 'Undead'];
        for (let raceName of races) {
            await dispatch('getBoard', { warId, raceName });
        }
    },
    async getBoard({ commit, state }, { warId, raceName }) {
        const controller = new WarsController();
        const board = await controller.getBoard(warId, raceName);
        commit('setBoard', { raceName, board });
    },
}