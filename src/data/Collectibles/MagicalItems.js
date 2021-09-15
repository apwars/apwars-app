import store from "@/store";

export function getMagicalItems() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
        id: 2,
        name: "elixir10",
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Elixir (10%)",
        description:
          '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
        image: "/images/nfts/2.png",
        combinators: {
          warPreparation: {
            name: 'The Elixir (10%) (Spendable)',
            image: '/images/icons/elixir10.png',
            necessaryResources: {
              tokenA: '/images/wCOURAGE.png',
              tokenB: '/images/icons/2.png'
            },
            combinatorAddress: {
              "56": "",
              "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
            },
            claimRouter: "/war-preparation",
            idCombinator: {
              "5777": 0,
              "56": 1,
              "97": 1,
            },
          },
          rewardIcon: "/images/nfts/rewards/spendable/40.png"
        },
      },
      {
        id: 3,
        name: "elixir15",
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Elixir (15%)",
        description:
          '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
        image: "/images/nfts/3.png",
        combinators: {
          warPreparation: {
            name: 'The Elixir (15%) (Spendable)',
            image: '/images/icons/elixir15.png',
            necessaryResources: {
              tokenA: '/images/wCOURAGE.png',
              tokenB: '/images/icons/3.png'
            },
            combinatorAddress: {
              "56": "",
              "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
            },
            claimRouter: "/war-preparation",
            idCombinator: {
              "5777": 0,
              "56": 1,
              "97": 2,
            },
          },
          rewardIcon: "/images/nfts/rewards/spendable/41.png"
        },
      },
      {
        id: 4,
        name: "elixir20",
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Elixir (20%)",
        description:
          '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
        image: "/images/nfts/4.png",
        combinators: {
          warPreparation: {
            name: 'The Elixir (20%) (Spendable)',
            image: '/images/icons/elixir20.png',
            necessaryResources: {
              tokenA: '/images/wCOURAGE.png',
              tokenB: '/images/icons/4.png'
            },
            combinatorAddress: {
              "56": "",
              "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
            },
            claimRouter: "/war-preparation",
            idCombinator: {
              "5777": 0,
              "56": 1,
              "97": 3,
            },
          },
          rewardIcon: "/images/nfts/rewards/spendable/42.png"
        },
      },
      {
        id: 5,
        name: "arcanes-book",
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Arcane's Book",
        description:
          '"The Arcane Book is more than a magical grimorium, it is a map for the Arcanarium planar helm. Those who master its pages can travel effortlessly between both planes and be protected from mundane interferences." <br/><small><b>It can save 25% of all your magical units from perishing in a battle.</b></small>',
        image: "/images/nfts/5.png",
        combinators: {
          warPreparation: {
            name: `The Arcane's Book (Spendable)`,
            image: '/images/icons/arcanes-book.png',
            necessaryResources: {
              tokenA: '/images/wCOURAGE.png',
              tokenB: '/images/icons/5.png'
            },
            combinatorAddress: {
              "56": "",
              "97": "0x0F8D81Cf5E87f813e779040Ff51Dd7C54b389B71",
            },
            claimRouter: "/war-preparation",
            idCombinator: {
              "5777": 0,
              "56": 1,
              "97": 4,
            },
          },
          rewardIcon: "/images/nfts/rewards/spendable/43.png"
        },
      },
    {
      id: 40,
      type: "magicalItem",
      typeDesc: "Magical Item",
      contractAddress: addresses.collectibles,
      title: "The Elixir (10%) (Spendable)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/40.png",
    },
    {
        id: 41,
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Elixir (15%) (Spendable)",
        description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
        image: "/images/nfts/41.png",
    },
    {
        id: 42,
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Elixir (20%) (Spendable)",
        description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
        image: "/images/nfts/42.png",
    },
    {
        id: 43,
        type: "magicalItem",
        typeDesc: "Magical Item",
        contractAddress: addresses.collectibles,
        title: "The Arcane's Book (Spendable)",
        description:
        '"The Arcane Book is more than a magical grimorium, it is a map for the Arcanarium planar helm. Those who master its pages can travel effortlessly between both planes and be protected from mundane interferences." <br/><small><b>It can save 25% of all your magical units from perishing in a battle.</b> WARNING: This is a spendable item.</small>',
        image: "/images/nfts/43.png",
    },
  ];
}