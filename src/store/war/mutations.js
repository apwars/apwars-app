export default {
  setWar(state, war) {
    state.war = war;
  },
  setFullBoard(state, fullBoard) {
    state.fullBoard = fullBoard;
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
    state.undeadBoard.data = { ...board };
    return;
  },
  setWarPhase(state, { countdown, phase }) {
    state.countdown = countdown;
    state.phase = phase;
  },
  setPrizes(state, prizes) {
    state.accountPrizes = prizes;
  }
};
