import { RACES } from "@/data/Races";

export default {
    getBoardByRace: state => (race) => {
        if (race === RACES.HUMANS) {
            return state.humansBoard.data?.slots || [];
        }
        if (race === RACES.ORCS) {
            return state.orcsBoard.data?.slots || [];
        }
        if (race === RACES.ELVES) {
            return state.elvesBoard.data?.slots || [];
        }
        return state.undeadsBoard.data?.slots || [];
    },
}