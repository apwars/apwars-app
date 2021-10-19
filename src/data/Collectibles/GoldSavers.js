import store from "@/store";

export function getGoldSavers() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 63,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      title: "Gold Saver (10%) (Spendable)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/63.png",
      combinators: {
        warPreparation: {
          image: "/images/icons/63.png",
          necessaryResources: {
            tokenA: {
              title: "wGOLD",
              image: "/images/wgold.png",
            },
            tokenB: {
              id: 7,
              title: "Gold Saver (10%)",
              image: "/images/icons/7.png",
              type: "magicalItem",
            },
          },
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 0,
            "97": 5,
          },
        },
      },
    },
    {
      id: 64,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      title: "Gold Saver (15%) (Spendable)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/64.png",
      combinators: {
        warPreparation: {
          image: "/images/icons/64.png",
          necessaryResources: {
            tokenA: {
              title: "wGOLD",
              image: "/images/wgold.png",
            },
            tokenB: {
              id: 8,
              title: "Gold Saver (15%)",
              image: "/images/icons/8.png",
              type: "magicalItem",
            },
          },
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 0,
            "97": 6,
          },
        },
      },
    },
    {
      id: 65,
      type: "gameItem",
      typeDesc: "Game Items",
      contractAddress: addresses.collectibles,
      title: "Gold Saver (20%) (Spendable)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/65.png",
      combinators: {
        warPreparation: {
          image: "/images/icons/65.png",
          necessaryResources: {
            tokenA: {
              title: "wGOLD",
              image: "/images/wgold.png",
            },
            tokenB: {
              id: 9,
              title: "Gold Saver (20%)",
              image: "/images/icons/9.png",
              type: "magicalItem",
            },
          },
          combinatorAddress: {
            "56": "0x4311C6e36FaAD6B3Cd5bf4A73fc273A02b32Ec46",
            "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 0,
            "97": 7,
          },
        },
      },
    },
  ];
}
