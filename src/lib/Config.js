import Addresses from "@/data/Addresses";

export function getSmartContractAddresses(networkId) {
  return {
    collectibles: Addresses.collectibles[networkId],
    wGOLD: Addresses.wGOLD[networkId]
  };
}
