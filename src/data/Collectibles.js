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
        price: "1000000000000000000000"
      },
      signatures: {
        "56":
          "0x5107ad902f8e4893b919d37d98d5e947ba29f97964311e002bd0e7b0296ad081330c2ea7b9185f6d8851ababe87514caf912372c6120ebcb06bd3dda9d20f0b301"
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
        price: "10000000000000000000000"
      },
      signatures: {
        "56":
          "0x8b50864b9387e83e634d433c9e71e43d26767f668c30e9f5d81633f7677619764067d6f259424357779728eee648074b781fe6c08ea506276e7fb9690a51244d00"
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
        id: 2,
        price: "1000000000000000000000"
      },
      signatures: {
        "56":
          "0x1366bd6450f28b5c6005ecbf2e32e970438de817d380ddae6e730060309fe2005f660c755aa9a383504e6aad85afd5778260925dda3c9a7ec9ca84cac77c793c01"
      }
    },
    {
      id: 3,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Elixir (15%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3',
      image: "/images/nfts/elixir15.png",
      parameters: {
        id: 3,
        price: "100000000000000000000000"
      },
      signatures: {
        "56":
          "0x4cc257cb09cbffd97271ae0ea2a9f22c93c5d1b0f66b1d3f7b9de21a919a54584edab933b3b5006dbfecf604ca12d5216383acdb0ca880f322857f9f6393d44300"
      }
    },
    {
      id: 4,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "The Elixir (20%)",
      description:
        '"The elixir is like a refreshing waterfall of magical stream that goes directly to the soul, once you drink you forget about the weariness of the body."<br />-	Medicinal Alchemy, vol 3',
      image: "/images/nfts/elixir20.png",
      parameters: {
        id: 4,
        price: "200000000000000000000000"
      },
      signatures: {
        "56":
          "0x9e8cf796a6c72e56933aa344bd9c9223428fa2fd2c3d58972be2fe8d37b24c422530dcf7890370e1dc4e3eb87df14efc01726b0d3d432dfa44021b663504c94b01"
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
        id: 5,
        price: "10000000000000000000000"
      },
      signatures: {
        "56":
          "0x13a77abf8c26731ff352621f450db6901b218735322e2d99fd58b69103477e531aef21cd73ece1ecfe21e58fe560bdde666328c736be5a2aa69ad692a85b2e6201"
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
        id: 6,
        price: "1000000000000000000000"
      },
      signatures: {
        "56":
          "0x33a2126a423c01da4ff6c041962098e9563a00a55e746d737fc4a17bd514d3a35ce0b394c5147fb41034d77d061a75c58ca302cd3b9b0931dfa3ebf7b4327a9401"
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
        id: 7,
        price: "1000000000000000000000"
      },
      signatures: {
        "56":
          "0x1e78117139f11b07bf0eb346d74a454710e3ee4b5a78ae7324e3c52bbb8ab840149474bbdce061b4c66808b4b6e18fd7a72b7be96ecc73222aa2fb6dd4f7d0cb01"
      }
    },
    {
      id: 8,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (15%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper',
      image: "/images/nfts/goldsaver15.png",
      parameters: {
        id: 8,
        price: "100000000000000000000000"
      },
      signatures: {
        "56":
          "0xe0f4b78d1f08de86571440033cecce3d8ce267a307ef376c586e27d8a874b58f6b15b8b9e1df557d69e1a77edaa332dcc04753ad9cd62be74e1734d331c4c53601"
      }
    },
    {
      id: 9,
      contractAddress: addresses.collectibles,
      tokenAddress: addresses.wGOLD,
      title: "Gold Saver (20%)",
      description:
        '"In the old ages the guilds were used to employ mercenaries to amass power, now a days they are tools of bargain."<br />-The Orc Bookkeeper',
      image: "/images/nfts/goldsaver20.png",
      parameters: {
        id: 9,
        price: "200000000000000000000000"
      },
      signatures: {
        "56":
          "0x3aeb5359467f4e0071150afcf742b911329c36d3f98375ba7ce2e9ee52f04b0316a8dace3e021a78b6d8f73738173f7aea1aa3851a6d37427c71f4977b94539300"
      }
    }
  ];
}
