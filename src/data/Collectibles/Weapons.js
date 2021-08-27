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
    //   description:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //   image: "/images/nfts/weapon-simple-sword.png",
    // },
    // {
    //   id: 5,
    //   type: "weapons",
    //   typeDesc: "Weapons",
    //   contractAddress: addresses.collectibles,
    //   title: "Simple spear",
    //   description:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //   image: "/images/nfts/weapon-simple-spear.png",
    // },
    // {
    //   id: 6,
    //   type: "weapons",
    //   typeDesc: "Weapons",
    //   contractAddress: addresses.collectibles,
    //   title: "Simple potion",
    //   description:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //   image: "/images/nfts/weapon-simple-potion.png",
    // },
    {
      id: 0,
      type: "weapons",
      typeDesc: "Weapons",
      contractAddress: addresses.collectibles,
      title: "Simple Shield",
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: "/images/nfts/weapon-simple-shield.png",
    },
  ];
}
