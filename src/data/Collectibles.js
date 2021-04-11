import store from "@/store";

export function getCollectibles() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 0,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Pioneer",
      description:
        '"1 In the beginning Satoshi created the heaven in earth. 2 Darkness was over the surface of the financial world, and the Spirit of Satoshi was hovering over the crisis of 2008. 3 And Satoshi said, “Let there be censorship resistant money,” and there was fairness. 4 Satoshi saw that the Bitcoin was good, and he separated the money from the state. 5 In the beginning of Descentraland the first races came to be. The pioneers of Corporations and Degenerates lived in peace until the first war was inevitable."<br />-Sacred Lore v1',
      image: "/images/nfts/pioneer.png",
      parameters: {
        id: 0,
        price: "1000000000000000000000",
        mint: false
      },
      signatures: {
        "5777":
          "0xc619a4714ba7ad2b98bd56cd32175c0ed49a700ff0760d611846b11931448ba4521c8de86463f627f82e869d80493fdb3087a93aedf592635d04e346c36b4edd00"
      }
    },
    {
      id: 1,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      description:
        '"The Fellowship between races was cherished in older ages before the first war. Until today there are bard songs that sing about a mythical secret society of powerful sages that gather from time to time to define the destinity of Decentraland."<br />- Bard Rumor',
      title: "The Society",
      image: "/images/nfts/society.png",
      parameters: {
        id: 1,
        price: "2300000000000000000000"
      },
      signatures: {
        "5777":
          "0x8670cd69b1bd7536d559001eb35de429cfa9ffa70ae2378212f244d4b078218c622af3cfce90f426a2ed55517b0335c1fc33951a884d51505d8f2315bc5456fa00"
      }
    },
    {
      id: 2,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Elixir (10%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3',
      image: "/images/nfts/elixir10.png",
      parameters: {
        id: 0,
        price: "2300000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 3,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Elixir (30%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3',
      image: "/images/nfts/elixir30.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 4,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Elixir (60%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3',
      image: "/images/nfts/elixir60.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 5,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Arcane's Book",
      description:
        '"The Arcane Book is more than a magical grimorium, it is a map for the Arcanarium planar helm. Those who master its pages can travel effortlessly between both planes and be protected from mundane interferences."',
      image: "/images/nfts/arcane.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 6,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Our first beloved hater",
      description:
        '"In the most challenging moment of the battle, in the obscurity of the warrior\'s heart and the blindness of his mind, the most profound hate awakens the strength necessary to triumph." - The Warrior Guide',
      image: "/images/nfts/obh1.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 7,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (10%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper',
      image: "/images/nfts/goldsaver10.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 8,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (30%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper',
      image: "/images/nfts/goldsaver30.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    },
    {
      id: 9,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (60%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper',
      image: "/images/nfts/goldsaver60.png",
      parameters: {
        id: 0,
        price: "2321000000000000000000",
        mint: true,
        signature: {
          "56": ""
        }
      }
    }
  ];
}
