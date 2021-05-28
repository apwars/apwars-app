<template>
  <div class="text-center">
    <v-dialog persistent :value="open" width="650px">
      <v-card v-if="open">
        <v-col class="d-flex justify-center align-center">
          <v-img
            v-if="$vuetify.breakpoint.mdAndUp"
            contain
            src="/images/battle/modal.png"
            :max-width="650"
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
                  <h3 v-if="!isBuy">Confirm your purchase</h3>
                  <h3 v-else>Confirm your sale</h3>
                  <game-text-h2>{{ nftCollectible.title }}</game-text-h2>
                  <div v-if="!isBuy" class="mt-1">
                    <span>You will pay</span>
                    <img
                      width="35"
                      max-width="30"
                      src="/images/wgolds.png"
                      class="mt-n1 ml-1"
                    ></img>
                    <amount class="mr-1" :amount="amountInfo.totalAmount" :decimals="2"/>wGOLD for this Game Item
                  </div>
                  <div class="mt-1" v-else>
                    You will receive
                    <img
                      width="35"
                      max-width="30"
                      src="/images/wgolds.png"
                      class="mt-n1 ml-1"
                    ></img>
                    <amount class="mr-1" :amount="amountInfo.totalAmount" :decimals="2"/> wGOLD for this Game Item
                  </div>
                  <h5 class="mt-1">
                    This transaction has a fee of
                    <img
                      width="35"
                      max-width="30"
                      src="/images/wgolds.png"
                      class="mt-n1 ml-1"
                    ></img>
                    <amount class="mr-1" :amount="amountInfo.feeAmount" :decimals="2"/>
                  </h5>
                </div>
              </v-col>
            </v-col>
            <div class="d-flex mt-n5 mr-5 justify-end">
              <wButton class="mr-2" size="small" @click="$emit('close')">
                Close
              </wButton>
              <wButton size="small" @click="$emit('confirm')">
                Confirm
              </wButton>
            </div>
          </v-img>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Amount from '@/lib/components/ui/Utils/Amount';
import wButton from '@/lib/components/ui/Utils/wButton';
import GameTextH2 from '@/lib/components/ui/Utils/GameTextH2';
import GameTextH4 from '@/lib/components/ui/Utils/GameTextH4';
import ToastSnackbar from '@/plugins/ToastSnackbar';

import Collectibles from '@/lib/eth/Collectibles';
import wGOLD from '@/lib/eth/wGOLD';

export default {
  props: ['open', 'nftCollectible', 'amountInfo', 'type'],

  components: {
    wButton,
    GameTextH2,
    GameTextH4,
    Amount,
  },

  data() {
    return {
      dialog: false,
      isApproved: false,
      isApprovedLoading: false,
      collectibleContract: {},
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
    isBuy() {
      return this.type === '0';
    },
  },

  watch: {
    open() {
      if (this.open) {
        this.initData();
        this.loadData();
      }
    },
  },

  mounted() {},

  methods: {
    initData() {
      if (this.open) {
        this.collectibleContract = new Collectibles(this.nftCollectible.nft.contractAddress);
        this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      }
    },
    async loadData() {
      this.isApproved = await this.isApprovedContract(this.type);
    },
    close() {
      this.$emit('close');
    },
    async isApprovedContract(type) {
      const listApproved = {
        sell: async () => {
          return await this.collectibleContract.isApprovedForAll(
            this.account,
            this.addresses.marketNFTS
          );
        },
        buy: async () => {
          return await this.wGOLDContract.hasAllowance(this.account, this.addresses.marketNFTS);
        },
      };
      return listApproved[type]();
    },
    approve(type) {
      const listApproved = {
        sell: () => {
          return this.collectibleContract.setApprovalForAll(
            this.addresses.marketNFTS,
            this.account
          );
        },
        buy: () => {
          return this.wGOLDContract.approve(this.account, this.addresses.marketNFTS);
        },
      };
      const confirmTransaction = listApproved[type]();
      this.isApprovedLoading = true;

      confirmTransaction.on('error', error => {
        this.isApprovedLoading = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error('Raskel - The traveler, there was a problem with your access');
      });
      confirmTransaction.on('receipt', async () => {
        this.isApprovedLoading = false;
        this.isApproved = await this.isApprovedContract(type);
        ToastSnackbar.success('Raskel - The traveler, approved your access');
      });

      return;
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 15px;
}

.v-card__title {
  color: #765e55;
  font-size: 15x !important;
  font-weight: bold !important;
}

.content {
  color: #201813;
}

.btn {
  cursor: pointer;
  width: 150px;
  float: right;
}

.card-title-modal {
  font-weight: bold !important;
  font-size: 38px !important;
  background: -webkit-linear-gradient(#ff0000, #bd0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stake-modal-input >>> .v-input__control > .v-input__slot fieldset {
  color: #a47a6a !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.stake-modal-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #32211b !important;
}

.stake-modal-input >>> .v-input__append-inner {
  color: #32211b !important;
  font-weight: bold !important;
  font-size: 13px;
}

.stake-modal-input >>> .v-icon {
  color: #32211c !important;
}

.stake-modal-input.v-input--is-disabled {
  opacity: 0.2;
}

.stake-modal-input >>> input {
  color: #32211c;
  font-weight: bold;
}

.stake-modal-input >>> .v-messages__message {
  font-size: 14px;
  color: #32211c;
  font-weight: bold;
}

.skull-flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
