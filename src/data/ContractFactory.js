import wGOLD from '@/lib/eth/wGOLD';
import wCOURAGE from '@/lib/eth/wCOURAGE';

import { getCollectibleById } from "./Collectibles";

export default (address) => {

    return {
      getContract: () => {
        switch (address) {
            case '0x878a44a634f2F1aa925f2A0231fdBdb5F47CF08b':
                return new wCOURAGE(address);
            case '0x3A5c025065a14EF9e834fBD90aeD3876a07c60EA':
                return new wGOLD(address);
        }
      },
      getName: () => {
        switch (address) {
            case '0x878a44a634f2F1aa925f2A0231fdBdb5F47CF08b':
                return 'wCOURAGE';
            case '0x3A5c025065a14EF9e834fBD90aeD3876a07c60EA':
                return 'wGOLD';              
        }
      },
      getCollectibleById(id) {
        if (address !== '0x3fdE3A5FbC76b4AaB5955ed091DfcE2f84fA3Fb0') {
          return null;
        }
        return getCollectibleById(id) 
      }
    }
    
}