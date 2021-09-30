import store from "@/store";

export function getFoundations() {

  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: 58,
      type: "foundations",
      typeDesc: "Foundations",
      contractAddress: addresses.collectibles,
      image: '/images/foundations/temples.png',
      name: "temple",
      title: 'Temple',
      description: "Increase courage (15%)<br /><small><i>membership fee defined by owner</i></small>",
    },
    {
      id: 59,
      type: "foundations",
      typeDesc: "Foundations",
      contractAddress: addresses.collectibles,
      image: '/images/foundations/watchtowers.png',
      name: "watch-tower",
      title: 'Watch Tower ',
      description: "Notification of attacks and troop movements.<br /><small><i>membership fee defined by owner</i></small>",
    },
    {
      id: 60,
      type: "foundations",
      typeDesc: "Foundations",
      contractAddress: addresses.collectibles,
      image: '/images/foundations/markets.png',
      name: "market",
      title: 'Market',
      description: "Facilitate exchange between players.<br /><small><i>% of trades defined by owner</i></small>",
    },
    {
      id: 61,
      type: "foundations",
      typeDesc: "Foundations",
      contractAddress: addresses.collectibles,
      image: '/images/foundations/hidings-place.png',
      name: "hideout",
      title: 'Hideout',
      description: "Store resources to avoid looting.<br /><small><i>% of stocked resources defined by owner</i></small>",
    },
    {
      id: 62,
      type: "foundations",
      typeDesc: "Foundations",
      contractAddress: addresses.collectibles,
      image: '/images/foundations/village.png',
      name: "village",
      title: 'Village',
      description: "Manage a village.",
    },
  ];
}
