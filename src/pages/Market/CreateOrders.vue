<template>
  <div v-if="isConnected">
    <div v-if="nftCollectible.status">
      Page not found
    </div>
    <v-container class="box-create-order-title" v-else>
      <v-row>
        <v-col
          cols="12"
          :class="
            $vuetify.breakpoint.mdAndUp
              ? ''
              : 'd-flex justify-center text-center'
          "
        >
          <game-title v-if="isBuy">
            <h3>Buy a {{ nftCollectible.typeDesc }}</h3>
            <p
              :style="
                $vuetify.breakpoint.mdAndUp
                  ? 'font-size: 14px'
                  : 'font-size: 18px'
              "
            >
              Create a purchase order
            </p>
          </game-title>
          <game-title v-else class="d-block">
            <h3>Sell your {{ nftCollectible.typeDesc }}</h3>
            <p
              :style="
                $vuetify.breakpoint.mdAndUp
                  ? 'font-size: 14px'
                  : 'font-size: 18px'
              "
            >
              Create a sale order
            </p>
          </game-title>
        </v-col>
      </v-row>
      <v-row class="box-create-order ma-1 ma-sm-6 pb-6 pb-md-0">
        <v-col cols="12" lg="3" md="3">
          <v-img class="mx-auto" max-width="150" :src="nftCollectible.image" />
          <div class="text-center">
            <p
              :style="
                $vuetify.breakpoint.mdAndUp
                  ? 'font-size: 14px'
                  : 'font-size: 18px'
              "
              class="remaining"
            >
              You have: {{ userAmount }} units
            </p>
          </div>
        </v-col>
        <v-col class="mt-n6 mt-md-0" cols="12" lg="9" md="9">
          <game-text-h-1>{{ nftCollectible.title }}</game-text-h-1>
          <div>
            <p v-if="isBuy">
              How many wGOLD do you want to pay for this item?
            </p>
            <p v-else>How many wGOLD do you want for this item?</p>
            <v-currency-field
              class="mb-2"
              outlined
              label="Quantity"
              :hint="hintLabel"
              persistent-hint
              v-bind="currencyConfig"
              v-model="amount"
              @input="calcFee()"
            >
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">wGOLD</span>
                </div>
              </template>
            </v-currency-field>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'd-flex'
                  : 'd-block justify-center text-center'
              "
            >
              <p>This transaction has a fee of:</p>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'd-flex'
                    : 'd-flex justify-center text-center'
                "
              >
                <img
                  src="/images/wgold.png"
                  :class="$vuetify.breakpoint.mdAndUp ? 'ml-1' : ''"
                  height="25px"
                  alt="wGOLD"
                />
                <p>
                  <amount
                    class="align-self-center"
                    :amount="amountInfo.feeAmount"
                    decimals="2"
                    tooltip
                  />wGOLD
                </p>
              </div>
            </div>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'd-flex'
                  : 'd-block justify-center text-center'
              "
            >
              <p>{{ totalAmountDescription }} for this item:</p>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'd-flex'
                    : 'd-flex justify-center text-center'
                "
              >
                <img
                  src="/images/wgold.png"
                  :class="$vuetify.breakpoint.mdAndUp ? 'ml-1' : ''"
                  height="25px"
                  alt="wGOLD"
                />
                <p>
                  <amount
                    class="align-self-center"
                    :amount="amountInfo.totalAmount"
                    decimals="2"
                    tooltip
                  />wGOLD
                </p>
              </div>
            </div>
          </div>
          <div
            :class="
              $vuetify.breakpoint.mdAndUp
                ? 'd-flex justify-end'
                : 'd-flex flex-column justify-center'
            "
          >
            <wButton
              class="mb-2 mb-md-0 mr-0 mr-md-2"
              size="small"
              @click="$router.back()"
            >
              Go Back
            </wButton>
            <wButton
              v-if="isBuy"
              size="small"
              @click="openModal()"
              :disabled="disabledBuy"
            >
              Buy
            </wButton>
            <wButton
              v-else
              size="small"
              @click="openModal()"
              :disabled="disabledSell"
            >
              Sell
            </wButton>
          </div>
          <v-row>
            <v-col cols="12">
              <v-alert
                class="mt-3"
                v-if="amount > amountwGOLD && buyOrSell === 'buy'"
                outlined
                type="warning"
                border="left"
                dense
              >
                Quantity is greater than the available value
              </v-alert>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <market-modal
      :open="openConfirmOrderGameItem"
      :nftCollectible="nftCollectible"
      :amountInfo="amountInfo"
      :type="buyOrSell"
      :isLoading="isLoadingMarket"
      @confirm="createOrder"
      @close="openConfirmOrderGameItem = false"
    >
    </market-modal>
    <raskel-modal
      :open="raskel"
      @confirm="approve(buyOrSell)"
      @close="$router.back()"
      :isLoading="isLoadingRaskel"
    ></raskel-modal>
  </div>
</template>

<script>
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
import GameTextH1 from "@/lib/components/ui/Utils/GameTextH1";
import wButton from "@/lib/components/ui/Utils/wButton";
import Collectibles from "@/lib/eth/Collectibles";
import MarketNFTS from "@/lib/eth/MarketNFTS";
import wGOLD from "@/lib/eth/wGOLD";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Convert from "@/lib/helpers/Convert";
import Amount from "@/lib/components/ui/Utils/Amount";

