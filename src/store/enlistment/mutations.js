export default {
  setAmount(state, { amount, troopName }) {
    state.troops = state.troops.map((t) => {
      if (t.name === troopName) {
        return { ...t, amount };
      } else {
        return t;
      }
    });
  },
  setWeaponAmount(state, { troopName, amount }) {
    state.troops = state.troops.map(t => {
      if (t.name === troopName) {
        return ({... t, weaponAmount: amount }) 
      } else {
        return t
      }
    })
  },
  setFormation(state, { raceName, value }) {
    state.formation = value;
    state.raceName = raceName;
  },
  clearEnlistment(state) {
    state.troops = state.troops.map((t) => {
        return { ...t, amount: 0 };
    });
    state.formation = null;
    state.raceId = null;
  },
};
