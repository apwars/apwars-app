import Addresses from "@/data/Addresses";

export function getSmartContractAddresses(networkId) {
  return {
    collectibles: Addresses.collectibles[networkId],
    wGOLD: Addresses.wGOLD[networkId],
    FED: Addresses.FED[networkId],
    APWar: Addresses.APWar[networkId],
    WarMachine: Addresses.WarMachine[networkId]
  };
}
