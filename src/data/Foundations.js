export const FOUNDATIONS = {
    EMPTY_LAND: 1,
    VILLAGE: 62,
};

export const FOUNDATION_NAMES = {
    [FOUNDATIONS.EMPTY_LAND]: 'Empty Land',
    [FOUNDATIONS.VILLAGE]: 'Village',
};

export const FOUNDATIONS_DATA = [{
    foundationType: FOUNDATIONS.EMPTY_LAND,
    name: FOUNDATION_NAMES[FOUNDATIONS.EMPTY_LAND],
    image: `/images/foundations/${FOUNDATIONS.EMPTY_LAND}.png`,
},
{
    foundationType: FOUNDATIONS.VILLAGE,
    name: FOUNDATION_NAMES[FOUNDATIONS.VILLAGE],
    image: `/images/foundations/${FOUNDATIONS.VILLAGE}.png`,
}];