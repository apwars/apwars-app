export default {
    setAmount(state, { amount, troopId }) {
        const troop = state.troops.find(t => t.id === troopId);
        state.troops = state.troops.map(t => {
            if (t.id === troopId) {
                return {...t, amount}
            } else {
                return t
            }
        });
    },
    setBalance(state, { balance, troopId }) {
        state.troops = state.troops.map(t => {
            if (t.id === troopId) {
                return {...t, balance}
            } else {
                return t
            }
        });
    },
    setPrice(state, { price, troopId }) {
        state.troops = state.troops.map(t => {
            if (t.id === troopId) {
                return {...t, price}
            } else {
                return t
            }
        });
    },
    setWeaponAmount(state, { troopId, weaponId, amount}) {
        state.troops = state.troops.map(t => {
            if (t.id === troopId) {
                return {...t, weapons: t.weapons.map(w => {
                    if (w.id === weaponId) {
                        return {...w, amount }
                    } else {
                        return w
                    }
                })}
            } else {
                return t
            }
        });
    }
};