import { RACES, RACE_DESCRIPTION } from "./Races";

export const ENLISTMENT_OPTIONS = [{
    id: RACES.HUMANS,
    name: RACE_DESCRIPTION[RACES.HUMANS],
    image: '/images/troops/wwizard-portrait.png',
    title: 'Day 1',
    monsterId: 1,
    background: '/images/background/enlistment-1.jpg',
    aura: '/images/troops/aura-1.png',
    basicUnit: '/images/troops/wwarrior.webp',
},
{
    id: RACES.ORCS,
    name: RACE_DESCRIPTION[RACES.ORCS],
    image: '/images/troops/wshaman-portrait.png',
    title: 'Day 2',
    monsterId: 2,
    background: '/images/background/enlistment-2.jpg',
    aura: '/images/troops/aura-2.png',
    basicUnit: '/images/troops/wgrunt.webp',
},
{
    id: RACES.UNDEADS,
    name: RACE_DESCRIPTION[RACES.UNDEADS],
    image: '/images/troops/wwitch-portrait.png',
    title: 'Day 3',
    monsterId: 3,
    background: '/images/background/enlistment-3.jpg',
    aura: '/images/troops/aura-3.png',
    basicUnit: '/images/troops/wskeleton-warrior.webp',
},
{
    id: RACES.ELVES,
    name: RACE_DESCRIPTION[RACES.ELVES],
    image: '/images/troops/wferal-spirit-portrait.png',
    title: 'Day 4',
    monsterId: 4,
    background: '/images/background/enlistment-4.jpg',
    aura: '/images/troops/aura-4.png',
    basicUnit: '/images/troops/warmoured-elf.webp',
}];

export const FORMATIONS = {
    SQUADRON: 1,
    BARRICADE: 2,
    AVENGERS: 3
}

export const FORMATIONS_NAMES = {
    [FORMATIONS.SQUADRON]: 'Squadron',
    [FORMATIONS.BARRICADE]: 'Barricade',
    [FORMATIONS.AVENGERS]: 'Avengers',
}

export const RACE_FORMATIONS = {
    [RACES.HUMANS]: {
        [FORMATIONS.SQUADRON]: {
            0: 10,
            1: 10,
            2: 10,
            3: 10,
            4: 10,
            15: 10,
        },
        [FORMATIONS.BARRICADE]: {
            0: 15,
            1: 15,
            2: 15,
            3: 15,
            4: 15,
            15: 15,
        },
    },
    [RACES.ORCS]: {
        [FORMATIONS.SQUADRON]: {
            5: 20,
            6: 20,
            7: 20,
            8: 20,
            9: 20,
            16: 20,
        },
        [FORMATIONS.BARRICADE]: {
            5: 25,
            6: 25,
            7: 25,
            8: 25,
            9: 25,
            16: 25,
        },
    },
    [RACES.UNDEADS]: {
        [FORMATIONS.SQUADRON]: {
            10: 30,
            11: 30,
            12: 30,
            13: 30,
            14: 30,
            17: 30,
        },
        [FORMATIONS.BARRICADE]: {
            10: 35,
            11: 35,
            12: 35,
            13: 35,
            14: 35,
            17: 35,
        },
    },
    [RACES.ELVES]: {
        [FORMATIONS.SQUADRON]: {
            18: 40,
            19: 40,
            20: 40,
            21: 40,
            22: 40,
            23: 40,
        },
        [FORMATIONS.BARRICADE]: {
            18: 45,
            19: 45,
            20: 45,
            21: 45,
            22: 45,
            23: 45,
        },
    },
}