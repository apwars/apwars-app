import wGOLD from "@/lib/eth/wGOLD";
import wCOURAGE from "@/lib/eth/wCOURAGE";

import Addresses from "./Addresses";
import { getCollectibleById } from "./Collectibles";

const COLLECTIBLES_CONTRACTS = Object.values(Addresses.collectibles);
const wGOLD_CONTRACTS = Object.values(Addresses.wGOLD);
const wCOURAGE_CONTRACTS = Object.values(Addresses.wCOURAGE);

export default (address) => {
  return {
    getContract: () => {
      if (wCOURAGE_CONTRACTS.includes(address)) {
        return new wCOURAGE(address);
      } else if (wGOLD_CONTRACTS.includes(address)) {
        return new wGOLD(address);
      } else {
        return null;
      }
    },
    getName: () => {
      if (wCOURAGE_CONTRACTS.includes(address)) {
        return "wCOURAGE";
      } else if (wGOLD_CONTRACTS.includes(address)) {
        return "wGOLD";
      } else {
        return null;
      }
    },
    getCollectibleById(id) {
      if (!COLLECTIBLES_CONTRACTS.includes(address)) {
        return null;
      }
      return getCollectibleById(id);
    },
  };
};
