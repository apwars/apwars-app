const mappedErrors = {
    /* MetaMask */
    4001: 'User denied the signature.',
    /* War */
    WAR_NOT_FOUND: 'War not found',
    WAR_INVALID_STATUS: 'Invalid War Status',
    WAR_NEEDS_ENLISTMENT_STATUS: 'War needs to be in enlistment status',
    SLOT_NOT_FOUND: 'Enlistment slot not found',
    FACTION_NOT_FOUND: 'Faction not found',
    RACE_NOT_FOUND: 'Breed not found',
    SLOT_IN_USE: 'Slot in use',
    ACCOUNT_IN_WAR: 'The wallet is already in use in the war',
    FORMATION_NOT_FOUND: 'Formation not found',
    INVALID_AMOUNT_WEAPONS: 'Invalid number of weapons',
    INVALID_AMOUNT: 'Invalid number of Units',
    INSUFFICIENT_FUNDS: 'Without balance',
    WAR_NEEDS_FINISHED_STATUS: 'War has not ended',
    BRING_HOME_DONE: 'Bring Home already done',
    INVALID_SWAP_TRANSACTION: 'Invalid Swap Transaction',
    /* Start Swap */
    NOT_FOUND_TOKEN_SWAP: 'The token for the swap was not found.',
    INVALID_CONTRACT_TOKEN: 'Invalid token contract',
    INVALID_WALLET_DEPOSIT: 'Invalid wallet deposit',
    INVALID_SWAP_CONTRACT_METHOD: 'Invalid swap contract method',
    INVALID_SWAP_AMOUNT: 'Invalid swap amount',
    ACCOUNT_HAS_SOLDIER: 'This account already has Soldier',
    INVALID_PRIZE_SOLDIER: 'Invalid Soldier Prize',
}

export default function errorHandler(code = '') {
    return mappedErrors[code.toString()] || 'Something went wrong while trying to execute the action.'
}