import MarketModal from "@/lib/components/ui/Modals/MarketModal";
import RaskelModal from "@/lib/components/ui/Modals/RaskelModal";
import ItemPrice from "@/lib/components/ui/Utils/ItemPrice";
import { getCollectibles } from "@/data/Collectibles";

export default {
  components: {
    GameTitle,
    GameTextH1,
    MarketModal,
    ItemPrice,
    RaskelModal,
    wButton,
    Amount,
  },
  data() {
    return {
      amountwGOLD: false,
      isLoadingMarket: false,
      raskel: false,
      openConfirmOrderGameItem: false,
      buyOrSell: this.$route.params.type,
      fee: 0,
      amount: 0,
      quantity: 1,
      nftId: this.$route.params.nftId,
      loading: true,
      currencyConfig: {
        locale: "en-US",
        prefix: "",
        suffix: "",
        decimalLength: 2,
        autoDecimalMode: true,
        allowNegative: false,
      },
      collectibleContract: {},
      isApproved: false,
      userAmount: 0,
      collectible: {},
      isApprovedToken: false,
      supply: 0,
      remaining: 0,
      isLoadingRaskel: false,
      amountInfo: { amount: 0, feeAmount: 0, totalAmount: 0 },
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

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    nftCollectible() {
      const nft = getCollectibles().find(
        (collectible) => collectible.id.toString() === this.nftId.toString()
      );
      return nft !== undefined ? nft : { status: "Notfound" };
    },

    isBuy() {
      return this.buyOrSell === "buy";
    },

    totalAmountDescription() {
      if (this.isBuy) {
        return "Total price for transaction";
      }

      return "The buyer will pay";
    },

    hintLabel() {
      if (!this.amountwGOLD) {
        return `Available: Loading...`;
      }
      const label = this.isBuy ? "wGOLD" : "";
      const available = this.isBuy
        ? Convert.formatString(this.amountwGOLD)
        : `${this.userAmount} units`;
      return `Available: ${available} ${label}`;
    },

    disabledBuy() {
      return (
        this.amount === 0 ||
        this.amountwGOLD === 0 ||
        this.amountwGOLD < this.amount
      );
    },

    disabledSell() {
      return this.amount === 0 || this.userAmount === 0;
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

    currentBlockNumber() {
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
      this.collectible = getCollectibles().find((item) => {
        return item.id.toString() === this.nftId.toString();
      });
      this.collectibleContract = new Collectibles(
        this.collectible.contractAddress
      );
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
      this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.raskel = !(await this.isApprovedContract(this.buyOrSell));
      this.userAmount = await this.collectibleContract.balanceOf(
        this.account,
        this.nftId
      );
      this.fee = await this.marketNFTS.getSwapFeeRate();
      this.amountwGOLD = Convert.fromWei(
        await this.wGOLDContract.balanceOf(this.account)
      );
    },

    async getSwapFeeRate() {
      this.fee = await this.marketNFTS.getSwapFeeRate();
    },

    openModal() {
      this.openConfirmOrderGameItem = true;
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
          return await this.wGOLDContract.hasAllowance(
            this.account,
            this.addresses.marketNFTS
          );
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
          return this.wGOLDContract.approve(
            this.account,
            this.addresses.marketNFTS
          );
        },
      };
      const confirmTransaction = listApproved[type]();
      this.isLoadingRaskel = true;

      confirmTransaction.then(() => {
        ToastSnackbar.info(
          "Is waiting for your approval Raskel - The Traveler"
        );
      });

      confirmTransaction.on("error", (error) => {
        this.isLoadingRaskel = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while granting access to Raskel - The Traveller"
        );
      });

      confirmTransaction.on("receipt", () => {
        this.isLoadingRaskel = false;
        this.raskel = false;
        ToastSnackbar.success(
          "You have granted access to Raskel - The Traveler"
        );
      });

      return;
    },

    async calcFee() {
      if (this.amount === null) {
        this.amountInfo = await this.marketNFTS.getOrderAmountInfo(0);
        this.amountInfo.amount = "0";
        return;
      }
      this.amountInfo = await this.marketNFTS.getOrderAmountInfo(this.amount);
      this.amountInfo.amount = Convert.toWei(this.amount);
    },
    async createOrder() {
      this.isLoadingMarket = true;
      const confirmTransaction = this.marketNFTS.createOrder(
        this.buyOrSell === "buy" ? "0" : "1",
        this.collectible.contractAddress,
        this.collectible.id,
        this.addresses.wGOLD,
        this.amount,
        this.quantity,
        this.account
      );

      confirmTransaction.then(() => {
        this.amount = 0;
        this.calcFee();
        ToastSnackbar.info(`Waiting confirmation Raskel - The Traveler`);
      });

      confirmTransaction.on("error", (error) => {
        this.isLoadingMarket = false;

        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while error creating an order Raskel - The Traveller"
        );
      });

      confirmTransaction.on("receipt", () => {
        ToastSnackbar.success(
          "Order successfully created Raskel - The Traveler"
        );
        this.openConfirmOrderGameItem = false;
        this.isLoadingMarket = false;
      });
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

.box-create-order-title {
  width: 1280px;
}

.box-create-order {
  margin: 20px auto !important;
  width: 1280px;
  border-color: #966a3c;
  border-style: solid;
  border-width: 2px;
}

@media only screen and (max-width: 1280px) {
  .box-create-order {
    width: 100%;
  }
  .box-create-order-title {
    width: 100%;
  }
}
</style>
