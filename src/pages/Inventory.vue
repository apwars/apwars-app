<template>
  <div class="bg">
    <div class="bg-inventory">
      <v-container class="pb-0">
        <page-title
          class="p-0"
          title="Inventory"
          description="Build your strategy always according to your inventory, it will bring you more success!"
          image="/images/inventory/flag.png"
          titleImg="Wallet"
          :subtitleImg="account"
        />
      </v-container>
    </div>

    <v-row v-if="$vuetify.breakpoint.mobile" class="war-info mb-4 ">
      <v-col cols="12" md="6" xm="12" class="px-0">
        <h2>Resources</h2>
        <v-row class="mt-1">
          <v-col class="d-flex py-0 justify-begin" >
            <img src="/images/wgold.png" class="resources ml-0 mr-2" />
            <div class="text-center">
              <amount
                v-if="isConnected"
                :amount="balance"
                decimals="3"
                compact
                tooltip
                :size="28"
              />
              <h4>wGOLD</h4>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6" xm="12">
        <v-row>
          <v-col class="d-flex justify-begin px-0">
            <img src="/images/wcourage.png" class="resources mx-0" />
            <div class="text-center">
              <amount
                v-if="isConnected"
                :amount="balanceCOURAGE"
                decimals="3"
                compact
                tooltip
                :size="28"
              />
              <h4>wCOURAGE</h4>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="3" xm="12" class="px-0 ">
        <h2>Game Items</h2>
        <v-row class="mt-1 justify-space-between">
          <v-col class="d-flex justify-begin" cols="12" md="3" xm="12">
            <img src="/images/black-market/book.png" class="resources mx-0" />
            <div class="text-center ml-2">
              <h2>{{ totalItems }} / {{ collectibles.length }}</h2>
              <h4>Collectibles</h4>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" xm="12" class="mb-4 d-flex justify-center">
        <v-row class="mt-1 justify-space-between d-block">
          <a class="router-link" href="https://exchange.apwars.farm/">
            <wButton width="250px" class="d-flex  justify-center mt-">
              <div class="d-flex justify-center">
                <img
                  src="/images/training-center/icon-training-center.png"
                  class="align-self-center mr-3"
                  height="24"
                />
                <small class="align-self-center mr-1 ml-n1">Buy troops</small>
              </div>
            </wButton>
          </a>

          <wButton width="250px" class="d-flex  justify-center mt-1" @click="goTo('/black-market')">
            <div class="d-flex justify-center">
              <img
                src="/images/black-market/black-market.png"
                class="align-self-center"
                height="24"
              />
              <small class="align-self-center ml-1">Black Market</small>
            </div>
          </wButton>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else class="war-info mb-4">
      <v-col cols="12" md="6" sm="12">
        <h2>Resources</h2>
        <v-row class="mt-1 ml-4">
          <div class="d-flex">
            <img src="/images/wgold.png" class="resources" />
            <div class="text-center">
              <amount
                v-if="isConnected"
                :amount="balance"
                decimals="3"
                compact
                tooltip
                :size="28"
              />
              <h4>wGOLD</h4>
            </div>
          </div>
          <div class="d-flex ml-4">
            <img src="/images/wcourage.png" class="resources" />
            <div class="text-center">
              <amount
                v-if="isConnected"
                :amount="balanceCOURAGE"
                decimals="3"
                compact
                tooltip
                :size="28"
              />
              <h4>wCOURAGE</h4>
            </div>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <h2>Game Items</h2>
        <v-row class="mt-1 ml-4 justify-space-between">
          <div class="d-flex">
            <img src="/images/black-market/book.png" class="resources" />
            <div class="text-center ml-2">
              <h2>{{ totalItems }} / {{ collectibles.length }}</h2>
              <h4>Collectibles</h4>
            </div>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" class="mb-4">
        <v-row class="mt-1 ml-4 justify-space-between d-block">
          <a class="router-link" href="https://exchange.apwars.farm/">
            <wButton width="180px" class="d-flex align-self-center mt-1">
              <div class="d-flex justify-center">
                <img
                  src="/images/training-center/icon-training-center.png"
                  class="align-self-center mr-3"
                  height="24"
                />
                <small class="align-self-center mr-1 ml-n1">Buy troops</small>
              </div>
            </wButton>
          </a>

          <wButton width="180px" class="d-flex align-self-center mt-1" @click="goTo('/black-market')">
            <div class="d-flex justify-center">
              <img
                src="/images/black-market/black-market.png"
                class="align-self-center"
                height="24"
              />
              <small class="align-self-center ml-1">Black Market</small>
            </div>
          </wButton>
        </v-row>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="d-flex">
        <v-col
          cols="12"
          lg="6"
          xl="4"
          class="d-flex">
          <v-tabs v-model="tab">
            <v-tab>Game Items</v-tab>
            <v-tab>My Troops</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="collection.length > 0 && tab === 0">
      <v-row dense>
        <v-col v-for="collectible in collection" :key="collectible.id" cols="12" md="6">
          <nft-card :collectible="collectible" :myCollection="true" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="collection.length === 0 && !isLoading">
      <v-row dense>
        Your collection is empty
      </v-row>
    </v-container>
    <list-units v-if="tab === 1"></list-units>
  </div>
