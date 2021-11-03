import Addresses from '../Addresses';

export function getWeapons() {

  return [
    {
      id: 4,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: Addresses.collectibles,
      title: "Simple sword",
      description: 'The Simples Sword can be used by your troops in direct conflict with enemies. And it will give you the initial strength to conquer your path to victory.',
      image: "/images/nfts/weapon-simple-sword.png",
      icon: "simple-sword"
    },
    {
      id: 5,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: Addresses.collectibles,
      title: "Simple spear",
      description: 'The Simple Spear is sharp and can be used from a distance causing great damage to the enemy team.',
      image: "/images/nfts/weapon-simple-spear.png",
      icon: "simple-spear"
    },
    {
      id: 6,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: Addresses.collectibles,
      title: "Simple potion",
      description: 'The Simple Potion has magical elements that give power to your troops. Once used, it causes irreversible damage to opponents.',
      image: "/images/nfts/weapon-simple-potion.png",
      icon: "simple-potion",
    },
    {
      id: 39,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: Addresses.collectibles,
      title: "Simple Shield",
      description: 'The Simple Shield is strong and resistant, who wield it will be much safer in a direct confrontation.',
      effectDescription: "It improves defense points of units by 1",
      image: "/images/nfts/weapon-simple-shield.png",
      icon: "simple-shield",
    },
  ];
}

export const TIER_WEAPONS = {
  1: 39,
  2: 4,
  3: 6,
  4: 5
}