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
      typeDesc: "Magical Items",
      contractAddress: addresses.collectibles,
      title: "The Elixir (10%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/elixir10.png",
      tokenGameItemA: {
        name: "wCOURAGE",
        necessaryAmount: "1000",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      }
    },
    {
      id: 3,
      name: "elixir15",
      type: "magicalItem",
      typeDesc: "Magical Items",
      contractAddress: addresses.collectibles,
      title: "The Elixir (15%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/elixir15.png",
      tokenGameItemA: {
        name: "wCOURAGE",
        necessaryAmount: "100000",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      }
    },
    {
      id: 4,
      name: "elixir20",
      type: "magicalItem",
      typeDesc: "Magical Items",
      contractAddress: addresses.collectibles,
      title: "The Elixir (20%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b></small>',
      image: "/images/nfts/elixir20.png",
      tokenGameItemA: {
        name: "wCOURAGE",
        necessaryAmount: "200000",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      }
    },
    {
      id: 5,
      name: "arcanes-book",
      type: "magicalItem",
      typeDesc: "Magical Items",
      contractAddress: addresses.collectibles,
      title: "The Arcane's Book",
      description:
        '"The Arcane Book is more than a magical grimorium, it is a map for the Arcanarium planar helm. Those who master its pages can travel effortlessly between both planes and be protected from mundane interferences." <br/><small><b>It can save 25% of all your magical units from perishing in a battle.</b></small>',
      image: "/images/nfts/arcanes-book.png",
      tokenGameItemA: {
        name: "wCOURAGE",
        necessaryAmount: "10000",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      }
    },
    {
      id: 40,
      type: "magicalItem",
      typeDesc: "Magical Item",
      contractAddress: addresses.collectibles,
      title: "The Elixir (10%) (Spendable)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/elixir10-spendable.png",
      combinators: {
        magicalItem: {
          name: "The Elixir (10%) (Spendable)",
          image: "/images/icons/elixir10-spendable.png",
          combinatorAddress: {
            "56": "0xAE8bC4eA46D9D8Ea9B348eb3b96C11783154a68d",
            "97": "0xc8B03C384435Ef49094E727473A6e086F600840c",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 1,
            "97": 1,
          },
          inputs: [{
            name: 'wcourage',
            title: 'wCOURAGE',
            image: '/images/wcourage.png',
          },
          {
            name: 'elixir10',
            title: 'The Elixir (10%)',
            image: '/images/nfts/elixir10.png',
            type: 'magicalItem',
            id: 2,
          }],
        },
      },
    },
    {
      id: 41,
      type: "magicalItem",
      typeDesc: "Magical Item",
      contractAddress: addresses.collectibles,
      title: "The Elixir (15%) (Spendable)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/elixir15-spendable.png",
      combinators: {
        magicalItem: {
          name: "The Elixir (15%) (Spendable)",
          image: "/images/icons/elixir15-spendable.png",
          combinatorAddress: {
            "56": "0xAE8bC4eA46D9D8Ea9B348eb3b96C11783154a68d",
            "97": "0xc8B03C384435Ef49094E727473A6e086F600840c",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 1,
            "97": 2,
          },
          inputs: [{
            title: 'wCOURAGE',
            image: '/images/wcourage.png',
          },
          {
            name: 'elixir15',
            title: 'The Elixir (15%)',
            image: '/images/nfts/elixir15.png',
            type: 'magicalItem',
            id: 3,
          }],
        },
      },
    },
    {
      id: 42,
      type: "magicalItem",
      typeDesc: "Magical Item",
      contractAddress: addresses.collectibles,
      title: "The Elixir (20%) (Spendable)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3<br /><small><b>The Elixir saves a % of your troops from death in a combat. There are three levels of modifiers 10%, 15% and 20%.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/elixir20-spendable.png",
      combinators: {
        magicalItem: {
          name: "The Elixir (20%) (Spendable)",
          image: "/images/icons/elixir20-spendable.png",
          combinatorAddress: {
            "56": "0xAE8bC4eA46D9D8Ea9B348eb3b96C11783154a68d",
            "97": "0xc8B03C384435Ef49094E727473A6e086F600840c",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 1,
            "97": 3,
          },
          inputs: [{
            name: 'wcourage',
            title: 'wCOURAGE',
            image: '/images/wcourage.png',
          },
          {
            name: 'elixir20',
            title: 'The Elixir (20%)',
            image: '/images/nfts/elixir20.png',
            type: 'magicalItem',
            id: 4,
          }],
        },
      },
    },
    {
      id: 43,
      type: "magicalItem",
      typeDesc: "Magical Item",
      contractAddress: addresses.collectibles,
      title: "The Arcane's Book (Spendable)",
      description:
        '"The Arcane Book is more than a magical grimorium, it is a map for the Arcanarium planar helm. Those who master its pages can travel effortlessly between both planes and be protected from mundane interferences." <br/><small><b>It can save 25% of all your magical units from perishing in a battle.</b> WARNING: This is a spendable item.</small>',
      image: "/images/nfts/arcanes-book-spendable.png",
      combinators: {
        magicalItem: {
          name: "The Arcane's Book (Spendable)",
          image: "/images/icons/arcanes-book-spendable.png",
          combinatorAddress: {
            "56": "0xAE8bC4eA46D9D8Ea9B348eb3b96C11783154a68d",
            "97": "0xc8B03C384435Ef49094E727473A6e086F600840c",
          },
          claimRouter: "/war-preparation",
          idCombinator: {
            "5777": 0,
            "56": 1,
            "97": 4,
          },
          inputs: [{
            name: 'wcourage',
            title: 'wCOURAGE',
            image: '/images/wcourage.png',
          },
          {
            name: 'arcanes-book',
            title: `The Arcane's Book`,
            image: '/images/nfts/arcanes-book.png',
            type: 'magicalItem',
            id: 5,
          }],
        },
      },
    },
  ];
}