export default {
    byRace: state => (race) => {
        return state.troops.filter(t => t.race === race);
    },
    getByNameOrAddress: (state, getters, rootState) => (nameOrAddress) => {
        return state.troops.find(t => t.name.toLowerCase() === nameOrAddress.toLowerCase() || t.contractAddress[rootState.user.networkInfo.id] === nameOrAddress);
    },
    getWeapon: state => (weaponId) => {
        if (!weaponId) {
            return {}
        }
        return state.weapons.find(w => w.id === weaponId);
    },
    totalStakedForce: (state, getters) => (race) => {
        if (!race) {
            return 0;
        }
        const total = getters.byRace(race).reduce((total, troop) => {
            let strength = troop.strength * troop.amount;
            let defense = troop.defense * troop.amount;
            return total += strength + defense;
        }, 0);
        return total;
    },
    totalStakedWeapon: state => (weaponId) => {
        if (!weaponId) {
            return {}
        }
        const troops = state.troops.filter(w => w.weaponId === weaponId);
        return troops.reduce((total, troop) => total += troop.weaponAmount, 0);
    },
};