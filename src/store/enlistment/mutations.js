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
  setBalance(state, { balance, troopId }) {
    state.troops = state.troops.map((t) => {
      if (t.id === troopId) {
        return { ...t, balance };
      } else {
        return t;
      }
    });
  },
  setPrice(state, { price, troopId }) {
    state.troops = state.troops.map((t) => {
      if (t.id === troopId) {
        return { ...t, price };
      } else {
        return t;
      }
    });
  },
  setWeaponAmount(state, { troopId, amount }) {
    state.troops = state.troops.map(t => {
      if (t.id === troopId) {
        return ({... t, weaponAmount: amount }) 
      } else {
        return t
      }
    })
  },
  setWeaponsBalance(state, { weaponId, balance }) {
    state.weapons = state.weapons.map((w) => {
      if (w.id === weaponId) {
        return { ...w, balance };
      } else {
        return w;
      }
    });
  },
  setFormation(state, value) {
    state.formation = value;
  }
};