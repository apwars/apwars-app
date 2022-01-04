export default {
  setWar(state, war) {
    state.war = war;
  },
  setLoading(state, loading) {
    state.isLoading = loading;
  },
  setBoard(state, { raceName, board }) {
    if (raceName === "Humans") {
      state.humansBoard.data = { ...board };
      return;
    }
    if (raceName === "Orcs") {
      state.orcsBoard.data = { ...board };
      return;
    }
    if (raceName === "Elves") {
      state.elvesBoard.data = { ...board };
      return;
    }
    state.undeadsBoard.data = { ...board };
    return;
  },
};
