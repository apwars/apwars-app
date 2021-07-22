<template>
  <div>
    <v-card width="100%" class="card-table-black-market elevation-0">
      <v-card-title>
        <h4 class="text-h4" v-if="!isBuy">Items for sale</h4>
        <h4 class="text-h4" v-else>Wanted items</h4>
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="showMyOrders"
          @change="loadData(1, true)"
          label="Show only my orders"
          color="primary"
        ></v-checkbox>
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="table-black-market elevation-0"
          :headers="headers"
          :items="listMarket"
          :items-per-page="itemsPerPage"
          :loading="isLoading"
          :loading-text="loadingText"
          :server-items-length="totalItems"
          :page="page"
          @update:page="loadData"
          @update:sort-by="sortBy"
          @update:sort-desc="sortDesc"
          @update:items-per-page="updateItemsPerPage"
          :footer-props="{
            'items-per-page-options': [5, 10, 20],
          }"
          nonwrap
        >
          <template v-slot:[`item.sender`]="{ item }">
            <v-address :address="item.sender" link tooltip></v-address>
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            <span>
              {{ new Date(item.createdAt).toLocaleString() }}
            </span>
          </template>
          <template v-slot:[`item.nft.title`]="{ item }">
            <div class="d-flex">
              <img
                :src="item.nft.image"
                class="align-self-center my-1"
                width="30px"
                :alt="item.nft.title"
              />
              <span class="ml-1 align-self-center">
                {{ item.nft.title }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.quantity`]="{ item }">
            <div class="text-center">
              {{ item.quantity }}
            </div>
          </template>
          <template v-slot:[`item.formattedAmount`]="{ item }">
            <div>
              <amount
                :amount="item.amountOrder"
                decimals="2"
                formatted
                tooltip
                symbol="wGOLD"
                icon
              />
            </div>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <div class="d-flex justify-end my-2">
              <wButton
                v-if="item.sender.toLowerCase() == account.toLowerCase()"
                @click="openModalCancelOrder(item)"
              >
                <div class="d-flex justify-center">
                  <v-icon color="red darken-2">
                    mdi-close-circle-outline
                  </v-icon>
                  <div class="ml-1 align-self-center">cancel</div>
                </div>
              </wButton>
              <wButton class="ml-1" @click="openModal(item)">
                <div class="d-flex justify-center">
                  <img
                    :src="`/images/buttons/btn-icon-${item.orderTypeDesc.toLowerCase()}.svg`"
                    class="mx-1 align-self-center"
                    :height="getSizeIcon(item.orderTypeDesc)"
                  />
                  <div class="align-self-center">{{ item.orderTypeDesc }}</div>
                </div>
              </wButton>
            </div>
          </template>
        </v-data-table>
        <game-item-wood-modal
          :open="isConfirmOrderModalOpen"
          :imageUrl="nftCollectible.nft.image"
          :gameItemTitle="nftCollectible.nft.title"
          :isLoading="isLoadingConfirm"
          @confirm="executeOrder"
          @close="isConfirmOrderModalOpen = false"
          :waitingStage="confirmOrderWaitingStage"
          :title="confirmOrderModalTitle"
          :disabledBuy="!hasQuantity"
          :amount="balanceItem"
        >
          <p v-if="isBuy">
            How many items do you want to sell?
          </p>
          <p v-else>How many items do you want to buy?</p>
          <v-row>
            <v-col cols="12" md="6">
              <number-field
                class="mt-n1"
                v-model="quantity"
                :max="nftCollectible.quantity"
              ></number-field>
            </v-col>
          </v-row>
          <div class="mt-n6" v-if="hasQuantity">
            <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
              <span v-if="!isBuy">You will pay per item:</span>
              <span v-else>You will receive per item:</span>
              <amount
                :amount="nftCollectible.amountOrder"
                formatted
                decimals="2"
                tooltip
                title="wGOLD"
                symbol="wGOLD"
                icon
              />
            </h4>
            <h4 v-if="!isBuy" :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'">
              You will pay for {{ quantity }} items:
              <amount
                class="d-block d-md-inline-block"
                :amount="calcAmountFee"
                decimals="2"
                tooltip
                symbol="wGOLD"
                icon
              />
            </h4>
            <h4 v-else :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'">
              You will receive for {{ quantity }} items:
              <amount
                class="d-block d-md-inline-block"
                :amount="calcAmountFee"
                decimals="2"
                tooltip
                symbol="wGOLD"
                icon
              />
            </h4>
          </div>
          <v-alert class="mb-2" outlined v-if="!hasQuantity" type="warning" border="left" dense>
            {{ textAlert }}
          </v-alert>
        </game-item-wood-modal>

        <raskel-modal
          :open="openCancelOrderGameItem"
          :isLoading="isLoadingCancel"
          :text="raskelCancelText"
          @confirm="cancelOrder"
          @close="openCancelOrderGameItem = false"
        ></raskel-modal>

        <raskel-modal
          :open="isRaskelApprovalModalOpen"
          :isLoading="isLoadingApproveRaskel"
          :text="raskelApproveText"
          @confirm="approve(nftCollectible.orderTypeDesc)"
          @close="isRaskelApprovalModalOpen = false"
        ></raskel-modal>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Amount from '@/lib/components/ui/Utils/Amount';
import NumberField from '@/lib/components/ui/Utils/NumberField';
import VAddress from '@/lib/components/ui/Utils/VAddress';
import wButton from '@/lib/components/ui/Buttons/wButton';
import GameItemWoodModal from '@/lib/components/ui/Modals/GameItemWoodModal';
import RaskelModal from '@/lib/components/ui/Modals/RaskelModal';
import ToastSnackbar from '@/plugins/ToastSnackbar';

import Convert from '@/lib/helpers/Convert';

import OrdersController from '@/controller/OrdersController';

import MarketNFTS from '@/lib/eth/MarketNFTS.js';
import Collectibles from '@/lib/eth/Collectibles';
import wGOLD from '@/lib/eth/wGOLD';

const RASKEL_DEFAULT_APPROVE_TEXT =
  'To work for you and execute this order, I need to receive approval to trade your items. You can trust me, my fellow!';
const RASKEL_DEFAULT_CANCEL_TEXT =
  'If you cancel this offer I will not receive any fee! Are you sure about that? I am working for nothing!';
const RASKEL_WAITING_WALLET_APPROVAL = 'I am waiting for the approval in your precious wallet...';
const RASKEL_CANCEL_WAITING_FIRST_CONFIRMATION =
  'Next time, think more about using my service and not waste my time with unnecessary orders! I am waiting for the first blockchain confirmation...';
const RASKEL_WAITING_FIRST_CONFIRMATION =
  'Thank you for trust me my fellow, I am waiting for the first blockchain confirmation...';

export default {
  props: ['type'],
  components: {
    VAddress,
    Amount,
    wButton,
    GameItemWoodModal,
    RaskelModal,
    NumberField,
  },

  data() {
    return {
      showMyOrders: false,
      amountwGOLD: 0,
      balanceItem: 0,
      isRaskelApprovalModalOpen: false,
      isLoadingApproveRaskel: false,
      nftCollectible: {
        nft: {},
      },
      isEndLoading: false,
      isConfirmOrderModalOpen: false,
      openCancelOrderGameItem: false,
      isLoadingConfirm: false,
      isLoadingCancel: false,
      marketNFTS: {},
      itemsPerPage: 5,
      totalItems: 0,
      lastIndex: undefined,
      page: 1,
      quantity: 0,
      isLoading: true,
      loadingText: 'Loading... Please wait',
      dataMarket: [],
      sort: 'orderId:-1',
      headers: [
        {
          text: 'Player',
          value: 'sender',
          width: '15%',
          sortable: true,
        },
        { text: 'Date', value: 'createdAt', width: '15%', sortable: false },
        {
          text: "Game Item",
          value: "nft.title",
          width: "20%",
          sortable: true,
        },
        { text: "Type", value: "nft.typeDesc", width: "10%", sortable: false },
        {
          text: 'Quantity',
          value: 'quantity',
          width: '15%',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Price/Unit',
          value: 'formattedAmount',
          width: '15%',
          sortable: true,
        },
        { text: '', value: 'action', width: '20%', sortable: false },
      ],

      raskelCancelText: RASKEL_DEFAULT_CANCEL_TEXT,
      raskelApproveText: RASKEL_DEFAULT_APPROVE_TEXT,

      confirmOrderWaitingStage: 0,

      amountInfo: { amount: 0, feeAmount: 0, totalAmount: 0, calcAmount: 0 },
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

    confirmOrderModalTitle() {
      return !this.isBuy
        ? 'Are you sure you want to buy this item?'
        : 'Are you sure you want to sell this item?';
    },

    textAlert() {
      if (this.quantity < 1) {
        return 'Put an amount greater than 0 to sell the item';
      } else {
        return this.nftCollectible.orderTypeDesc.toLowerCase() === 'buy'
          ? 'Your balance wGOLD is less than your offer.'
          : 'Your balance for this Item is less than the offer';
      }
    },

    hasQuantity() {
      if (this.nftCollectible.amountOrder === undefined) {
        return false;
      }

      if (!this.isBuy) {
        const amountOrder = this.nftCollectible.amountOrder * this.quantity;
        return amountOrder > this.amountwGOLD ? false : true;
      } else {
        if (this.quantity < 1) {
          return false;
        } else {
          return this.balanceItem > 0 ? true : false;
        }
      }
    },

    listMarket() {
      if (this.dataMarket === undefined || this.dataMarket.length === 0) {
        return [];
      }

      return this.dataMarket.filter(item => {
        item.openModal = false;
        if (item.orderType == this.typeEnum) {
          item.orderTypeDesc = this.typeEnum === '1' ? 'buy' : 'sell';
          item.amountOrder =
            this.typeEnum == '0'
              ? item.formattedAmount
              : item.formattedAmount + item.formattedFeeAmount;
          return item;
        }
      });
    },

    isBuy() {
      return this.type === 'buy';
    },

    typeEnum() {
      return this.type === 'buy' ? '0' : '1';
    },

    playerColumnTitle() {
      return this.type === 'sell' ? 'Seller' : 'Buyer';
    },

    calcAmountFee() {
      return Convert.toWei(this.nftCollectible.amountOrder * this.quantity);
    },
  },

  watch: {
    isConnected() {
      if (this.isConnected) {
        this.initData();
        this.loadData(this.page);
      }
    },
    // currentBlockNumber() {
    //   if (this.isConnected && !this.isLoading) {
    //     this.loadData(this.page, false);
    //   }
    // },
  },

  mounted() {
    this.initData();
    this.loadData(this.page);
  },

  methods: {
    initData() {
      if (!this.isConnected) {
        return;
      }
      this.headers[0].text = this.playerColumnTitle;
      this.collectibleContract = new Collectibles(this.addresses.collectibles);
      this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      this.marketNFTS = new MarketNFTS(this.addresses.marketNFTS);
    },

    async loadData(page, reloadData) {
      if (!this.isConnected) {
        return;
      }

      try {
        reloadData = reloadData === undefined ? true : reloadData;
        this.dataMarket = reloadData ? [] : this.dataMarket;
        this.isLoading = reloadData;
        this.page = page || 1;

        const ordersController = new OrdersController();
        let orders = [];
        let skip = (this.page - 1) * this.itemsPerPage;
        if (this.showMyOrders) {
          orders = await ordersController.getMyOpenOrders(
            this.account,
            parseInt(this.typeEnum),
            skip,
            this.itemsPerPage,
            this.sort
          );
        } else if (this.isBuy) {
          orders = await ordersController.getOpenBuyOrders(skip, this.itemsPerPage, this.sort);
        } else {
          orders = await ordersController.getOpenSellOrders(skip, this.itemsPerPage, this.sort);
        }

        this.dataMarket = orders.items;
        this.totalItems = orders.total;

        this.amountwGOLD = Convert.fromWei(await this.wGOLDContract.balanceOf(this.account));
      } catch (error) {
        this.loadingText = 'Sorry, an error occurred';
      } finally {
        this.isLoading = false;
      }
    },

    updateItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      this.loadData(1, true);
    },

    delay() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 4000);
      });
    },

    getSizeIcon(icon) {
      return icon === 'swap' ? 16 : 12;
    },

    async openModal(item) {
      this.quantity = 0;
      this.nftCollectible = item;
      const isApproved = await this.isApprovedContract(this.nftCollectible.orderTypeDesc);

      if (!isApproved) {
        this.isRaskelApprovalModalOpen = true;
        this.isLoadingApproveRaskel = false;
        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;
      } else {
        this.balanceItem = await this.collectibleContract.balanceOf(
          this.account,
          this.nftCollectible.tokenId
        );

        this.isLoadingConfirm = false;
        this.isConfirmOrderModalOpen = true;
      }
    },

    setInitialStateConfirmOrder() {
      this.isConfirmOrderModalOpen = false;
      this.isLoadingConfirm = false;
      this.confirmOrderWaitingStage = 0;
    },

    sortBy(sort) {
      if (this.isLoading || !sort.length || !sort[0]) {
        if (!sort.length) {
          this.sort = 'orderId:-1';
          this.loadData(this.page, true);
        }
        return;
      }
      this.sort = `${sort[0]}:1`;
      this.loadData(this.page, true);
    },

    sortDesc(sort) {
      if (this.isLoading || !sort.length || !sort[0]) {
        return;
      }
      this.sort = this.sort.replace(':1', ':-1');
      this.loadData(this.page, true);
    },

    executeOrder() {
      try {
        this.isLoadingConfirm = true;
        this.confirmOrderWaitingStage = 1;

        const confirmTransaction = this.marketNFTS.executeOrder(
          this.nftCollectible.orderId,
          this.quantity,
          this.account
        );

        confirmTransaction.on('error', error => {
          this.setInitialStateConfirmOrder();

          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error('An error has occurred, please try again!');
        });

        confirmTransaction.on('transactionHash', () => {
          this.confirmOrderWaitingStage = 2;
        });

        confirmTransaction.on('receipt', async () => {
          await this.delay();
          this.setInitialStateConfirmOrder();
          this.loadData(this.page, true);
          ToastSnackbar.success(`The order has been executed successful!`);
        });
      } catch (e) {
        this.setInitialStateConfirmOrder();
      }
    },

    async isApprovedContract(type) {
      type = type.toLowerCase();
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
      type = type.toLowerCase();
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

      const confirmTransaction = listApproved[type.toLowerCase()]();
      this.isLoadingApproveRaskel = true;
      this.raskelApproveText = RASKEL_WAITING_WALLET_APPROVAL;

      confirmTransaction.on('error', error => {
        this.isLoadingApproveRaskel = false;

        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;

        if (error.message) {
          return ToastSnackbar.error(error.message);
        }

        return ToastSnackbar.error('An error has occurred');
      });

      confirmTransaction.on('transactionHash', async () => {
        this.raskelApproveText = RASKEL_WAITING_FIRST_CONFIRMATION;
      });

      confirmTransaction.on('receipt', async () => {
        this.openModal(this.nftCollectible);
        this.isLoadingApproveRaskel = false;
        this.raskelApproveText = RASKEL_DEFAULT_APPROVE_TEXT;
        this.isRaskelApprovalModalOpen = false;
      });

      return;
    },

    openModalCancelOrder(item) {
      this.quantity = 0;
      this.nftCollectible = item;
      this.isLoadingConfirm = false;
      this.openCancelOrderGameItem = true;
    },

    setInitialStateCancelOrder() {
      this.isLoadingCancel = false;
      this.raskelCancelText = RASKEL_DEFAULT_CANCEL_TEXT;
      this.openCancelOrderGameItem = false;
    },

    cancelOrder() {
      try {
        this.isLoadingCancel = true;
        this.raskelCancelText = RASKEL_WAITING_WALLET_APPROVAL;

        const confirmTransaction = this.marketNFTS.cancelOrder(
          this.nftCollectible.orderId,
          this.account
        );

        confirmTransaction.on('error', error => {
          this.setInitialStateCancelOrder();

          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            'Raskel - The traveler, an error has occurred, please try again!'
          );
        });

        confirmTransaction.on('transactionHash', () => {
          this.raskelCancelText = RASKEL_CANCEL_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on('receipt', async () => {
          await this.delay();
          this.setInitialStateCancelOrder();
          this.loadData(this.page, true);
          ToastSnackbar.success(`Order canceled!`);
        });
      } catch (e) {
        this.setInitialStateCancelOrder();
      }
    },

    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    increment(max) {
      if (this.quantity < max) {
        this.quantity++;
      }
    },
  },
};
</script>

<style scoped>
.card-table-black-market,
.table-black-market {
  background: transparent;
}

.table-black-market >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-black-market >>> .v-data-table__wrapper > table > thead > tr > td,
.table-black-market >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-black-market >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-black-market >>> .v-data-table__wrapper > table > thead > tr > th,
.table-black-market >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}

.table-black-market >>> .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: thin solid #ffffff;
}

.table-black-market
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ffffff;
}

.table-black-market
  >>> .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:last-child,
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:last-child {
  border-bottom: thin solid #ffffff;
}

.table-black-market >>> .v-data-footer {
  border-top: thin solid #ffffff;
}
</style>
