<template>
  <div>
    <div v-if="nftCollectible.status">
      Page not Found
    </div>
    <v-container v-else>
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
              <v-img class="ml-2 mr-2" max-width="200" :src="nftCollectible.image" />
              <small class="remaining">Your have: {{ userAmount }} units</small>
            </div>
          </v-col>
          <v-col cols="12" lg="9" md="9" sm="12">
            <v-row class="d-block">
              <game-text-h-1>{{ nftCollectible.title }}</game-text-h-1>
            </v-row>
            <v-row class="d-block">
              <!-- <small class="remaining">Remaining: {{ remaining }} of {{ supply }}</small> -->
            </v-row>
            <v-row class="d-block mt-4">
              <div cols="12" sm="12" md="12">
                <p>How many wGOLD do you want for this item:</p>
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
        <div
          :class="
            $vuetify.breakpoint.mdAndUp ? 'd-flex justify-end mt-2' : 'd-flex justify-center mt-2'
          "
        >
          <div class="text-center">
            <v-dialog v-model="dialog" width="620">
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex">
                  <v-img
                    v-if="isApproved"
                    class="mx-auto align-center ml-2"
                    max-width="160"
                    src="/images/buttons/btn-default.png"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>Sell</span>
                  </v-img>
                  <v-img
                    v-else
                    class="mx-auto align-center ml-2"
                    max-width="160"
                    src="/images/buttons/btn-default.png"
                    @click="approve()"
                  >
                    Approve
                  </v-img>

                  <v-img
                    class="mx-auto align-center"
                    max-width="160"
                    src="/images/buttons/btn-default.png"
                    @click="goToMyCollection()"
                  >
                    Cancel
                  </v-img>
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
                          <h4>
                            You will pay {{ amount }}
                            wGold for this nft.
                          </h4>
                          <h5>This transaction has a fee of {{ fee }} ({{ percent }})</h5>
                        </div>
                        <div class="d-flex mt-5 ml-n4">
                          <v-img
                            class="mx-auto align-center text-center ml-2"
                            max-width="160"
                            src="/images/buttons/btn-default.png"
                            @click="sell()"
                          >
                            Confirm
                          </v-img>
                          <v-img
                            class="mx-auto align-center text-center"
                            max-width="160"
                            src="/images/buttons/btn-default.png"
                            @click="dialog = false"
                          >
                            Cancel
                          </v-img>
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
                        <h5 class="mt-1">
                          You will pay {{ amount }}
                          wGold for this nft.
                        </h5>
                        <h6 class="mt-1">
                          This transaction has a fee of {{ fee }} ({{ percent }})
                        </h6>
                      </div>
                      <div class="d-flex mt-2">
                        <v-img
                          class="mx-auto align-center text-center ml-2"
                          max-width="100"
                          src="/images/buttons/btn-default.png"
                          @click="sell()"
                          style="font-size: 12px"
                        >
                          Confirm
                        </v-img>

                        <v-img
                          class="mx-auto align-center text-center"
                          max-width="100"
                          src="/images/buttons/btn-default.png"
                          @click="dialog = false"
                          style="font-size: 12px"
                        >
                          Cancel
                        </v-img>
                      </div>
                    </v-col>
                  </v-col>
                </v-col>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import GameTextH1 from '@/lib/components/ui/Utils/GameTextH1';
import GameTextH2 from '@/lib/components/ui/Utils/GameTextH2';
import GameTextH4 from '@/lib/components/ui/Utils/GameTextH4';
import ItemPrice from '@/lib/components/ui/Utils/ItemPrice';
import Collectibles from '@/lib/eth/Collectibles';
import MarketNFTS from '@/lib/eth/MarketNFTS';

import { getCollectibles } from '@/data/Collectibles';

export default {
  components: {
    GameTitle,
    GameTextH1,
    GameTextH2,
    GameTextH4,
    ItemPrice,
    radioGroup: 1,
  },
  data() {
    return {
      buyOrSell: 'sell',
      dialog: false,
      fee: 0,
      percent: 0,
      amount: 0,
      nftId: this.$route.params.nftId,
      loading: true,
      scrollInvoked: 0,
      showInfo: false,
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
    closeInfo() {
      this.showInfo = false;
    },

    openInfo() {
      this.showInfo = true;
    },

    onScroll() {
      this.scrollInvoked++;
    },

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

      this.isApproved = await this.collectibleContract.isApprovedForAll(
        this.account,
        this.addresses.marketNFTS
      );
      this.userAmount = await this.collectibleContract.balanceOf(this.account, this.nftId);
    },

    async buy() {
      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        const res = await wgold.approve(this.account, this.collectible.contractAddress);
        console.log({ res });
        this.isApproved = await wgold.hasAllowance(this.account, this.collectible.contractAddress);
      } catch (e) {
        console.log(e); //
      }
    },

    async approve() {
      await this.collectibleContract.setApprovalForAll(this.addresses.marketNFTS, this.account);
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
