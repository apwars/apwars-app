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
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: "/images/nfts/weapon-simple-shield.png",
    },
  ];
}
