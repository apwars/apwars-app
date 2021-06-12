<template>
  <div v-if="isConnected">
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
          <v-img class="mx-auto" max-width="150" :src="nftCollectible.image" />
          <div class="text-center">
            <p class="remaining">You have: {{ userAmount }} units</p>
          </div>
        </v-col>
        <v-col class="mt-n6 mt-md-0" cols="12" lg="9" md="9">
          <game-text header="h4">{{ nftCollectible.title }}</game-text>
          <div>
            <p v-if="isBuy">
              How much wGOLD do you want to pay for this item?
            </p>
            <p v-else>How much wGOLD do you want for this item</p>
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
            <v-alert
              class="mt-3"
              v-if="amount > amountwGOLD && buyOrSell === 'buy'"
              outlined
              type="warning"
              border="left"
              dense
            >
              Your balance is less than your offer.
            </v-alert>
            <div class="mr-1 mb-2">
              This transaction has a fee of:
              <amount
                class="d-block d-md-inline-block"
                :amount="amountInfo.feeAmount"
                decimals="2"
                tooltip
                symbol="wGOLD"
                icon
              />
            </div>

            <div class="mr-1 mb-2">
              {{ totalAmountDescription }} for this item:
              <amount
                class="d-block d-md-inline-block"
                :amount="amountInfo.totalAmount"
                decimals="2"
                tooltip
                symbol="wGOLD"
                icon
              />
            </div>
            <!-- <div
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
                <amount
                  class="align-self-center mt-n2 mr-1"
                  :amount="amountInfo.feeAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </div>
            </div>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'd-flex'
                  : 'd-block justify-center text-center'
              "
            >
              <p v-if="isBuy">Total price for transaction:</p>
              <p v-else>The buyer will pay for this item:</p>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'd-flex'
                    : 'd-flex justify-center text-center'
                "
              >
                <amount
                  class="align-self-center mt-n2 mr-1"
                  :amount="amountInfo.totalAmount"
                  decimals="2"
                  tooltip
                  symbol="wGOLD"
                  icon
                />
              </div>
            </div> -->
          </div>
          <div class="d-flex flex-row-reverse mt-3 mb-n1">
            <wButton v-if="isBuy" @click="openModal()" :disabled="disabledBuy">
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
    >
      <div v-if="isBuy" class="mt-2">
        <p>
          You will pay
          <amount
            :amount="amountInfo.totalAmount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
          for this item.
        </p>
      </div>
      <div v-else>
        <p>
          You will receive
          <amount
            :amount="amountInfo.amount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
          for this item.
        </p>
      </div>

      <div v-if="isBuy">
        <p>
          Transaction fee:
          <amount
            :amount="amountInfo.feeAmount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
        </p>
        <p>
          Net amount:
          <amount
            :amount="amountInfo.amount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
        </p>
      </div>
      <div v-else>
        <p>
          Transaction fee:
          <amount
            :amount="amountInfo.feeAmount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
        </p>
        <p>
          Total amount:
          <amount
            :amount="amountInfo.totalAmount"
            :decimals="2"
            symbol="wGOLD"
            icon
          />
        </p>
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
</template>

<script>
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
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

      waitingStage: 0,
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

        confirmTransaction.on("receipt", () => {
          ToastSnackbar.success("The order has been created successfully!");
          this.openConfirmOrderGameItem = false;
          this.isLoadingMarket = false;

          this.$router.push("/");
        });
      } catch (e) {
        this.waitingStage = 0;
      }
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
