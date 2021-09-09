<template>
  <div v-if="isConnected">
    <div v-if="isLoading">
      <v-row>
        <v-col cols="12">
          <h3 class="text-h3 my-6 text-center">Loading...</h3>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <div v-if="nftCollectible.status">
        Item not found
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
                Create a buy order
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
                Create a sell order
              </p>
            </game-title>
          </v-col>
        </v-row>
        <v-row class="box-create-order ma-1 ma-sm-6">
          <v-col cols="12" lg="3" md="3">
            <v-img
              class="mx-auto"
              max-width="150"
              :src="nftCollectible.image"
            />
            <div class="text-center">
              <p class="remaining">You have: {{ userAmount }} units</p>
            </div>
          </v-col>
          <v-col class="mt-n6 mt-md-0" cols="12" lg="9" md="9">
            <game-text header="h4">{{ nftCollectible.title }}</game-text>
            <div>
              <p v-if="isBuy">
                How many items do you want to buy?
              </p>
              <p v-else>How many items do you want to sell?</p>
              <v-row>
                <v-col cols="12" md="3">
                  <number-field
                    class="mt-n1"
                    v-model="quantity"
                    :max="maxAmount"
                    @input="calcFee()"
                  ></number-field>
                </v-col>
              </v-row>
            </div>
            <div class="mt-n5">
              <p v-if="isBuy">
                How much wGOLD do you want to pay for each item?
              </p>
              <p v-else>How much wGOLD do you want for each item?</p>
              <v-currency-field
                class="mt-n1"
                outlined
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
              <v-alert
                v-if="
                  (amount > amountwGOLD && buyOrSell === 'buy') ||
                    (calcAmountComputed > amountwGOLD && buyOrSell === 'buy')
                "
                outlined
                type="warning"
                border="left"
                dense
              >
                Your balance wGOLD is less than your offer.
              </v-alert>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'
                "
              >
                This transaction has a fee per item of:
                <amount
                  class="d-block d-md-inline-block"
                  :amount="amountInfo.feeAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </div>

              <div
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'
                "
              >
                {{ totalAmountDescription }}
                <amount
                  class="d-block d-md-inline-block"
                  :amount="amountInfo.totalAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </div>
              <h4
                v-if="isBuy"
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'
                "
              >
                You will pay for {{ quantity }} items:
                <amount
                  class="d-block d-md-inline-block"
                  :amount="amountInfo.calcAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </h4>
              <h4
                v-else
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'
                "
              >
                You will receive for {{ quantity }} items:
                <amount
                  class="d-block d-md-inline-block"
                  :amount="amountInfo.calcAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </h4>
            </div>
            <div class="d-flex flex-row-reverse mt-3 mb-n1">
              <wButton
                v-if="isBuy"
                @click="openModal()"
                :disabled="disabledBuy"
              >
                Buy
              </wButton>
              <wButton v-else @click="openModal()" :disabled="disabledSell">
                Sell
              </wButton>
              <wButton class="mr-1" @click="$router.back()">
                Go Back
              </wButton>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <game-item-wood-modal
        :open="openConfirmOrderGameItem"
        :isLoading="isLoadingMarket"
        :waitingStage="waitingStage"
        @close="openConfirmOrderGameItem = false"
        @confirm="createOrder"
        :imageUrl="nftCollectible.image"
        :gameItemTitle="nftCollectible.title"
        title="Are you sure you want to create this order?"
        :amount="userAmount"
      >
        <div v-if="isBuy" class="mt-n1">
          <p :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mt-n1' : 'mt-1'">
            Net amount per item:
            <amount
              :amount="amountInfo.amount"
              :decimals="2"
              symbol="wGOLD"
              icon
            />
          </p>
          <p :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mt-n1' : 'mt-1'">
            Transaction fee per item:
            <amount
              :amount="amountInfo.feeAmount"
              :decimals="2"
              symbol="wGOLD"
              icon
            />
          </p>

          <div v-if="isBuy" class="mt-2">
            <p :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : 'mt-1'">
              You will pay per item:
              <amount
                :amount="amountInfo.totalAmount"
                :decimals="2"
                symbol="wGOLD"
                icon
              />
            </p>
          </div>
          <div v-else>
            <p :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : 'mt-1'">
              You will receive per item:
              <amount
                :amount="amountInfo.amount"
                :decimals="2"
                symbol="wGOLD"
                icon
              />
            </p>
          </div>
          <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : 'mt-1'">
            You will pay for {{ quantity }} items:
            <amount
              class="d-block d-md-inline-block"
              :amount="amountInfo.calcAmount"
              decimals="2"
              tooltip
              symbol="wGOLD"
              icon
            />
          </h4>
        </div>
        <div v-else>
          <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : 'mt-1'">
            You will receive for {{ quantity }} items:
            <amount
              :amount="amountInfo.calcAmount"
              :decimals="2"
              symbol="wGOLD"
              icon
            />
          </h4>
        </div>
      </game-item-wood-modal>

      <raskel-modal
        :open="raskel"
        @confirm="approve(buyOrSell)"
        @close="$router.back()"
        :isLoading="isLoadingRaskel"
        text="To work for you and create this order, I need to receive approval to trade your items. You can trust me, my fellow!"
      ></raskel-modal>
    </div>
  </div>
