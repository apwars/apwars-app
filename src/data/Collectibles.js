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
          "0xf1c03475719a1a6a3875123e38c66c235ea08225b9fe8f49ee14e4d7a11f21757d0f7f4e70dd7270807c411427e3de31b63b2c2fc6d215ea9da22498b739afb400"
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
          "0x7c136224d5fbfa79e9b709415c63b6008eee5b89320c5bc15c2fc929fa401c366bc9a659a12ade499206f013d5634d8ec0c562bc0704edac7c7fd6b56680dc8200"
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
          "0x25354e229834d2796fd813e9376e1dcc2bcc8af6985671234cfe5d244fec73ca091c15acb8c41b89cbf4b60480567a06f6de65407207cf6b31c2c34d88bc019a01"
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
          "0x48ab9d3bcc3289dc37e47e6d43c9eba721d35a000f8c646db852bb66460cef470b0843b72515ae21c16c3d9291660f77b66decc2c88da80a60c133d6540954f700"
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
          "0xa3a18e8b4b7ba7d5d2d62c92720eb02dc69478f173a0675da62714930e7a57dd5daf0203ad623876b6bf8994fb46c22cc8de41dc14fa0ed8e59b2f447aa0492e00"
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
          "0x8464598da6406e707e525ee81f26a9d65132ea1806ed9d7e718b749b548d2aff1b2b25056f557710b01297ec849f9ee96bb07764411f384392bd262e70acc64a00"
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
          "0x97caa8c5277663f900cb5b90901066cf407c8917ae3e1141eb243dae9c80a6113a251c3f93bca1d98ffb11cc88f5572b0b07242bd024e771db008bccb4bbbadd00"
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
          "0x8f88fc32433f91fb4d17e07801cad597ec8eac310c31b83ea08966e866e97a5f500debab0e7570d81c3b1dcaadf0d7a34406a8388ebb12fc40c4dd62a23bf8fd01"
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
          "0x6ce8a8cdc251fc1bbab7a65c1dcc89cdce74e7d2742bac967306e0f06ed7503161743ac43a554f73d6b40a466003b5b4a12a4418f130946c819e2a6b5062af0800"
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
          "0xfb2366781b0d909f9097421499c43e79c5c7722dcbeb612865732216cb83dd0d59adccdab7631be943020748647f4d807a5a5393481ac543f0c2fcc35130307000"
      }
    }
  ];
}
