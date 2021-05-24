import store from "@/store";

export function getLegendaryRelics() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 20,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "The legend Corp",
      description:
        "Sire, they spared my life to deliver this message to you. We are coming. - Weary soldier message",
      image: "/images/nfts/war1-the-legend-corp.png",
    },
    {
      id: 21,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "The legend Degen",
      description:
        "Sire, they spared my life to deliver this message to you. We are coming. - Weary soldier message",
      image: "/images/nfts/war1-the-legend-degen.png",
    },
    {
      id: 22,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "War Hero",
      description: "All hail the a survivor from a great battle - War veterany",
      image: "/images/nfts/war1-war-hero.png",
    },
    {
      id: 23,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "Great Reinforcement",
      description:
        "When the battlefiled saw us coming the war stoped and they become spectators of our charge - Horsemen of the second brigade",
      image: "/images/nfts/war1-great-reinforcement.png",
    },
    {
      id: 24,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "The Conqueror",
      description: "The vivid tongues call me a conqueror, but the actual message I spreaded was silence. - Guartuffo the Quiet",
      image: "/images/nfts/war1-the-conqueror.png",
    }, 
    {
      id: 25,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "Memorable Victory",
      description: "I can forget a lot of things but not the great war. It is like if I lived to expect it and then to remember it - War veteran",
      image: "/images/nfts/war1-memorable-victory.png",
    },
    {
      id: 26,
      type: 'legendaryRelics',
      typeDesc: 'Legendary Relics',
      contractAddress: addresses.collectibles,
      isGift: true,
      tokenAddress: addresses.wGOLD,
      title: "Memorable Death",
      description: "I can forget a lot of things but not the great war. It is like if I lived to expect it and then to remember it - War veteran",
      image: "/images/nfts/war1-memorable-death.png",
    }
  ];
}