</template>

<script>
import SquareButton from '@/lib/components/ui/Utils/SquareButton';
import GameText from '@/lib/components/ui/Utils/GameText';
import NftCard from '@/lib/components/ui/NFTCard';
import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import ProfileCard from '@/lib/components/ui/ProfileCard';
import wButton from '@/lib/components/ui/Buttons/wButton';
import Amount from '@/lib/components/ui/Utils/Amount';
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

import PageTitle from '@/lib/components/ui/Utils/PageTitle.vue';

import { getCollectibles } from '@/data/Collectibles';
import Collectibles from '@/lib/eth/Collectibles';
import wGOLD from '@/lib/eth/wGOLD';
import wCOURAGE from '@/lib/eth/wCOURAGE';

export default {
  components: {
    GameText,
    SquareButton,
    NftCard,
    GameTitle,
    ProfileCard,
    PageTitle,
    wButton,
    Amount,
    ListUnits,
  },

  data() {
    return {
      balance: '0',
      balanceCOURAGE: '0',
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
      tab: 0,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
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

    collection() {
      return this.collectibles
        .filter((item, i) => this.balances[i] > 0)
        .map((item, i) => {
          item.userAmount = this.balances[i];
          return item;
        });
    },
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
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    /* openNewTab(obj) {
      window.open(obj);
    }, */

    goTo(rout) {
      this.$router.push(rout);
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        this.isLoading = true;
        const wgold = new wGOLD(this.addresses.wGOLD);
        const wcourage = new wCOURAGE(this.addresses.wCOURAGE);

        this.balance = await wgold.balanceOf(this.account);

        this.balanceCOURAGE = await wcourage.balanceOf(this.account);

        this.collectibles = getCollectibles();

        this.balances = await Promise.all(
          this.collectibles.map(item => {
            const collectibles = new Collectibles(item.contractAddress);
            return collectibles.balanceOf(this.account, item.id);
          })
        );

        this.itemsCount = this.balances.filter(balance => balance > 0).length;
        this.totalItems = this.balances.reduce((acc, item) => acc + item, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
.resources {
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
}
.title {
  font-size: 100px;
}
.war-info {
  background-image: url('/images/battle/bg-wars.png');
  background-repeat: repeat;
  border: 3px solid #966a3c;
  border-radius: 20px;
  padding: 0px 40px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.bg{
  background-color: black;
}
.bg-inventory {
  background-image: url('/images/inventory/inventory-bg.jpg');
  background-size: cover;
  background-position: top;
}

.img-black-market {
  width: 100%;
}

.h1-black-market {
  background: linear-gradient(180deg, #f6ff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 78px;
  line-height: 101px;
}
.description-black-market {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
}

@media only screen and (max-width: 600px) {
  .description-black-market {
    font-size: 13px;
    line-height: 16px;
  }
  .h1-black-market {
    font-size: 32px;
    line-height: 36px;
  }
  .bg-inventory {
    background-size: contain;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}

.router-link {
  text-decoration: none;
  color: #fff;
}

</style>
