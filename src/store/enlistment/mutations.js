export default {
  setAmount(state, { amount, troopId }) {
    state.troops = state.troops.map((t) => {
      if (t.id === troopId) {
        return { ...t, amount };
      } else {
        return t;
      }
    });
  },
  clearEnlistment(state) {
    state.troops = state.troops.map((t) => {
        return { ...t, amount: 0 };
    });
    state.formation = null;
    state.raceId = null;
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
  setFormation(state, { raceId, value }) {
    state.formation = value;
    state.raceId = raceId;
  }
};
