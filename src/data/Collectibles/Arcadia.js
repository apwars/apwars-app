import store from "@/store";

export function getArcadia() {

  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [
    {
      id: "World1Stone",
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/stone.png",
      name: "Stone",
      title: "Stone",
      description: "Building resources for your village",
      hideBlackMarket: true,
    },
    {
      id: "World1Wood",
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/wood.png",
      name: "Wood",
      title: "Wood",
      description: "Building resources for your village",
      hideBlackMarket: true,
    },
    {
      id: "World1Clay",
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/clay.png",
      name: "Clay",
      title: "Clay",
      description: "Building resources for your village",
      hideBlackMarket: true,
    },
    {
      id: 74,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/5_maintenance_cost_discount.png",
      name: "5% maintenance cost discount",
      title: "5% maintenance cost discount",
      description: "This game item gives you 5% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
    {
      id: 75,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/10_maintenance_cost_discount.png",
      name: "10% maintenance cost discount",
      title: "10% maintenance cost discount",
      description: "This game item gives you 10% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
    {
      id: 74,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/5_maintenance_cost_discount.png",
      name: "5% maintenance cost discount",
      title: "5% maintenance cost discount",
      description: "This game item gives you 5% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
    {
      id: 76,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/15_maintenance_cost_discount.png",
      name: "15% maintenance cost discount",
      title: "15% maintenance cost discount",
      description: "This game item gives you 15% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
    {
      id: 77,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/20_maintenance_cost_discount.png",
      name: "20% maintenance cost discount",
      title: "20% maintenance cost discount",
      description: "This game item gives you 20% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
    {
      id: 78,
      type: "arcadia",
      typeDesc: "Arcadia",
      image: "/images/arcadia/25_maintenance_cost_discount.png",
      name: "25% maintenance cost discount",
      title: "25% maintenance cost discount",
      description: "This game item gives you 25% off on resources needed for weekly village maintenance",
      hideBlackMarket: true,
    },
  ];
}
