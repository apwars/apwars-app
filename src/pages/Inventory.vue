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

    <v-container>
      <v-row v-if="$vuetify.breakpoint.name === 'xs'" class="war-info mb-4 text-center">
        <v-col cols="12" class="px-0">
          <h2>Resources</h2>
          <v-row class="mt-1">
            <v-col cols="12" class="d-flex py-0 justify-begin">
              <img src="/images/wgold.png" class="resources mx-0 mr-1" />
              <div class="text-left">
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

            <v-col color="12" class="d-flex justify-begin py-0">
              <img src="/images/wcourage.png" class="resources mx-0 mr-1" />
              <div class="text-left">
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

        <v-col cols="12" md="3" class="px-0 ">
          <h2>Game Items</h2>
          <v-row class="mt-1 justify-space-between">
            <v-col class="d-flex justify-begin" cols="12" md="3" xm="12">
              <img src="/images/black-market/book.png" class="resources mx-0" />
              <div class="text-left ml-2">
                <h2>{{ itemsCount }} / {{ collectibles.length }}</h2>
                <h4>Collectibles</h4>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3" class="mb-4 d-flex justify-center">
          <v-row class="mt-1 justify-space-between d-block">
            <a class="router-link" href="https://exchange.apwars.farm/">
              <wButton width="250px" class="d-flex  justify-center mt-">
                <div class="d-flex justify-center">
                  <img
                    src="/images/training-center/icon-training-center.png"
                    class="align-self-center  mr-3"
                    height="24"
                  />
                  <small class="align-self-center mr-1 ml-n1">Buy troops</small>
                </div>
              </wButton>
            </a>

            <wButton
              width="250px"
              class="d-flex  justify-center mt-1"
              @click="goTo('/black-market')"
            >
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
        <v-col cols="12" sm="7" md="6">
          <h2>Resources</h2>
          <v-row class="mt-1 ml-2">
            <v-col cols="12" sm="6" lg="5" class="d-flex pa-0">
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
            </v-col>
            <v-col cols="12" sm="6" lg="5" class="d-flex pa-0">
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
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <h2>Game Items</h2>
          <v-row class="mt-1 ml-4 justify-space-between">
            <div class="d-flex">
              <img src="/images/black-market/book.png" class="resources" />
              <div class="text-center ml-2">
                <h2>{{ itemsCount }} / {{ collectibles.length }}</h2>
                <h4>Collectibles</h4>
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="mb-4">
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

            <wButton
              width="180px"
              class="d-flex align-self-center mt-1"
              @click="goTo('/black-market')"
            >
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
    </v-container>

    <v-container>
      <v-row class="d-flex">
        <v-col cols="12" class="d-flex">
          <v-tabs v-model="tab" show-arrows>
            <v-tab>Game Items</v-tab>
            <v-tab>Resources </v-tab>
            <v-tab>Military Units</v-tab>
            <v-tab>Guardians</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-n6">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-container v-if="!isLoading && collection.length">
              <v-row :no-gutters="$vuetify.breakpoint.mobile">
                <v-col cols="12" lg="4">
                  <v-select
                    v-model="gameItemTypeFilter"
                    :items="gameItemTypesOptions"
                    label="Game Item Type"
                    multiple
                    chips
                    solo
                    outlined
                    class="filter-input"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" lg="3" v-if="gameItemTypeFilter.length">
                  <wButton @click="clearFilter()" class=" mr-3">
                    <div class="d-flex justify-center">
                      <v-icon class="mx-1">
                        mdi-minus-circle
                      </v-icon>
                      <small class="align-self-center">Clear filter</small>
                    </div>
                  </wButton>
                </v-col>
              </v-row>
            </v-container>
            <v-container :fluid="$vuetify.breakpoint.mobile" v-if="isLoading">
              <v-row>
                <v-col cols="12" class="text-center ma-6 ma-sm-0">
                  <h3 class="text-h3">Loading...</h3>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else-if="filteredCollection.length">
              <v-row>
                <v-col
                  v-for="collectible in filteredCollection"
                  :key="`${collectible.id}-${collectible.type}`"
                  sm="12"
                  md="6"
                  :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''"
                >
                  <nft-card :collectible="collectible" :myCollection="true" />
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row dense>
                {{
                  hasItems
                    ? "No items found on this filter, try to change it."
                    : "Your collection is empty"
                }}
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-container>
              <v-row>
                <v-col>
                  <table-resources
                    :balanceGold="balance"
                    :supplyGold="supplyGold"
                    :balanceCourage="balanceCOURAGE"
                    :supplyCourage="supplyCourage"
                    :balanceLand="balanceLand"
                    :supplyWland="supplyWland"
                  >
                  </table-resources>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-container>
              <v-row>
                <v-col>
                  <table-troops />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-container>
              <v-row>
                <v-col class="mt-6">
                  <guardians-approved
                    v-for="npcInfo in npcsInfo"
                    v-bind:key="npcInfo.name"
                    :guardian="npcInfo"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import Collectibles from "@/lib/eth/Collectibles";

