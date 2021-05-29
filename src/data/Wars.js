import war1FinalReport from "@/data/warsReport/war1FinalReport";

export function getWars() {
  return [
    {
      id: 0,
      name: "The first conflict",
      description: `
      For a long time all the attention in Decentraland was spent on the rising tensions between Humans and Orcs, after a golden period of bonanza an age of military preparation has begun. A lot of wGOLD was spent in recruiting Warriors and Archers across the Human empire, from the Capital to the extended countryside, men of all ages were being recruited, children and seniors capable of holding a sword were considered able to fight. At the same time at Orc pits, Grunts and Orc Archers were being raised and united to form a monstrous army. This animosity and arousement of forces shadowed the real threat to liberty of all races that was lurking into the shadows. Silently in an obscure form the Forces of Extreme Darkness were growing in power day by day, night by night in a subversive manner. This ultimate enemy has not yet been faced.`,
      dateStart: "2021-05-08",
      dateEnd: "2021-05-14",
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
  ];
}