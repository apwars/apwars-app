<template>
  <div>
    <div v-if="nftCollectible.status">
      Page not found
    </div>
    <v-container v-else>
      <v-row>
        <v-col cols="12" :class="$vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'">
          <game-title v-if="buyOrSell === 'buy'">
            Buy your NFT
            <p style="font-size: 14px">Create your purchase order</p>
          </game-title>
          <game-title v-else class="d-block">
            Sell your NFT
            <p style="font-size: 14px">Create your sales order</p>
          </game-title>
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
              <v-img class="ml-2 mr-2" max-width="200" :src="nftCollectible.image" />
              <small class="remaining">Your have: {{ userAmount }} units</small>
            </div>
          </v-col>
          <v-col cols="12" lg="9" md="9" sm="12">
            <v-row class="d-block">
              <game-text-h-1>{{ nftCollectible.title }}</game-text-h-1>
            </v-row>
            <v-row class="d-block">
              <small class="remaining">Supply: {{ supply }}</small>
            </v-row>
            <v-row class="d-block mt-4">
              <div cols="12" sm="12" md="12">
                <p v-if="buyOrSell === 'buy'">How many wGOLD do you want to pay for this item:</p>
                <p v-else>How many wGOLD do you want for this item:</p>
                <v-currency-field
                  color="secondary"
                  class="stake-modal-input my-n1"
                  outlined
                  label="Quantity"
                  v-bind="currencyConfig"
                  v-model="amount"
                >
                  <template v-slot:append>
                    <div class="d-flex">
                      <span class="mr-1 align-self-center">wGOLD</span>
                    </div>
                  </template>
                </v-currency-field>
              </div>
            </v-row>
          </v-col>
        </div>
        <market-modal :amount="amount" :fee="fee" :buyOrSell="buyOrSell"> </market-modal>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import GameTextH1 from '@/lib/components/ui/Utils/GameTextH1';
import Collectibles from '@/lib/eth/Collectibles';
import MarketNFTS from '@/lib/eth/MarketNFTS';
import wGOLD from '@/lib/eth/wGOLD';

import MarketModal from '@/lib/components/ui/Modals/MarketModal';

import { getCollectibles } from '@/data/Collectibles';

export default {
  components: {
    GameTitle,
    GameTextH1,
    MarketModal,
  },
  data() {
    return {
      buyOrSell: this.$route.params.type,
      fee: 0,
      amount: 0,
      nftId: this.$route.params.nftId,
      loading: true,
      currencyConfig: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        decimalLength: 2,
        autoDecimalMode: true,
        allowNegative: false,
      },
      collectibleContract: {},
      isApproved: false,
      userAmount: 0,
      collectible: {},
      isApprovedToken: false,
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

    nftCollectible() {
      const nft = getCollectibles().find(
        collectible => collectible.id.toString() === this.nftId.toString()
      );
      return nft !== undefined ? nft : { status: 'Notfound' };
    },
  },

  watch: {
    isConnected() {
      this.initData();
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
    this.initData();
    this.loadData();
  },

  methods: {
    initData() {
      if (!this.isConnected) {
        return;
      }
      this.collectible = getCollectibles().find(item => {
        return item.id.toString() === this.nftId.toString();
      });
      this.collectibleContract = new Collectibles(this.collectible.contractAddress);
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.loading = true;

      this.userAmount = await this.collectibleContract.balanceOf(this.account, this.nftId);

      this.isApproved = await this.collectibleContract.isApprovedForAll(
        this.account,
        this.addresses.marketNFTS
      );

      const wgold = new wGOLD(this.addresses.wGOLD);
      this.isApprovedToken = await wgold.hasAllowance(
        this.account,
        this.collectible.contractAddress
      );
    },

    async getSwapFeeRate() {
      this.fee = await this.marketNFTS.getSwapFeeRate();
    },
  },
};
</script>
<style scoped>
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
