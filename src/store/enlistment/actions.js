import WarsController from "@/controller/WarsController";

export default {
    stakeTroop({ commit }, { amount, troopName }) {
        commit('setAmount', { amount, troopName });
    },
    stakeWeapon({ commit }, { troopName, amount }) {
        commit('setWeaponAmount', { troopName, amount })
    },
    async changeFormation({ commit, dispatch, rootState }, { raceName, value }) {
        const formationData = rootState.war.war.formationConfig[value][raceName];
        const troopNames = Object.keys(formationData);
        for (const troopName of troopNames) {
            dispatch('stakeTroop', { troopName: troopName, amount: formationData[troopName].amount });
        }
        commit('setFormation', { raceName, value });
    },
    clearEnlistment({ commit }) {
        commit('clearEnlistment');
    },
    checkPlayerEnlistment({ dispatch, rootGetters }) {
        const playerEnlistment = rootGetters['war/playerEnlistment'];
        if (playerEnlistment) {
            const value = playerEnlistment.formation.name;
            const raceName = playerEnlistment.race;
            dispatch('changeFormation', { raceName, value});
            for (let gameItem of playerEnlistment.gameItems) {
                dispatch('stakeWeapon', { troopName: gameItem.soldier, amount: gameItem.amount });
            }
        }
    },
    async enlist({ rootState, getters }, { faction, race, slot }) {
        const warId = rootState.war.war.id;
        const tiers = [1, 2, 3, 4];
        let gameItems = [];
        for (let t of tiers) {
            const troops = rootState.enlistment.troops.filter(troop => troop.tier === t);
            const weapon = getters.getWeaponByTier(t);

            for (let troop of troops) {
                if (troop.weaponAmount) {
                    gameItems = gameItems.concat({ id: weapon.id, amount: troop.weaponAmount, soldier: troop.name });
                }
            }
        }
        const controller = new WarsController();
        const formation = { name: rootState.enlistment.formation };
        await controller.enlist(warId, faction, race, rootState.user.account, formation, gameItems, slot);
    }
};