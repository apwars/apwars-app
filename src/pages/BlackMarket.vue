<template>
  <div>
    
  </div>
</template>

<script>
import SquareButton from '@/lib/components/ui/Utils/SquareButton';
import GameText from '@/lib/components/ui/Utils/GameText';
import NftCard from '@/lib/components/ui/NFTCard';
import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import ProfileCard from '@/lib/components/ui/ProfileCard';

import { getCollectibles } from '@/data/Collectibles';
import Collectibles from '@/lib/eth/Collectibles';
import wGOLD from '@/lib/eth/wGOLD';

export default {
  components: {
    GameText,
    SquareButton,
    NftCard,
    GameTitle,
    ProfileCard,
  },

  data() {
    return {
      balance: 0,
      balanceFED: 0,
      priceWGOLD: 0,
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
    }
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters['user/addresses'];
    },

    networkInfo() {
      return this.$store.getters['user/networkInfo'];
    },

    currentBlockNumber() {
      return this.$store.getters['user/currentBlockNumber'];
    },

    formattedAmount() {
      const num = parseInt(this.balance);

      if (this.balance < 1) {
        return '~0';
      } else if(num > 999 && num < 1000000){
          return (num/1000).toFixed(2) + 'K'; 
      } else if(num > 1000000){
          return (num/1000000).toFixed(2) + 'M'
      } else if(num < 900){
          return num;
      }
    },

    collection() {
      return this.collectibles.filter((item, i) => this.balances[i] > 0).map((item, i) => {
        item.userAmount = this.balances[i];
        return item;
      })
    }
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToStore() {
      this.$router.push('/');
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        this.isLoading = true;
        const wgold = new wGOLD(this.addresses.wGOLD);
        this.balance = web3.utils.fromWei(await wgold.balanceOf(this.account));
        this.balanceFED = web3.utils.fromWei(await wgold.balanceOf(this.addresses.FED));
        this.priceWGOLD = await wgold.priceWGOLD();

        this.collectibles = getCollectibles();
        
        this.balances = await Promise.all(this.collectibles.map(item => {
          const collectibles = new Collectibles(item.contractAddress);
          return collectibles.balanceOf(this.account, item.id);
        }));

        console.log(this.account, this.collectibles.length, this.balances.length);

        this.itemsCount = this.balances.filter(balance => balance > 0).length;
        this.totalItems = this.balances.reduce((acc, item) => acc + item, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>
