import { RACES, RACE_DESCRIPTION } from "@/data/Races";

export default {
  getRaceData: (state) => (race) => {
    if (race === RACES.HUMANS) {
      return state.humansBoard || [];
    }
    if (race === RACES.ORCS) {
      return state.orcsBoard || [];
    }
    if (race === RACES.ELVES) {
      return state.elvesBoard || [];
    }
    return state.undeadsBoard || [];
  },
  getBoardByRace: (state, getters) => (race) => {
    return getters.getRaceData(race).data?.slots || [];
  },
  playerEnlistment: (state, getters, rootState) => {
    const account = rootState.user.account;
    let enlistment = null;

    if (account && state.fullBoard) {
      for (let row of state.fullBoard) {
        for (let col of row) {
          if (col && col.account === account.toLowerCase()) {
            enlistment = col;
          }
        }
      }
    }
    return enlistment;
  },
  userEnlistedRace: (state, getters) => {
    return getters.playerEnlistment?.race || null;
  },
  getRaceEnlisted: (state, getters) => (currentRace) => {
      return getters.userEnlistedRace !== RACE_DESCRIPTION[Number(currentRace)];
  } 
};
