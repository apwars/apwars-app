import wGOLD from '@/lib/eth/wGOLD';
import wCOURAGE from '@/lib/eth/wCOURAGE';

import { getCollectibleById } from "./Collectibles";

const COLLECTIBLES_CONTRACTS = ['0x79ab3a6f3f1627535a8774fd2feed322d58f2d02', '0x627Ee66670c897B3121954d44018A79f1FdC3320'];

export default (address) => {

    return {
      getContract: () => {
        switch (address) {
            case '0x7ab6eedd9443e0e98e5ea93667ca5b250b8dda51':
            case '0x878a44a634f2F1aa925f2A0231fdBdb5F47CF08b':
                return new wCOURAGE(address);
            case '0x5F51A3ce7f2233777328866F477E86a91CA9DdeC':
            case '0x3A5c025065a14EF9e834fBD90aeD3876a07c60EA':
                return new wGOLD(address);
        }
      },
      getName: () => {
        switch (address) {
            case '0x7ab6eedd9443e0e98e5ea93667ca5b250b8dda51':
            case '0x878a44a634f2F1aa925f2A0231fdBdb5F47CF08b':
                return 'wCOURAGE';
                case '0x5F51A3ce7f2233777328866F477E86a91CA9DdeC':
                  case '0x3A5c025065a14EF9e834fBD90aeD3876a07c60EA':
                return 'wGOLD';              
        }
      },
      getCollectibleById(id) {
        if (COLLECTIBLES_CONTRACTS.includes(address)) {
          return null;
        }
        return getCollectibleById(id) 
      }
    }
    
}