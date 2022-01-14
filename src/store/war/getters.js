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
  warRewards: (state, getters) => {
    let rewards = [];
    rewards = rewards.concat(getters.getRacePrizes('Humans').map(p => ({...p, raceName: "Humans"})));
    rewards = rewards.concat(getters.getRacePrizes('Orcs').map(p => ({...p, raceName: "Orcs"})));
    rewards = rewards.concat(getters.getRacePrizes('Elves').map(p => ({...p, raceName: "Elves"})));
    rewards = rewards.concat(getters.getRacePrizes('Undead').map(p => ({...p, raceName: "Undead"})));
    rewards = rewards.filter(i => i)

    if (rewards.length) {
      const importanceOrder = ['wGOLD', 'wCOURAGE', 'Worker'];
      rewards = rewards.sort((a, b) => b.amount - a.amount);
      rewards = rewards.sort((a, b) => importanceOrder.indexOf(a.prize) - importanceOrder.indexOf(b.prize));
    }

    return rewards;
  },
  warHasRewards: (state, getters) => {
    return getters.warRewards.length > 0;
  },
  isWarOver: (state) => {
    return state.phase === 'claim' || state.phase === 'finished';
  },
  getRaceMonsterPrizeValue: (state) => (race) => {
    return state.war.races.find(r => r.name === race).monsterPrizeAmount || 0;
  },
  playerCurrentMonsterPrize: (state, getters) => {
    return getters.playerEnlistment.percentagePowerRace * getters.getRaceMonsterPrizeValue(getters.playerEnlistment.race);
  },
  hasPrizes: (state) => {
    if (!state.war) {
      return false;
    }
    const totalAmount = state.accountPrizes.reduce((total, p) => total += p.amount, 0);
    return totalAmount > 0;
  }
};
