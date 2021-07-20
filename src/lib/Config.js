import Addresses from "@/data/Addresses";

export function getSmartContractAddresses(networkId) {
  return {
    collectibles: Addresses.collectibles[networkId],
    wGOLD: Addresses.wGOLD[networkId],
    FED: Addresses.FED[networkId],
    marketNFTS: Addresses.marketNFTS[networkId],
    transporter: Addresses.transporter[networkId],
    combinator: Addresses.combinator[networkId],
  };
}
