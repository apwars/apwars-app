export default {
    byRace: state => (race) => {
        return state.troops.filter(t => t.race === race);
    },
    getByNameOrAddress: (state, getters, rootState) => (nameOrAddress) => {
        return state.troops.find(t => t.name.toLowerCase() === nameOrAddress.toLowerCase() || t.contractAddress[rootState.user.networkInfo.id] === nameOrAddress);
    },
    getWeapon: state => (weaponId) => {
        return state.weapons.find(w => w.id === weaponId);
    },
    totalStakedForce: (state, getters) => (race) => {
        if (!race) {
            return 0;
        }
        return getters.byRace(race).reduce((total, troop) => {
            total += troop.amount;
        }, 0);
    }
};