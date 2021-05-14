import war1FinalReport from "@/data/warsReport/war1FinalReport";

export function getWars() {
  return [
    {
      id: 0,
      name: "The first conflict",
      description: `
      For a long time all the attention in Decentraland was spent on the rising tensions between Humans and Orcs, after a golden period of bonanza an age of military preparation has begun. A lot of wGOLD was spent in recruiting Warriors and Archers across the Human empire, from the Capital to the extended countryside, men of all ages were being recruited, children and seniors capable of holding a sword were considered able to fight. At the same time at Orc pits, Grunts and Orc Archers were being raised and united to form a monstrous army. This animosity and arousement of forces shadowed the real threat to liberty of all races that was lurking into the shadows. Silently in an obscure form the Forces of Extreme Darkness were growing in power day by day, night by night in a subversive manner. This ultimate enemy has not yet been faced.`,
      dateStart: "2021-05-08",
      dateEnd: "In progress",
      contractAddress: {
        "5777": "0x027C51b5235CF7103a04D429cDa314B1ef1F5319",
        "56": "0x0866bfde63fd01687ad6b36c3063828af50b62ea",
        "97": "0x7f1B535deb4e12dE9cF3EEd8ccb1B92833618E72",
      },
      countdown: {
        enlistment: 1620486000000,
        round1: 1620745200000,
        round2: 1621004400000,
      },
      totalPrize: "4874364487632384826939128",
      test: false,
      report: war1FinalReport,
    },
    {
      name: "preWar#3 - Test",
      description: `
      This is a pre-war to test the contract and frontend functionalities.`,
      dateStart: "2021-05-07",
      dateEnd: "2021-05-07",
      contractAddress: {
        "5777": "0xB5642bbd729571187237aE548B36b5C9d2101D42",
        "56": "0x7e1d590a1d8de2f1bc0e698fd9fd7b57ebe3f8d2",
        "97": "0x7f1B535deb4e12dE9cF3EEd8ccb1B92833618E72",
      },
      countdown: {
        enlistment: 1620486000000,
        round1: 1620745200000,
        round2: 1621004400000,
      },
      totalPrize: "4874364487632384826939128",
      test: false,
      report: war1FinalReport,
    },
    {
      name: "preWar#2 - Test",
      description: `
      This is a pre-war to test the contract and frontend functionalities.`,
      dateStart: "2021-05-05",
      dateEnd: "2021-05-06",
      contractAddress: {
        "5777": "0x81727708D3f1b7455661ABF8c8bB315d57A28044",
        "56": "0x8448265038000925421f8de4c668cad764032596",
        "97": "0x7f1B535deb4e12dE9cF3EEd8ccb1B92833618E72",
      },
      countdown: {
        enlistment: 1620486000000,
        round1: 1620745200000,
        round2: 1621004400000,
      },
      totalPrize: "4874364487632384826939128",
      test: false,
      report: war1FinalReport,
    },
    {
      name: "preWar#1 - Test",
      description: `
      This is a pre-war to test the contract and frontend functionalities .`,
      dateStart: "2021-05-01",
      dateEnd: "2021-05-02",
      contractAddress: {
        "5777": "0x81727708D3f1b7455661ABF8c8bB315d57A28044",
        "56": "0xc1ff2c7284b4535d6f6396b9af3c699d512351de",
        "97": "0x7f1B535deb4e12dE9cF3EEd8ccb1B92833618E72",
      },
      countdown: {
        enlistment: 1620486000000,
        round1: 1620745200000,
        round2: 1621004400000,
      },
      totalPrize: "4874364487632384826939128",
      test: false,
      report: war1FinalReport,
    },
  ];
}
