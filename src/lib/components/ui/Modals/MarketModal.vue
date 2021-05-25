<template>
  <div
    :class="$vuetify.breakpoint.mdAndUp ? 'd-flex justify-end mt-2' : 'd-flex justify-center mt-2'"
  >
    <div class="text-center">
      <v-dialog v-model="dialog" width="620">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex">
            <button>
              <v-img
                v-if="isApprovedToken"
                class="mx-auto align-center ml-2"
                max-width="160"
                src="/images/buttons/btn-default.png"
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="buyOrSell === 'buy'">Buy</span>
                <span v-else>Sell</span>
              </v-img>
              <v-img
                v-else
                class="mx-auto align-center ml-2"
                max-width="160"
                src="/images/buttons/btn-default.png"
                @click="approvewGOLD()"
              >
                Approve
              </v-img>
            </button>
            <button>
              <v-img
                class="mx-auto align-center"
                max-width="160"
                src="/images/buttons/btn-default.png"
                @click="goToMyCollection()"
              >
                Cancel
              </v-img>
            </button>
          </div>
        </template>
        <v-card>
          <v-col class="d-flex justify-center align-center">
            <v-img
              v-if="$vuetify.breakpoint.mdAndUp"
              contain
              src="/images/battle/modal.png"
              :max-width="600"
              class="align-center justify-center"
            >
              <v-col :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
                <v-col cols="12" lg="4" md="4" sm="12">
                  <div class="text-center">
                    <v-img class="" max-width="250" :src="nftCollectible.image"></v-img>
                  </div>
                </v-col>
                <v-col cols="12" lg="8" md="8" sm="12">
                  <div class="ml-n4">
                    <h3>Confirm your purchase</h3>
                    <game-text-h-2>{{ nftCollectible.title }}</game-text-h-2>
                    <h4 class="mt-1" v-if="buyOrSell === 'buy'">
                      You will pay {{ amount }}
                      wGold for this nft.
                    </h4>
                    <h4 class="mt-1" v-else>You will sell this NFT for {{ amount }} wGOLD</h4>
                    <h5>This transaction has a fee of {{ fee }}%</h5>
                  </div>
                  <div class="d-flex mt-5 ml-n4">
                    <button>
                      <v-img
                        v-if="buyOrSell === 'buy'"
                        class="mx-auto align-center text-center ml-2"
                        max-width="160"
                        src="/images/buttons/btn-default.png"
                        @click="buy()"
                      >
                        Confirm
                      </v-img>
                      <v-img
                        v-else
                        class="mx-auto align-center text-center ml-2"
                        max-width="160"
                        src="/images/buttons/btn-default.png"
                        @click="sell()"
                      >
                        Confirm
                      </v-img>
                    </button>
                    <button>
                      <v-img
                        class="mx-auto align-center text-center"
                        max-width="160"
                        src="/images/buttons/btn-default.png"
                        @click="dialog = false"
                      >
                        Cancel
                      </v-img>
                    </button>
                  </div>
                </v-col>
              </v-col>
            </v-img>
            <v-col
              v-else
              :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''"
              style="background-color: black"
            >
              <v-col cols="12" lg="4" md="4" sm="12">
                <div class="text-center">
                  <v-img class="" max-width="250" :src="nftCollectible.image"></v-img>
                  <game-text-h-4>{{ nftCollectible.title }}</game-text-h-4>
                </div>
              </v-col>
              <v-col cols="12" lg="8" md="8" sm="12">
                <div class="ml-n4">
                  <h4>Confirm your purchase</h4>
                  <h5 class="mt-1" v-if="buyOrSell === 'buy'">
                    You will pay {{ amount }}
                    wGold for this nft.
                  </h5>
                  <h5 class="mt-1" v-else>You will sell this NFT for {{ amount }} wGOLD</h5>
                  <h6 class="mt-1">This transaction has a fee of {{ fee }}%</h6>
                </div>
                <div class="d-flex mt-2">
                  <button>
                    <v-img
                      v-if="buyOrSell === 'buy'"
                      class="mx-auto align-center text-center ml-2"
                      max-width="100"
                      src="/images/buttons/btn-default.png"
                      @click="buy()"
                      style="font-size: 12px"
                    >
                      Confirm
                    </v-img>
                    <v-img
                      v-else
                      class="mx-auto align-center text-center ml-2"
                      max-width="100"
                      src="/images/buttons/btn-default.png"
                      @click="sell()"
                      style="font-size: 12px"
                    >
                      Confirm
                    </v-img>
                  </button>
                  <button>
                    <v-img
                      class="mx-auto align-center text-center"
                      max-width="100"
                      src="/images/buttons/btn-default.png"
                      @click="dialog = false"
                      style="font-size: 12px"
                    >
                      Cancel
                    </v-img>
                  </button>
                </div>
              </v-col>
            </v-col>
          </v-col>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import GameTextH2 from '@/lib/components/ui/Utils/GameTextH2';
import GameTextH4 from '@/lib/components/ui/Utils/GameTextH4';
import Collectibles from '@/lib/eth/Collectibles';
import MarketNFTS from '@/lib/eth/MarketNFTS';
import wGOLD from '@/lib/eth/wGOLD';

import { getCollectibles } from '@/data/Collectibles';

export default {
  props: ['amount', 'fee', 'buyOrSell'],

  components: {
    GameTextH2,
    GameTextH4,
  },

  data() {
    return {
      dialog: false,
      fee: 0,
      amount: 0,
      nftId: this.$route.params.nftId,
      loading: true,
      currencyConfig: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        decimalLength: 8,
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
    goToMyCollection() {
      this.$router.push('/collection');
    },

    goToSellNFT() {
      this.$router.push('/sell-nft/' + this.nftId);
    },

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

      const token = new wGOLD(this.addresses.wGOLD);
      this.isApprovedToken = await token.hasAllowance(this.account, this.addresses.marketNFTS);

      this.fee = await this.marketNFTS.getSwapFeeRate();
    },

    async approve() {
      await this.collectibleContract.setApprovalForAll(this.addresses.marketNFTS, this.account);
    },

    async approvewGOLD() {
      try {
        const token = new wGOLD(this.addresses.wGOLD);
        const res = await token.approve(this.account, this.addresses.marketNFTS);
        console.log({ res });
        this.isApprovedToken = await token.hasAllowance(this.account, this.addresses.marketNFTS);
      } catch (e) {
        console.log(e);
      }
    },

    async buy() {
      const sendAmount = window.web3.utils.toWei(this.amount.toString(), 'ether');
      await this.marketNFTS.createOrderBuy(
        this.collectible.contractAddress,
        this.collectible.id,
        this.addresses.wGOLD,
        sendAmount,
        this.account
      );
    },

    async sell() {
      const sendAmount = window.web3.utils.toWei(this.amount.toString(), 'ether');
      await this.marketNFTS.createOrderSell(
        this.collectible.contractAddress,
        this.collectible.id,
        this.addresses.wGOLD,
        sendAmount,
        this.account
      );
    },

    confirmOrder() {
      if (buyOrSell === 'Buy') {
        return buy();
      } else return sell();
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
