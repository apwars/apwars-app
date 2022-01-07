import { TIER_WEAPONS } from "@/data/Collectibles/Weapons";

export default {
    byRace: state => (race) => {
        return state.troops.filter(t => t.race === Number(race));
    },
    getByNameOrAddress: (state, getters, rootState) => (nameOrAddress) => {
        return state.troops.find(t => t.name.toLowerCase() === nameOrAddress.toLowerCase() || t.contractAddress[rootState.user.networkInfo.id] === nameOrAddress);
    },
    getWeaponByTier: state => (tier) => {
        const weaponId = TIER_WEAPONS[tier];
        return state.weapons.find(w => w.id === weaponId);
    },
    totalStakedWeapon: state => (tier) => {
        if (!tier) {
            return 0;
        }
        const troops = state.troops.filter(w => w.tier === tier);
        return troops.reduce((total, troop) => total += troop.weaponAmount, 0);
    },
    maxStakeForce: (state, getters) => (race) => {
        if (!race) {
            return 0;
        }
        const total = getters.byRace(race).reduce((total, troop) => {
            let strength = troop.strength * troop.war.stakeLimit;
            let defense = troop.defense * troop.war.stakeLimit;
            let weapon = getters.getWeaponByTier(troop.tier);
            strength += weapon.strength * weapon.war.stakeLimit;
            defense += weapon.defense * weapon.war.stakeLimit;
            return total += strength + defense;
        }, 0);
        return total;
    }
};