</template>

<script>
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
import NumberField from "@/lib/components/ui/Utils/NumberField";
import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Collectibles from "@/lib/eth/Collectibles";
import MarketNFTS from "@/lib/eth/MarketNFTS";
import wGOLD from "@/lib/eth/wGOLD";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Convert from "@/lib/helpers/Convert";
import Amount from "@/lib/components/ui/Utils/Amount";

import GameItemWoodModal from "@/lib/components/ui/Modals/GameItemWoodModal";
import RaskelModal from "@/lib/components/ui/Modals/RaskelModal";
import ItemPrice from "@/lib/components/ui/Utils/ItemPrice";
import { getCollectibles } from "@/data/Collectibles";

export default {
  components: {
    NumberField,
    GameTitle,
    GameText,
    GameItemWoodModal,
    ItemPrice,
    RaskelModal,
    wButton,
    Amount,
  },
  data() {
    return {
      isLoading: true,
      amountwGOLD: false,
      isLoadingMarket: false,
      raskel: false,
      openConfirmOrderGameItem: false,
      buyOrSell: this.$route.params.type,
      fee: 0,
      amount: 0,
      quantity: 0,
      nftId: this.$route.params.nftId,
      loading: true,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
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
      amountInfo: { amount: 0, feeAmount: 0, totalAmount: 0, calcAmount: 0 },
      waitingStage: 0,
      alert: false,
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
        return "Total price for transaction per item:";
      }

      return "The buyer will pay per item";
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
        this.amountwGOLD < this.amount ||
        (this.calcAmountComputed > this.amountwGOLD &&
          this.buyOrSell === "buy") ||
        this.quantity === 0
      );
    },

    disabledSell() {
      return this.amount === 0 || this.userAmount === 0 || this.quantity === 0;
    },

    calcAmountComputed() {
      return parseInt(Convert.fromWei(this.amountInfo.calcAmount));
    },

    maxAmount() {
      return this.isBuy ? Number.MAX_SAFE_INTEGER : this.userAmount;
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
      this.isLoading = false;
    },

    async getSwapFeeRate() {
      this.fee = await this.marketNFTS.getSwapFeeRate();
    },

    openModal() {
      this.openConfirmOrderGameItem = true;
    },

    delay() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 4000);
      });
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
        this.amountInfo.calcAmount = 0;
        return;
      }
      this.amountInfo = await this.marketNFTS.getOrderAmountInfo(this.amount);
      this.amountInfo.amount = Convert.toWei(this.amount);
      const totalAmount = Convert.fromWei(this.amountInfo.totalAmount);

      this.amountInfo.calcAmount = this.isBuy
        ? Convert.toWei(totalAmount * this.quantity)
        : Convert.toWei(this.amount * this.quantity);
    },

    quantityIsLess() {
      if (!this.isBuy) {
        if (this.quantity <= this.userAmount) {
          return (this.alert = true);
        } else {
          return (this.alert = false);
        }
      } else {
        return (this.alert = true);
      }
    },

    async createOrder() {
      try {
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

        this.waitingStage = 1;

        confirmTransaction.on("transactionHash", () => {
          this.waitingStage = 2;
        });

        confirmTransaction.on("error", (error) => {
          this.waitingStage = 0;
          this.isLoadingMarket = false;
          this.openConfirmOrderGameItem = false;

          if (error.message) {
            return ToastSnackbar.error(error.message);
          }

          return ToastSnackbar.error(
            "An error has occurred while creating the order!"
          );
        });

        confirmTransaction.on("receipt", async () => {
          await this.delay();
          ToastSnackbar.success("The order has been created successfully!");
          this.openConfirmOrderGameItem = false;
          this.isLoadingMarket = false;

          this.$router.push("/black-market");
        });
      } catch (e) {
        this.waitingStage = 0;
      }
    },

    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
        this.$emit("change", this.quantity);
        this.calcFee();
      }
    },

    increment() {
      this.quantity++;
      this.$emit("change", this.quantity);
      this.calcFee();
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
