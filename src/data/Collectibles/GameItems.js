import store from "@/store";

export function getGameItems() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 0,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Pioneer",
      description:
        '"1 In the beginning Satoshi created the heaven in earth. 2 Darkness was over the surface of the financial world, and the Spirit of Satoshi was hovering over the crisis of 2008. 3 And Satoshi said, “Let there be censorship resistant money,” and there was fairness. 4 Satoshi saw that the Bitcoin was good, and he separated the money from the state. 5 In the beginning of Descentraland the first races came to be. The pioneers of Corporations and Degenerates lived in peace until the first war was inevitable."<br />-Sacred Lore v1 <br /><small><b>No practical effects are known until this moment but tales about this souvenir states that it is a sleeping ring of power</b></small>',
      image: "/images/nfts/pioneer.png",
      parameters: {
        id: 0,
        price: "1000000000000000000000",
      },
      signatures: {
        "56":
          "0x5107ad902f8e4893b919d37d98d5e947ba29f97964311e002bd0e7b0296ad081330c2ea7b9185f6d8851ababe87514caf912372c6120ebcb06bd3dda9d20f0b301",
      },
    },
    {
      id: 1,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      description:
        '"The Fellowship between races was cherished in older ages before the first war. Until today there are bard songs that sing about a mythical secret society of powerful sages that gather from time to time to define the destinity of Decentraland."<br />- Bard Rumor<br /><small><b>Ticket for participating in a possible DAO.</b></small>',
      title: "The Society",
      image: "/images/nfts/society.png",
      parameters: {
        id: 1,
        price: "10000000000000000000000",
      },
      signatures: {
        "56":
          "0x8b50864b9387e83e634d433c9e71e43d26767f668c30e9f5d81633f7677619764067d6f259424357779728eee648074b781fe6c08ea506276e7fb9690a51244d00",
      },
    },
    {
      id: 6,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Our first beloved hater",
      description:
        '"In the most challenging moment of the battle, in the obscurity of the warrior\'s heart and the blindness of his mind, the most profound hate awakens the strength necessary to triumph." - The Warrior Guide<br /><small><b>This furious item has a positive effect on attack power of your troops in 1%.</b></small>',
      image: "/images/nfts/obh1.png",
      parameters: {
        id: 6,
        price: "1000000000000000000000",
      },
      signatures: {
        "56":
          "0x33a2126a423c01da4ff6c041962098e9563a00a55e746d737fc4a17bd514d3a35ce0b394c5147fb41034d77d061a75c58ca302cd3b9b0931dfa3ebf7b4327a9401",
      },
    },
    {
      id: 7,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (10%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/goldsaver10.png",
      parameters: {
        id: 7,
        price: "1000000000000000000000",
      },
      signatures: {
        "56":
          "0x1e78117139f11b07bf0eb346d74a454710e3ee4b5a78ae7324e3c52bbb8ab840149474bbdce061b4c66808b4b6e18fd7a72b7be96ecc73222aa2fb6dd4f7d0cb01",
      },
    },
    {
      id: 8,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (15%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/goldsaver15.png",
      parameters: {
        id: 8,
        price: "100000000000000000000000",
      },
      signatures: {
        "56":
          "0xe0f4b78d1f08de86571440033cecce3d8ce267a307ef376c586e27d8a874b58f6b15b8b9e1df557d69e1a77edaa332dcc04753ad9cd62be74e1734d331c4c53601",
      },
    },
    {
      id: 9,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (20%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/goldsaver20.png",
      parameters: {
        id: 9,
        price: "200000000000000000000000",
      },
      signatures: {
        "56":
          "0x3aeb5359467f4e0071150afcf742b911329c36d3f98375ba7ce2e9ee52f04b0316a8dace3e021a78b6d8f73738173f7aea1aa3851a6d37427c71f4977b94539300",
      },
    },
    {
      id: 10,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "The Pionner 48h-Gold Saver (10%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The 48h-Gold Saver is an item that makes you save a 10% of wGOLD whenever staking to produce units for 48h when activated by the game.</b></small>',
      image: "/images/nfts/goldsaver1048h-pioneer.png",
    },
    {
      id: 11,
      isGift: true,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Society 48h-Gold Saver (20%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The 48h-Gold Saver is an item that makes you save a 20% of wGOLD whenever staking to produce units for 48h when activated by the game.</b></small>',
      image: "/images/nfts/goldsaver2048h-thesociety.png",
    },

    //troop savers
    {
      id: 12,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Corp Troop Saver (10%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/corp-troopsaver-10.png",
      parameters: {
        id: 12,
        price: "300000000000000000000",
      },
      signatures: {
        "56":
          "0x5d7e8cf0fb0aeb91e9c89d56a1dcbc6eac3d2091c8b38a81d0a1fc874f316b1513693f5366dc1482ee2634b914c790e90c4b64e7e618f487e6fb75f805584c1700",
      },
    },
    {
      id: 13,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Corp Troop Saver (30%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/corp-troopsaver-30.png",
      parameters: {
        id: 13,
        price: "1500000000000000000000",
      },
      signatures: {
        "56":
          "0xc92273162869ee8d0c1ab074120c579336c6bba0a36ec577f35de01e5798b6b157e4282d830267a67239f40c1270fa6e31522e2397939dfcdb47619b4ba6974f01",
      },
    },
    {
      id: 14,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Corp Troop Saver (60%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/corp-troopsaver-60v2.png",
      parameters: {
        id: 14,
        price: "3000000000000000000000",
      },
      signatures: {
        "56":
          "0x04919ca224434e4def8bfd366c1f0c10efc3275b33b702d7e6c342037d0564c612281269239fb5bf4e086663bf86049bb40a9e8b45a55b2d27c85d8a37e1bf8f01",
      },
    },
    {
      id: 15,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Degen Troop Saver (10%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/degen-troopsaver-10.png",
      parameters: {
        id: 15,
        price: "300000000000000000000",
      },
      signatures: {
        "56":
          "0xf377b63d5b7be3e8a53ab6829003b66248f24c7d414eb4c5799a5a24a49bf1431f09553d8549f42e7a1f8ddd3a4caab3d7e7911fd5e2c9f407fbf78e0e854b0101",
      },
    },
    {
      id: 16,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Degen Troop Saver (30%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/degen-troopsaver-30.png",
      parameters: {
        id: 16,
        price: "1500000000000000000000",
      },
      signatures: {
        "56":
          "0xd86cbd0b65f9a591ba5eea2d17b3a786927230d35434da29604b3f6589ebd0a84972d30d87d96263f5660880ec75829a6711318214f875bd61a2fb40661e583d01",
      },
    },
    {
      id: 17,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Degen Troop Saver (60%)",
      description:
        '"How many barbarian axe holders do you need to make a trained Armored Warrior? Depends on our reserves of wGOLD to throw into the military material. If the war budget is scarce, we get a bunch of soldiers fighting with each other in bare hands, the last men standing gets the job. If the coffers are full, we can get a chainmail for almost everyone." <br />– Chief of Military Training, Battle Diary - page 4.-The Orc Bookkeeper<br /><small><b>The Tropp Saver is an item that makes you save a % of wUNIT whenever staking to produce new units. There are three levels of modifiers 10%, 30% and 60%.</b></small>',
      image: "/images/nfts/degen-troopsaver-60.png",
      parameters: {
        id: 17,
        price: "3000000000000000000000",
      },
      signatures: {
        "56":
          "0xccccd8b9a1a40bc5cc150d61439fe4d12bde18d5f46bf8c379bef53a7458b2996b516231134dbeb3b7583ae99c4a7e1f3f68f365ad304509b4076c0cebde52dc00",
      },
    },
    {
      id: 27,
      type: 'gameItem',
      typeDesc: 'Game Items',
      contractAddress: addresses.collectibles,
      isGift: false,
      title: "Free Transport",
      description: "I am an active transporter. However, for some particular fellows, I can carry some items without charge my regular fee. WARNING: This is a spendable item.",
      image: "/images/nfts/lilith-100off.png",
    },
    {
      id: 28,
      type: 'gameItem',
      typeDesc: 'Game Items',
      contractAddress: addresses.collectibles,
      isGift: false,
      title: "Experience Ring",
      description: `And to you my youngest son I leave you this. This ring is for you to measure how much you already learned from life. As you get older it will change its appearance, in the moment you wear it its stone will turn to white, as you learn from difficulties it will get green, yellow, red, blue and eventually purple. I desire you were destined to a simpler life but with the responsibilities you heir I think your purple will be more intense than mine.
      - "King Leonidas of the first human empire at his deathbed"`,
      image: "/images/nfts/experience-ring.png",
    }

  ];
}
