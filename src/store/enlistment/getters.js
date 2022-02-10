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
};