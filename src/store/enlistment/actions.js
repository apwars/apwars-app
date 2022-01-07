import Troops from "@/lib/eth/Troops";
import Collectibles from "@/lib/eth/Collectibles";
import { RACES } from "@/data/Races";
import { FORMATIONS, RACE_FORMATIONS, FORMATIONS_NAMES } from "@/data/Enlistment";
import WarsController from "@/controller/WarsController";

export default {
    stakeTroop({ commit }, { amount, troopId }) {
        commit('setAmount', { amount, troopId });
    },
    stakeWeapon({ commit }, { troopId, amount }) {
        commit('setWeaponAmount', { troopId, amount })
    },
    async updateBalances({ commit, state, rootState }) {
        for (const troop of state.troops) {
            const contract = new Troops(troop.contractAddress[rootState.user.networkInfo.id]);
            const balance = Number(await contract.balanceOf(rootState.user.account))
            commit('setBalance', { balance, troopId: troop.id });
        }
    },
    async updatePrices({ commit, state, rootState }) {
        for (const troop of state.troops) {
            const contract = new Troops(troop.contractAddress[rootState.user.networkInfo.id]);
            const price = Number(await contract.pricewGOLD(rootState.user.account))
            commit('setPrice', { price, troopId: troop.id });
        }
    },
    async updateWeaponsBalance({ commit, state, rootState }) {
        for (const weapon of state.weapons) {
            const contract = new Collectibles(weapon.contractAddress[rootState.user.networkInfo.id]);
            const balance = Number(await contract.balanceOf(rootState.user.account, weapon.id));
            commit('setWeaponsBalance', { balance, weaponId: weapon.id });
        }
    },
    async changeFormation({ commit, dispatch }, { raceId, value }) {
        const formationData = RACE_FORMATIONS[raceId][value];
        const troopsIds = Object.keys(formationData);
        for (const troopId of troopsIds) {
            dispatch('stakeTroop', { troopId: Number(troopId), amount: formationData[troopId] });
        }
        commit('setFormation', { raceId, value });
    },
    clearEnlistment({ commit }) {
        commit('clearEnlistment');
    },
    checkPlayerEnlistment({ dispatch, rootGetters }) {
        const playerEnlistment = rootGetters['war/playerEnlistment'];
        if (playerEnlistment) {
            const value = FORMATIONS[playerEnlistment.formation.name.toUpperCase()];
            const raceId = RACES[playerEnlistment.race.toUpperCase()];
            dispatch('changeFormation', { raceId, value});
        }
    },
    async enlist({ rootState, getters }, { warId, faction, race, slot }) {
        const tiers = [1, 2, 3, 4];
        let gameItems = [];
        for (let t of tiers) {
            const weapon = getters.getWeaponByTier(t);
            const staked = getters.totalStakedWeapon(t);
            if (staked > 0) {
                gameItems = gameItems.concat({ id: weapon.id, amount: staked });
            }
        }
        const controller = new WarsController();
        const formation = { name: FORMATIONS_NAMES[rootState.enlistment.formation.value].toLowerCase() };
        await controller.enlist(warId, faction, race, rootState.user.account, formation, gameItems, slot);
    }
};