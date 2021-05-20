<template>
  <v-container>
    <v-row>
      <v-col cols="12" :class="$vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'">
        <game-title>Sell your NFT</game-title>
      </v-col>
    </v-row>
    <v-col
      :style="
        $vuetify.breakpoint.mdAndUp
          ? 'border-color: #966A3C; border-style: solid; border-width: 2px'
          : ''
      "
    >
      <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
        <v-col cols="12" lg="3" md="3" sm="12">
          <div class="text-center">
            <v-img class="ml-2 mr-2" max-width="200" :src="collectibles[0].image"></v-img>
            <small class="remaining">Your Amount: {{ userAmount }}</small>
          </div>
        </v-col>
        <v-col cols="12" lg="9" md="9" sm="12">
          <v-row class="d-block">
            <game-text-h-1>{{ collectibles[0].title }}</game-text-h-1>
            <div class="d-flex align-center">
              <item-price :price="collectibles[0].price" />
              <small class="remaining ml-5">Remaining: {{ remaining }} of {{ supply }}</small>
            </div>
          </v-row>
          <v-row class="d-block mt-4">
            <p>What do you want to receive in return:</p>
            <v-radio-group v-model="radios" row>
              <v-radio label="wGOLD" value="wgold"></v-radio>
              <v-radio label="NFT’s APWars" value="nft"></v-radio>
            </v-radio-group>
            <div v-if="this.radios === 'wgold'" cols="12" sm="12" md="12">
              <p>How many wGOLD do you want for this item:</p>
              <v-text-field
                v-model="priceWgold"
                type="number"
                label="Quantity:"
                outlined
              ></v-text-field>
            </div>
          </v-row>
          <v-row v-if="this.radios === 'nft'">
            <v-row>
              <v-col
                cols="12"
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'd-flex justify-space-between'
                    : 'd-block justify-space-between'
                "
              >
                <p>Select the NFT you want to receive:</p>
                <square-button
                  v-if="$vuetify.breakpoint.mdAndUp"
                  label="See all items"
                  icon="mdi-format-list-bulleted"
                  @click="goToMyCollection()"
                />
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-card
                v-scroll.self="onScroll"
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'd-flex overflow-y-auto' : 'd-block overflow-y-auto'
                "
                max-height="250"
              >
                <div
                  v-for="collectible in collectibles"
                  :key="collectible.id"
                  class="mx-auto"
                  max-width="80"
                  elevation="0"
                >
                  <div class="text-center align-center">
                    <v-img
                      width="80"
                      class="ml-1 mr-1 align-center"
                      :src="collectible.image"
                    ></v-img>
                    <v-text-field
                      v-model="priceWgold"
                      type="number"
                      label="QTY:"
                      class="ml-1 mt-1 justify-center"
                      outlined
                    ></v-text-field>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </div>
      <div
        v-if="this.radios"
        :class="
          $vuetify.breakpoint.mdAndUp ? 'd-flex justify-end mt-2' : 'd-flex justify-center mt-2'
        "
      >
        <approve-cancel class="mx-2" size="small" :@click="openInfo()">Approve</approve-cancel>
        <approve-cancel class="mx-2" size="small" @click="closeInfo()">Cancel</approve-cancel>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import SquareButton from '@/lib/components/ui/Utils/SquareButton';
import ConfirmPurchase from '@/lib/components/ui/Modals/ConfirmPurchase';

import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import GameTextH1 from '@/lib/components/ui/Utils/GameTextH1';
import ItemPrice from '@/lib/components/ui/Utils/ItemPrice';
import ApproveCancel from '@/lib/components/ui/Utils/ApproveCancel';

import { getCollectibles } from '@/data/Collectibles';

export default {
  components: {
    SquareButton,
    GameTitle,
    ConfirmPurchase,
    GameTextH1,
    ItemPrice,
    radioGroup: 1,
    SquareButton,
    ApproveCancel,
  },

  data() {
    return {
      loading: true,
      collectibles: [],
      userAmount: 0,
      remaining: 0,
      supply: 0,
      scrollInvoked: 0,
      qty: 0,
      isApproved: false,
      radios: '',
      priceWgold: null,
      showInfo: false,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    page() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
    goToMyCollection() {
      this.$router.push('/collection');
    },
    increment() {
      this.foo = parseInt(this.foo, 10) + 1;
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1;
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.loading = true;

      try {
        this.collectibles = getCollectibles().filter(collectible => !collectible.isGift);
        this.userAmount = await collectibles.balanceOf(this.account, this.collectible.id);
        this.supply = await collectibles.getMaxSupply(this.collectible.id);
        this.remaining = await collectibles.getRemaining(this.collectible.id);
        this.isApproved = await wgold.hasAllowance(this.account, this.collectible.contractAddress);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    async approve() {
      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        const res = await wgold.approve(this.account, this.collectible.contractAddress);
        console.log({ res });
        this.isApproved = await wgold.hasAllowance(this.account, this.collectible.contractAddress);
      } catch (e) {
        console.log(e);
      }
    },
    closeInfo() {
      this.showInfo = false;
    },

    openInfo() {
      this.showInfo = true;
    },
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 1px;
  border-radius: 20px;
  border-width: 2px;
  background: #966a3c;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.theme--dark.v-card {
  background-color: transparent !important;
}

.remaining {
  color: #f6ff00;
}

.btn {
  cursor: pointer;
}
</style>
