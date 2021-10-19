import store from "@/store";

export function getGoldSavers() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 7,
      type: "goldSaver",
      typeDesc: "Gold Savers",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      name: '7',
      title: "Gold Saver (10%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, nowadays they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
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
      type: "goldSaver",
      typeDesc: "Gold Savers",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      name: '8',
      title: "Gold Saver (15%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, nowadays they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
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
      type: "goldSaver",
      typeDesc: "Gold Savers",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      name: '9',
      title: "Gold Saver (20%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, nowadays they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The Gold Saver is an item that makes you save a % of wGOLD whenever staking to produce units. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
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
      type: "goldSaver",
      typeDesc: "Gold Savers",
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "Pioneer Gold Saver (10%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, nowadays they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The 48h-Gold Saver is an item that makes you save a 10% of wGOLD whenever staking to produce units for 48h when activated by the game.</b></small>',
      image: "/images/nfts/goldsaver1048h-pioneer.png",
    },
    {
      id: 11,
      isGift: true,
      type: "goldSaver",
      typeDesc: "Gold Savers",
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Society Gold Saver (20%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, nowadays they are tools of bargain."<br />-The Orc Bookkeeper<br /><small><b>The 48h-Gold Saver is an item that makes you save a 20% of wGOLD whenever staking to produce units for 48h when activated by the game.</b></small>',
      image: "/images/nfts/goldsaver2048h-thesociety.png",
    },
    {
      id: 63,
      type: "goldSaver",
      typeDesc: "Gold Savers",
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
      type: "goldSaver",
      typeDesc: "Gold Savers",
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
      type: "goldSaver",
      typeDesc: "Gold Savers",
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
