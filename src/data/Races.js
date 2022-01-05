export const RACES = {
    HUMANS: 1,
    ORCS: 2,
    UNDEADS: 3,
    ELVES: 4
};

export const RACE_DESCRIPTION = {
    [RACES.HUMANS]: 'Humans',
    [RACES.ORCS]: 'Orcs',
    [RACES.UNDEADS]: 'Undead',
    [RACES.ELVES]: 'Elves',
};

export const ENLISTMENT_OPTIONS = [{
    id: RACES.HUMANS,
    name: RACE_DESCRIPTION[RACES.HUMANS],
   /*  image: '/images/troops/wwizard-portrait.png', */
    image: '/images/troops/units/humans/wWIZARD.png',
    title: 'Day 1',
    monsterId: 1,
    monsterName: 'Stone',
    background: '/images/background/enlistment-1.jpg',
    aura: '/images/troops/aura-1.png',
    basicUnit: '/images/troops/wwarrior.webp',
},
{
    id: RACES.ORCS,
    name: RACE_DESCRIPTION[RACES.ORCS],
    /* image: '/images/troops/wshaman-portrait.png', */
    image: '/images/troops/units/orcs/wSHAMAN.png',
    title: 'Day 2',
    monsterId: 2,
    monsterName: 'Baphomet',
    background: '/images/background/enlistment-2.jpg',
    aura: '/images/troops/aura-2.png',
    basicUnit: '/images/troops/wgrunt.webp',
},
{
    id: RACES.UNDEADS,
    name: RACE_DESCRIPTION[RACES.UNDEADS],
    /* image: '/images/troops/wwitch-portrait.png', */
    image: '/images/troops/units/undeads/wWITCH.png',
    title: 'Day 3',
    monsterId: 3,
    monsterName: 'Knight',
    background: '/images/background/enlistment-3.jpg',
    aura: '/images/troops/aura-3.png',
    basicUnit: '/images/troops/wskeleton-warrior.webp',
},
{
    id: RACES.ELVES,
    name: RACE_DESCRIPTION[RACES.ELVES],
    /* image: '/images/troops/wferal-spirit-portrait.png', */
    image: '/images/troops/units/elves/wFERAL-SPIRIT.png',
    title: 'Day 4',
    monsterId: 4,
    monsterName: 'Forger',
    background: '/images/background/enlistment-4.jpg',
    aura: '/images/troops/aura-4.png',
    basicUnit: '/images/troops/warmoured-elf.webp',
}]
