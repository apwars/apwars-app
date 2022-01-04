import { RACES } from "@/data/Races";

export default {
    getRaceData: state => (race) => {
        if (race === RACES.HUMANS) {
            return state.humansBoard || [];
        }
        if (race === RACES.ORCS) {
            return state.orcsBoard || [];
        }
        if (race === RACES.ELVES) {
            return state.elvesBoard || [];
        }
        return state.undeadsBoard || [];
    },
    getBoardByRace: (state, getters) => (race) => {
        return getters.getRaceData(race).data?.slots || [];
    },
}