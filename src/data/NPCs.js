import store from "@/store";

export const NPCS = {
  ARIMEDES: 1,
  DORA_NOBLE: 2,
  RASKEL: 3,
  LILITH: 4,
  OTTO_DALGOR: 5,
};

export function NPC_INFO() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return {
    [NPCS.ARIMEDES]: {
      name: "Arimedes - War Engineer",
      type: 'Guardians',
      portrait: "/images/war-preparation/arimedes.png",
    },
    [NPCS.DORA_NOBLE]: {
      name: "Dora Noble - The Horse Trainer",
      type: 'Guardians',
      portrait: "/images/training-center/dora-noble.png",
    },
    [NPCS.RASKEL]: {
      name: "Raskel - The traveler",
      type: 'Guardians',
      portrait: "/images/black-market/Raskel.png",
    },
    [NPCS.LILITH]: {
      name: "Lilith - The Transporter",
      type: 'Guardians',
      portrait: "/images/black-market/Lilith.png",
    },
    [NPCS.OTTO_DALGOR]: {
      name: "Otto Dalgor - Inventory Manager",
      type: 'Guardians',
      portrait: "/images/npcs/otto-dalgor.png",
      address: addresses.inventoryManager,
      description:
        `Otto Dalgor is a dwarf. Despite being very surly and annoying, he is the one who manages the inventory. 
      Careful when doing your movements, Otto Dalgor is a complainer and knows the inventory completely. 
      He is the one who owns all the files and notes.`,
      addressApprove: [
        {
          name: "Game Items",
          description: "All the items in the game, it is essential to know them all to assemble the best strategy!",
          address: addresses.collectibles,
          type: "erc1155",
          image: "/images/icons/library.png",
        }
      ]
    },
  };
}