import { NPCS, NPC_INFO } from "@/data/NPCs";

import SquareButton from "@/lib/components/ui/Utils/SquareButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import NftCard from "@/lib/components/ui/NFTCard";
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
import ProfileCard from "@/lib/components/ui/ProfileCard";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import { getCollectibles, getGameItemTypesOptions } from "@/data/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";
import wCOURAGE from "@/lib/eth/wCOURAGE";
import wLAND from "@/lib/eth/ERC20";
import NPCModal from "@/lib/components/ui/Modals/NPCModal";
import GuardiansApproved from "@/lib/components/ui/Guardians/GuardiansApproved";

import TableResources from "@/lib/components/ui/Utils/Tables/TableResources";
import TableTroops from "@/lib/components/ui/Utils/Tables/TableTroops";
import ListUnits from "../lib/components/ui/Lists/ListUnits.vue";

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
    "npc-modal": NPCModal,
    GuardiansApproved,
    TableResources,
    TableTroops,
    ListUnits,
  },
  data() {
    return {
      balance: "0",
      supplyGold: "0",
      balanceCOURAGE: "0",
      supplyCourage: "0",
      balanceLand: "",
      supplyWland: "",
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
      tab: 0,
      gameItemTypeFilter: [],
      gameItemTypesOptions: [],
      isApproveModalOpen: false,
      isLoadingApprove: false,
      collectibleContract: null,
      npcsShow: [NPCS.OTTO_DALGOR],
    };
  },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
    collection() {
      return this.collectibles
        .filter((item, i) => this.balances[i] > 0)
        .map((item, i) => {
          item.userAmount = this.balances[i];
          return item;
        });
    },
    filteredCollection() {
      if (this.gameItemTypeFilter.length > 0) {
        return this.collection.filter((c) =>
          this.gameItemTypeFilter.includes(c.typeDesc)
        );
      }
      return this.collection;
    },
    hasItems() {
      return this.collection.length > 0;
    },
    npcsInfo() {
      return this.npcsShow.map((npc) => {
        return NPC_INFO()[npc];
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
    this.gameItemTypesOptions = getGameItemTypesOptions().map((o) => ({
      text: o,
      value: o,
    }));
  },
  methods: {
    goTo(rout) {
      this.$router.push(rout);
    },
    async loadData() {
      if (!this.isConnected) {
        return;
      }
      try {
        this.collectibleContract = new Collectibles(
          this.addresses.collectibles
        );

        const wgold = new wGOLD(this.addresses.wGOLD);
        const wcourage = new wCOURAGE(this.addresses.wCOURAGE);
        const wland = new wLAND(this.addresses.wLAND);

        this.balance = await wgold.balanceOf(this.account);
        this.supplyGold = await wgold.totalSupply(this.account);

        this.balanceCOURAGE = await wcourage.balanceOf(this.account);
        this.supplyCourage = await wcourage.totalSupply(this.account);

        this.balanceLand = await wland.balanceOf(this.account);
        this.supplyWland = await wland.totalSupply();

        this.collectibles = getCollectibles();
                this.collectibles = this.collectibles.filter(
          (collectible) => {
            return !collectible.hideBlackMarket;
          }
        );
        this.balances = await Promise.all(
          this.collectibles.map((item) => {
            const collectibles = new Collectibles(item.contractAddress[this.networkInfo.id]);
            return collectibles.balanceOf(this.account, item.id);
          })
        );
        this.itemsCount = this.balances.filter((balance) => balance > 0).length;
        this.totalItems = this.balances.reduce((acc, item) => acc + item, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    clearFilter() {
      this.gameItemTypeFilter = [];
    },
  },
};
</script>
<style scoped lang="scss">
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
  background-image: url("/images/battle/bg-wars.png");
  background-repeat: repeat;
  border: 3px solid #966a3c;
  border-radius: 20px;
  padding: 0px 40px;
  margin-left: auto;
  margin-right: auto;
}
.bg {
  background-color: black;
}
.bg-inventory {
  background-image: url("/images/inventory/inventory-bg.jpg");
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

.npc-name {
  font-weight: bold;
}
.npc-text {
  font-size: 12px;
}
.npc-box {
  user-select: none;
  border-radius: 8px;
  border: 1px solid #ffb800;
}
.npc-portrait {
  width: 98px;
  height: 98px;
  border-radius: 8px;
  border: 1px solid #ffb800;
}


.col-sm-7 {
  @media only screen and (max-width: 880px) {
    flex: 0 0 65%;
    max-width: 65%;
  }

  @media only screen and (max-width: 750px) {
    flex: 0 0 75%;
    max-width: 75%;
  }

  @media only screen and (max-width: 650px) {
    flex: 0 0 85%;
    max-width: 85%;
  }
}
</style>
