import store from "@/store";

export function getWeapons() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    // {
    //   id: 4,
    //   type: "weapons",
    //   typeDesc: "Weapons",
    //   contractAddress: addresses.collectibles,
    //   title: "Simple sword",
    //   description: 'The Simples Sword can be used by your troops in direct conflict with enemies. And it will give you the initial strength to conquer your path to victory.',
    //   image: "/images/nfts/weapon-simple-sword.png",
    // },
    // {
    //   id: 5,
    //   type: "weapons",
    //   typeDesc: "Weapons",
    //   contractAddress: addresses.collectibles,
    //   title: "Simple spear",
    //   description: 'The Simple Spear is sharp and can be used from a distance causing great damage to the enemy team.',
    //   image: "/images/nfts/weapon-simple-spear.png",
    // },
    // {
    //   id: 6,
    //   type: "weapons",
    //   typeDesc: "Weapons",
    //   contractAddress: addresses.collectibles,
    //   title: "Simple potion",
    //   description: 'The Simple Potion has magical elements that give power to your troops. Once used, it causes irreversible damage to opponents.',
    //   image: "/images/nfts/weapon-simple-potion.png",
    // },
    {
      id: 39,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Shield",
      description: 'The Simple Shield is strong and resistant, who wield it will be much safer in a direct confrontation.',
      image: "/images/nfts/weapon-simple-shield.png",
    },
  ];
}
