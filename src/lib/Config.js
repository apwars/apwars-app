import Addresses from "@/data/Addresses";

export function getSmartContractAddresses(networkId) {
  return {
    collectibles: Addresses.collectibles[networkId],
    wGOLD: Addresses.wGOLD[networkId],
    wCOURAGE: Addresses.wCOURAGE[networkId],
    FED: Addresses.FED[networkId],
    marketNFTS: Addresses.marketNFTS[networkId],
    transporter: Addresses.transporter[networkId],
    inventoryManagerCollectibles: Addresses.inventoryManagerCollectibles[networkId],
  };
}
