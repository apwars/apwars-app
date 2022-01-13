import { RACES } from "@/data/Races";

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
    return state.undeadBoard || [];
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
  getRaceEnlisted: (state, getters) => {
      return getters.userEnlistedRace;
  },
  getRacePrizes: (state) => (raceName) => {
    return state.war.races.find(r => r.name === raceName).rewards || [];
  },
  warHasRewards: (state, getters) => {
    let rewards = [];
    rewards = rewards.concat(getters.getRacePrizes('Humans'));
    rewards = rewards.concat(getters.getRacePrizes('Orcs'));
    rewards = rewards.concat(getters.getRacePrizes('Elves'));
    rewards = rewards.concat(getters.getRacePrizes('Undead'));

    return rewards.filter(i => i).length > 0;
  },
  isWarOver: (state) => {
    return state.phase === 'claim' || state.phase === 'finished';
  },
  getRaceMonsterPrizeValue: (state) => (race) => {
    return state.war.races.find(r => r.name === race).monsterPrizeAmount || 0;
  },
  playerCurrentMonsterPrize: (state, getters) => {
    return getters.playerEnlistment.percentagePowerRace * getters.getRaceMonsterPrizeValue(getters.playerEnlistment.race);
  }
};
