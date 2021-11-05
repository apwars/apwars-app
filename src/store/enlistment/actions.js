import Troops from "@/lib/eth/Troops";
import Collectibles from "@/lib/eth/Collectibles";

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
            const balance = Number(await contract.balanceOf(rootState.user.account, weapon.id))
            commit('setWeaponsBalance', { balance, weaponId: weapon.id });
        }
    }
};