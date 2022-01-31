import store from "@/store";

export function getWeapons() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 39,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Shield",
      description: 'The Simple Shield is strong and resistant, who wield it will be much safer in a direct confrontation.',
      image: "/images/nfts/weapon-simple-shield.png",
      strength: 0,
      defense: 15,
    },
    {
      id: 63,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Bow",
      description: 'The Simples Archery can be used by your troops in direct conflict with enemies. And it will give you the initial strength to conquer your path to victory.',
      image: "/images/nfts/weapon-simple-bow.png",
      strength: 15,
      defense: 0,
    },
    {
      id: 64,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Spear",
      description: 'The Simple Spear is sharp and can be used from a distance causing great damage to the enemy team.',
      image: "/images/nfts/weapon-simple-spear.png",
      strength: 40,
      defense: 0,
    },
    {
      id: 65,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Potion",
      description: 'The Simple Potion has magical elements that give power to your troops. Once used, it causes irreversible damage to opponents.',
      image: "/images/nfts/weapon-simple-potion.png",
      strength: 20,
      defense: 5,
    },
  ];
}
