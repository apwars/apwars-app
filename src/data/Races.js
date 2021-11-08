export const RACES = {
    HUMANS: 1,
    ORCS: 2,
    UNDEADS: 3,
    ELVES: 4
};

export const RACE_DESCRIPTION = {
    [RACES.HUMANS]: 'Humans',
    [RACES.ORCS]: 'Orcs',
    [RACES.UNDEADS]: 'Undeads',
    [RACES.ELVES]: 'Elves',
}

export const ENLISTMENT_OPTIONS = [{
    id: RACES.HUMANS,
    name: RACE_DESCRIPTION[RACES.HUMANS],
    image: '/images/troops/wwizard-portrait.png',
    title: 'Day 1',
},
{
    id: RACES.ORCS,
    name: RACE_DESCRIPTION[RACES.ORCS],
    image: '/images/troops/wshaman-portrait.png',
    title: 'Day 2',
},
{
    id: RACES.UNDEADS,
    name: RACE_DESCRIPTION[RACES.UNDEADS],
    image: '/images/troops/wwitch-portrait.png',
    title: 'Day 3',
},
{
    id: RACES.ELVES,
    name: RACE_DESCRIPTION[RACES.ELVES],
    image: '/images/troops/wferal-spirit-portrait.png',
    title: 'Day 4',
}]