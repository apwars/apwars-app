<template>
  <div>
    <div class="page-background">
      <div class="container d-flex align-center justify-space-between">
        <div class="page-title">
          Bridge
          <div class="page-title-line"></div>
        </div>
        <img
          class="page-title-icon"
          src="/images/game/bridge.png"
          alt="bridge"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <v-container v-if="isConnected && !isLoading">
      <v-row>
        <v-col cols="12">
          <p>
            The bridge is what makes the bridge (tell me something I don't know)
            between the off-chain and on-chain features of the game. By using
            the bridge, fees to play will be reduced.
          </p>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="12"
          class="d-flex flex-column flex-sm-row align-center justify-center"
        >
          <div class="box-bridge">
            <div class="white--text text-h6 font-weight-bold">From:</div>
            <v-card
              color="white"
              width="100%"
              class="d-flex align-center px-3 py-1"
            >
              <img :src="bridgeNetwork.from.image" height="50px" />
              <div class="ml-3 text-h5 white--text font-weight-bold">
                {{ bridgeNetwork.from.name }}
              </div>
            </v-card>
          </div>
          <div class="mx-1 mx-sm-4 mt-4">
            <div class="cursor-pointer-exchange" @click="changeNetwork()">
              <img
                src="/images/icons/exchange-bridge.png"
                width="60px"
                alt="exchange"
              />
            </div>
          </div>
          <div class="box-bridge">
            <div class="white--text text-h6 font-weight-bold">To:</div>
            <v-card
              color="white"
              width="100%"
              class="d-flex align-center px-3 py-1"
            >
              <img :src="bridgeNetwork.to.image" height="50px" />
              <div class="ml-3 text-h5 white--text font-weight-bold">
                {{ bridgeNetwork.to.name }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <wButton
            @click="tab = 'transfer'"
            flat
            :size="$vuetify.breakpoint.mobile ? 'small' : 'default'"
            :actived="tab === 'transfer'"
            class="mr-1"
          >
            <span class="mx-3">Transfer</span>
          </wButton>
          <wButton
            @click="tab = 'history'"
            :actived="tab === 'history'"
            flat
            :size="$vuetify.breakpoint.mobile ? 'small' : 'default'"
          >
            <span class="mx-3">Transaction history</span>
          </wButton>
        </v-col>
      </v-row>

      <v-tabs-items class="mt-3" v-model="tab">
        <v-tab-item value="transfer">
          <v-row dense>
            <v-col cols="12">
              <v-alert
                class="mx-auto font-weight-bold text-center"
                dense
                type="info"
                outlined
              >
                You can select up to {{ limitSelectList }} Tokens or Game Items
                in a single transfer
              </v-alert>
            </v-col>
          </v-row>

          <v-row dense align="center">
            <v-col class="switch-transfer d-flex align-center" cols="12" md="4">
              <span class="font-weight-bold white--text text-h6">Token</span>
              <v-switch
                inset
                flat
                color="#FFEEBC"
                v-model="typeTransfer"
                @change="clearBridgeList"
                class="ml-2"
              ></v-switch>
              <span class="font-weight-bold white--text text-h6">
                Game Item
              </span>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center text-h6 font-weight-bold">
                You selected {{ selectList }}/{{ limitSelectList }}
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label=""
                v-model="search"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense class="scroll-items-transfer">
            <div v-if="isLoadingItems" class="loading-items-transfer">
              <h2 class="text-center mt-9 text-h2">Loading...</h2>
            </div>
            <v-col
              class="pa-1"
              dense
              v-for="item in filterBridgeList"
              :key="item.name"
              cols="12"
              md="4"
              lg="3"
            >
              <div class="card-bridge d-flex flex-column align-center">
                <div class="my-1 card-bridge-image d-flex align-center">
                  <div>
                    <img width="100px" :src="item.image" :alt="item.name" />
                  </div>
                </div>
                <div class="card-bridge-title">
                  {{ item.name }}
                </div>
                <div style="height: 60px;" v-if="item.isLoading">
                  Loading...
                </div>
                <div
                  v-else-if="item.isApproveOtto"
                  style="height: 60px;"
                  class="text-caption"
                >
                  Fee:
                  <amount :amount="item.feeUnit" decimals="0" formatted />
                  per package
                  <br />
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        Off-chain limit:
                      </span>
                    </template>
                    <span>
                      The off-chain limit is the maximum amount you can supply
                      in off-chain, <br />
                      if you already have this amount it is not possible to send
                      more units.
                    </span>
                  </v-tooltip>

                  <amount
                    :amount="item.offChainLimit"
                    decimals="0"
                    formatted
                  /><br />
                  Package amount:
                  <amount
                    :amount="item.minimumPackage"
                    decimals="0"
                    formatted
                  />
                  items
                </div>
                <div
                  v-else
                  style="height: 60px;"
                  class="text-caption red--text font-weight-bold"
                >
                  Requires guardian's approval: <br />
                  Otto Dalgor
                </div>
                <div class="input-bridge">
                  <number-field
                    label="Package qty"
                    dense
                    v-model="item.packQuantity"
                    @input="packQuantity(item)"
                    :disabled="item.disabled || !item.isApproveOtto"
                    :max="item.packMax"
                  ></number-field>
                  <v-currency-field
                    label="Amount to send"
                    outlined
                    v-bind="
                      !typeTransfer ? currencyConfig : currencyGameItemConfig
                    "
                    v-model="item.amountFrom"
                    :hint="hintFrom(item.balanceFormattedFrom)"
                    persistent-hint
                    dense
                    disabled
                  >
                  </v-currency-field>
                  <img
                    src="images/icons/arrow.png"
                    width="25px"
                    class="d-block mb-1 mx-auto arrow"
                    alt="arrow"
                  />
                  <v-currency-field
                    label="Amount to receive"
                    outlined
                    v-bind="
                      !typeTransfer ? currencyConfig : currencyGameItemConfig
                    "
                    v-model="item.amountTo"
                    :hint="hintTo(item.balanceFormattedTo)"
                    persistent-hint
                    dense
                    disabled
                  >
                  </v-currency-field>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="8" offset="2">
              <div class="d-flex justify-center align-center">
                <v-checkbox
                  v-model="checkboxTransfer"
                  class="checkbox-transfer-input ma-0 pa-0"
                  color="secondary"
                >
                  <template v-slot:label>
                    <div>
                      I agree to transfer my tokens in game items to off-chain
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
          <v-row dense class="mt-n4">
            <v-col cols="12">
              <div class="d-flex justify-center">
                <wButton
                  @click="transfer"
                  flat
                  :size="$vuetify.breakpoint.mobile ? 'small' : 'default'"
                  class="mx-auto btn-transfer mt-1"
                  :disabled="isLoadingTransfer || !checkboxTransfer"
                >
                  <span v-if="isLoadingTransfer" class="mx-3">
                    Loading...
                  </span>
                  <span v-else class="mx-3">
                    Transfer to {{ bridgeNetwork.to.name }}
                  </span>
                </wButton>
              </div>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="history">
          <v-data-table
            class="table-bridge elevation-2"
            :headers="headers"
            :items="history.data"
            item-key="tx"
            :expanded.sync="expanded"
            single-expand
          >
            <template v-slot:[`item.tx`]="{ item }">
              <a :href="`${urlTx[networkInfo.id]}${item.tx}`">
                Tx: {{ item.tx.slice(0, 15) }}...
              </a>
            </template>

            <template v-slot:[`item.type`]="{ item }">
              {{ typeDescription[item.type] }}
            </template>

            <template v-slot:[`item.createdOn`]="{ item }">
              {{ new Date(item.createdOn).toLocaleString() }}
            </template>

            <template v-slot:[`item.transfers`]="{ item }">
              <wButton
                @click="expandRow(item)"
                flat
                size="x-small"
                class="mr-1"
              >
                {{ item.showTransfer ? "Hide Transfers" : "Show Transfers" }}
              </wButton>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div
                  v-for="history in item.history"
                  v-bind:key="history.name"
                  class="my-1"
                >
                  <div
                    v-if="item.type.search('ERC20') !== -1"
                    class="px-10 py-1"
                  >
                    <amount
                      :amount="history.amount"
                      decimals="0"
                      formatted
                      tooltip
                      :symbol="history.name"
                      icon
                    />
                    <hr class="mt-1" />
                  </div>
                  <div
                    v-else-if="item.type.search('ERC1155') !== -1"
                    class="px-10 py-1"
                  >
                    <div class="d-flex align-center">
                      <img
                        width="30px"
                        class="mr-1"
                        :src="history.image"
                        :alt="history.name"
                      />
                      <amount
                        :amount="history.amount"
                        decimals="0"
                        formatted
                        tooltip
                      />
                      <span class="ml-1"> - {{ history.name }} </span>
                    </div>
                    <hr class="mt-1" />
                  </div>
                </div>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-container>

    <v-container v-else>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import NumberField from "@/lib/components/ui/Utils/NumberField";
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import Medal from "@/lib/components/ui/Utils/Medal";
import ERC20 from "@/lib/eth/ERC20";
import Bridge from "@/lib/eth/Bridge";
import Collectibles from "@/lib/eth/Collectibles";
import Convert from "@/lib/helpers/Convert";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import BridgeController from "@/controller/BridgeController";
import WalletController from "@/controller/WalletController";

import { mapMutations } from "vuex";

export default {
  components: {
    NumberField,
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
  },

  data() {
    return {
      checkboxTransfer: false,
      isLoading: true,
      typeTransfer: false,
      tab: "transfer",
      isLoadingTransfer: false,
      isLoadingItems: false,
      search: "",
      headers: [
        {
          text: "Tx/Hash",
          value: "tx",
          sortable: false,
        },
        {
          text: "Type",
          value: "type",
          sortable: false,
        },
        {
          text: "Date",
          value: "createdOn",
          sortable: false,
        },
        {
          text: "Transfers",
          value: "transfers",
          sortable: false,
        },
      ],
      bridgeNetwork: {
        from: {
          type: "onChain",
          name: "Binance Smart Chain Network",
          image: "/images/icons/bsc-icon.svg",
        },
        to: {
          type: "offChain",
          name: "APWars Off-chain",
          image: "/images/project/logo-icon.png",
        },
      },
      bridgeList: [],
      selectList: 0,
      limitSelectList: 10,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
      currencyGameItemConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
      walletsList: [],
      history: [],
      expanded: [],
      typeDescription: {
        claimERC1155: "Claim Game Item",
        claimERC20: "Claim Token",
        depositERC1155: "Deposit Game Item",
        depositERC20: "Deposit Token",
      },
      urlTx: {
        "56": "https://bscscan.com/tx/",
        "97": "https://testnet.bscscan.com/tx/",
      },
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

    filterBridgeList() {
      const items = this.bridgeList.filter((bridge) => {
        if (this.typeTransfer && bridge.type === "erc1155") {
          if (this.search.length > 0) {
            return bridge.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          } else {
            return bridge;
          }
        }

        if (!this.typeTransfer && bridge.type === "erc20") {
          if (this.search.length > 0) {
            return bridge.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          } else {
            return bridge;
          }
        }
      });
      return items.map((item) => {
        if (this.bridgeNetwork.from.type === "onChain") {
          item.balanceFrom = item.balanceOnChain;
          item.balanceTo = item.balanceOffChain;
        } else {
          item.balanceFrom = item.balanceOffChain;
          item.balanceTo = item.balanceOnChain;
        }

        if (!this.typeTransfer) {
          if (this.bridgeNetwork.from.type === "onChain") {
            item.balanceFormattedFrom = Convert.fromWei(item.balanceFrom, true);
            item.balanceFormattedTo = item.balanceTo;
          } else {
            item.balanceFormattedFrom = item.balanceFrom;
            item.balanceFormattedTo = Convert.fromWei(item.balanceTo, true);
          }
        } else {
          item.balanceFormattedFrom = item.balanceFrom;
          item.balanceFormattedTo = item.balanceTo;
        }

        const packOffChainLimit = parseInt(
          item.offChainLimit / item.minimumPackage
        );

        const balanceOffChainLimit = parseInt(
          item.balanceFormattedFrom / item.minimumPackage
        );

        item.packMax =
          balanceOffChainLimit > packOffChainLimit
            ? packOffChainLimit
            : balanceOffChainLimit;

        return item;
      });
    },
  },

  watch: {
    async isConnected() {
      this.walletsList = await this.getWallets();
      await this.loadData();
    },

    async account() {
      if (this.bridgeList.length > 0) {
        this.isLoading = true;
        this.bridgeList = [];
        this.walletsList = [];
        this.history = [];
        await this.loadData();
      }
    },
  },

  mounted() {
    this.setHeader(false);
    this.loadData();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      if (this.walletsList.length === 0) {
        this.walletsList = await this.getWallets();
      }
      await this.addBridgeList();
      if (this.history.length === 0) {
        this.history = await this.getHistory();
      }

      this.isLoading = false;
    },

    async getWallets() {
      try {
        const walletController = new WalletController();
        const wallet = await walletController.wallets(this.account);
        return wallet;
      } catch (error) {
        if (error.status === 404) {
          return { balances: {} };
        }
        if (error.status) {
          return ToastSnackbar.error(error.code);
        }
        ToastSnackbar.error("An error has occurred while to get wallet");
      }
    },

    async getHistory() {
      try {
        const bridgeController = new BridgeController();
        let history = await bridgeController.getHistory(this.account, {
          limit: 50,
          skip: 0,
        });

        history.data = history.data.map((item) => {
          item.history = item.history.map((itemHistory) => {
            const getGamItem = this.bridgeList.find(
              (list) => `GameItem${list.id}` === itemHistory.name
            );
            return { ...itemHistory, ...getGamItem };
          });
          return item;
        });
        return history;
      } catch (error) {
        if (error.status === 404) {
          return { data: [], total: 0 };
        }
        if (error.status) {
          return ToastSnackbar.error(error.code);
        }
        ToastSnackbar.error("An error has occurred while to get history");
      }
    },

    expandRow(item) {
      if (this.expanded.length && item !== this.expanded[0]) {
        this.expanded[0].showTransfer = !this.expanded[0].showTransfer;
      }
      item.showTransfer = !item.showTransfer;
      this.expanded = item === this.expanded[0] ? [] : [item];
    },

    changeNetwork() {
      if (this.isLoadingItems) {
        return;
      }
      this.bridgeNetwork = {
        from: this.bridgeNetwork.to,
        to: this.bridgeNetwork.from,
      };
      this.initStateBridgeList();
    },

    packQuantity(item) {
      this.$nextTick(() => {
        this.selectList = this.bridgeList.filter(
          (itemFilter) => itemFilter.packQuantity > 0
        ).length;
        item.amountFrom = item.packQuantity * item.minimumPackage;
        item.amountTo = item.amountFrom - item.feeUnit * item.packQuantity;

        if (
          !item.isApproveOtto ||
          this.selectList > this.limitSelectList ||
          item.balanceFormattedFrom === 0
        ) {
          item.disabled = true;
        }

        if (this.selectList >= this.limitSelectList) {
          this.bridgeList = this.bridgeList.map((list) => {
            if (list.packQuantity === 0) {
              list.disabled = true;
            }
            return list;
          });
        } else {
          this.bridgeList = this.bridgeList.map((list) => {
            list.disabled = false;
            return list;
          });
        }
        this.$forceUpdate();
      });
    },

    async transfer() {
      if (!this.typeTransfer && this.bridgeNetwork.from.type === "onChain") {
        await this.depositERC20();
      } else if (
        this.typeTransfer &&
        this.bridgeNetwork.from.type === "onChain"
      ) {
        await this.depositERC1155();
      } else if (
        !this.typeTransfer &&
        this.bridgeNetwork.from.type === "offChain"
      ) {
        await this.claimERC20();
      } else if (
        this.typeTransfer &&
        this.bridgeNetwork.from.type === "offChain"
      ) {
        await this.claimERC1155();
      }
    },

    async initStateBridgeList() {
      try {
        this.isLoadingItems = true;
        this.bridgeList = [];
        this.walletsList = await this.getWallets();
        await this.addBridgeList();
        this.history = await this.getHistory();
        this.isLoadingItems = false;
        this.checkboxTransfer = false;
      } catch (error) {
        this.isLoadingItems = false;
      }
    },

    async clearBridgeList() {
      if (this.isLoadingItems) {
        this.typeTransfer = !this.typeTransfer;
        return;
      }
      await this.initStateBridgeList();
    },

    async depositERC20() {
      this.isLoadingTransfer = true;

      const smcBridge = new Bridge(this.addresses.bridge);

      let _tokens = [];
      let _amounts = [];

      this.bridgeList.map((list) => {
        if (list.amountFrom > 0) {
          _tokens.push(list.address);
          _amounts.push(Convert.toWei(list.amountFrom));
        }
      });

      if (_tokens.length === 0) {
        this.isLoadingTransfer = false;
        return ToastSnackbar.warning("There are no items for transfer");
      }

      const confirmTransaction = smcBridge.depositERC20(
        _tokens,
        _amounts,
        this.account
      );

      confirmTransaction.on("error", (error) => {
        this.isLoadingTransfer = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while to signing contract"
        );
      });

      confirmTransaction.on("transactionHash", (tx) => {});

      confirmTransaction.on("receipt", async (receipt) => {
        try {
          const bridgeController = new BridgeController();
          await bridgeController.depositERC20(receipt.transactionHash);
          await this.initStateBridgeList();

          this.isLoadingTransfer = false;
          ToastSnackbar.success("Transfer successfully sent");
        } catch (error) {
          this.isLoadingTransfer = false;
          if (error.status) {
            return ToastSnackbar.error(error.code);
          }
          ToastSnackbar.error(
            "An error has occurred while to signing contract"
          );
        }
      });
    },

    async depositERC1155() {
      this.isLoadingTransfer = true;

      const smcBridge = new Bridge(this.addresses.bridge);

      let _ids = [];
      let _amounts = [];

      this.bridgeList.map((list) => {
        if (list.amountFrom > 0) {
          _ids.push(list.id);
          _amounts.push(list.amountFrom);
        }
      });

      if (_ids.length === 0) {
        this.isLoadingTransfer = false;
        return ToastSnackbar.warning("There are no items for transfer");
      }

      const confirmTransaction = smcBridge.depositERC1155(
        _ids,
        _amounts,
        this.account
      );

      confirmTransaction.on("error", (error) => {
        this.isLoadingTransfer = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while to signing contract"
        );
      });

      confirmTransaction.on("transactionHash", (tx) => {});

      confirmTransaction.on("receipt", async (receipt) => {
        try {
          const bridgeController = new BridgeController();
          await bridgeController.depositERC1155(receipt.transactionHash);
          await this.initStateBridgeList();

          this.isLoadingTransfer = false;
          ToastSnackbar.success("Transfer successfully sent");
        } catch (error) {
          this.isLoadingTransfer = false;
          if (error.status) {
            return ToastSnackbar.error(error.code);
          }
          ToastSnackbar.error(
            "An error has occurred while to signing contract"
          );
        }
      });
    },

    async claimERC20() {
      try {
        this.isLoadingTransfer = true;

        let _tokens = [];
        let _amounts = [];

        this.bridgeList.map((list) => {
          if (list.amountFrom > 0) {
            _tokens.push(list.address);
            _amounts.push(Convert.toWei(list.amountFrom));
          }
        });

        if (_tokens.length === 0) {
          this.isLoadingTransfer = false;
          return ToastSnackbar.warning("There are no items for transfer");
        }

        const bridgeController = new BridgeController();
        const claim = await bridgeController.claimERC20({
          tokens: _tokens,
          amounts: _amounts,
        });

        const smcBridge = new Bridge(this.addresses.bridge);
        const confirmTransaction = smcBridge.claimERC20(
          claim.tokens,
          claim.amounts,
          claim.nonce,
          claim.signature,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.isLoadingTransfer = false;
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract"
          );
        });

        confirmTransaction.on("receipt", async (receipt) => {
          try {
            const bridgeController = new BridgeController();
            await bridgeController.claimSaveTx(receipt.transactionHash);
            await this.initStateBridgeList();

            this.isLoadingTransfer = false;
            ToastSnackbar.success("Transfer successfully sent");
          } catch (error) {
            this.isLoadingTransfer = false;
            if (error.status) {
              return ToastSnackbar.error(error.code);
            }
            ToastSnackbar.error(
              "An error has occurred while to signing contract"
            );
          }
        });
      } catch (error) {
        this.isLoadingTransfer = false;
        if (error.code) {
          return ToastSnackbar.error(error.code);
        }
        return ToastSnackbar.error(error.toString() || error);
      }
    },

    async claimERC1155() {
      try {
        this.isLoadingTransfer = true;

        let _tokens = [];
        let _amounts = [];

        this.bridgeList.map((list) => {
          if (list.amountFrom > 0) {
            _tokens.push(list.id);
            _amounts.push(list.amountFrom);
          }
        });

        if (_tokens.length === 0) {
          this.isLoadingTransfer = false;
          return ToastSnackbar.warning("There are no items for transfer");
        }

        const bridgeController = new BridgeController();
        const claim = await bridgeController.claimERC1155({
          tokens: _tokens,
          amounts: _amounts,
        });

        const smcBridge = new Bridge(this.addresses.bridge);
        const confirmTransaction = smcBridge.claimERC1155(
          claim.tokens,
          claim.amounts,
          claim.nonce,
          claim.signature,
          this.account
        );

        confirmTransaction.on("error", (error) => {
          this.isLoadingTransfer = false;
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract"
          );
        });

        confirmTransaction.on("receipt", async (receipt) => {
          try {
            const bridgeController = new BridgeController();
            await bridgeController.claimSaveTx(receipt.transactionHash);
            await this.initStateBridgeList();

            this.isLoadingTransfer = false;
            ToastSnackbar.success("Transfer successfully sent");
          } catch (error) {
            this.isLoadingTransfer = false;
            if (error.status) {
              return ToastSnackbar.error(error.code);
            }
            ToastSnackbar.error(
              "An error has occurred while to signing contract"
            );
          }
        });
      } catch (error) {
        this.isLoadingTransfer = false;
        if (error.code) {
          return ToastSnackbar.error(error.code);
        }
        return ToastSnackbar.error(error.toString() || error);
      }
    },

    async addBridgeList() {
      try {
        const bridgeController = new BridgeController();

        if (!this.typeTransfer) {
          const getListTokens = await bridgeController.getListTokens();
          for (let list of getListTokens) {
            this.addERC20BridgeList(
              list.token,
              list.name,
              list.image,
              list.minimumPackage,
              list.offChainLimit,
              list.feeUnit
            );
          }
          this.loadBalancesERC20BridgeList();
        } else {
          const getListGameItems = await bridgeController.getListGameItems();

          for (let list of getListGameItems) {
            this.addERC1155BridgeList(
              list.gameItemId,
              list.token,
              list.name,
              list.image,
              list.minimumPackage,
              list.offChainLimit,
              list.feeUnit
            );
          }
          this.loadBalancesERC1155BridgeList();
        }
      } catch (error) {
        if (error.status === 404) {
          return { balances: {} };
        }
        if (error.status) {
          return ToastSnackbar.error(error.code);
        }
        ToastSnackbar.error("An error has occurred while to add Bridge List");
      }
    },

    async addERC20BridgeList(
      address,
      name,
      image,
      minimumPackage,
      offChainLimit,
      feeUnit
    ) {
      const isItem = this.bridgeList.find((list) => list.name === name);
      if (isItem !== undefined) {
        return;
      }
      this.bridgeList.push({
        type: "erc20",
        name: name,
        address: address,
        image: image,
        balanceOnChain: 0,
        balanceOffChain: 0,
        minimumPackage: minimumPackage,
        isApproveOtto: false,
        packQuantity: 0,
        offChainLimit: offChainLimit,
        feeUnit: feeUnit,
        isLoading: true,
      });
    },

    async loadBalancesERC20BridgeList() {
      for (const bridge of this.bridgeList) {
        if (bridge.type === "erc20") {
          const smc = new ERC20(bridge.address);
          const balanceOnChain = await smc.balanceOf(this.account);
          const balanceOffChain = this.walletsList.balances[bridge.name];
          const isApproveOtto = await smc.hasAllowance(
            this.account,
            this.addresses.inventoryManagerTokens
          );
          bridge.balanceOnChain = balanceOnChain;
          bridge.balanceOffChain = balanceOffChain || 0;
          bridge.isApproveOtto = isApproveOtto;
          bridge.isLoading = false;
        }
      }
    },

    async addERC1155BridgeList(
      id,
      collectibles,
      name,
      image,
      minimumPackage,
      offChainLimit,
      feeUnit
    ) {
      const isItem = this.bridgeList.find((list) => list.name === name);
      if (isItem !== undefined) {
        return;
      }
      this.bridgeList.push({
        type: "erc1155",
        id: id,
        name: name,
        address: collectibles,
        image: image,
        balanceOnChain: 0,
        balanceOffChain: 0,
        minimumPackage: minimumPackage,
        isApproveOtto: false,
        packQuantity: 0,
        offChainLimit: offChainLimit,
        feeUnit: feeUnit,
        isLoading: true,
      });
    },

    async loadBalancesERC1155BridgeList() {
      for (const bridge of this.bridgeList) {
        if (bridge.type === "erc1155") {
          const smc = new Collectibles(bridge.address);
          const balanceOnChain = await smc.balanceOf(this.account, bridge.id);
          const balanceOffChain = this.walletsList.balances[
            `GameItem${bridge.id}`
          ];
          const isApproveOtto = await smc.isApprovedForAll(
            this.account,
            this.addresses.inventoryManagerCollectibles
          );
          bridge.balanceOnChain = balanceOnChain;
          bridge.balanceOffChain = balanceOffChain || 0;
          bridge.isApproveOtto = isApproveOtto;
          bridge.isLoading = false;
        }
      }
    },

    hintFrom(value) {
      const amount = this.typeTransfer ? value : Convert.formatString(value, 2);
      if (this.bridgeNetwork.from.type === "onChain") {
        return `Balance in the BSC Network: ${amount}`;
      } else {
        return `Balance in the APWars Off-chain: ${amount}`;
      }
    },

    hintTo(value) {
      const amount = this.typeTransfer ? value : Convert.formatString(value, 2);
      if (this.bridgeNetwork.to.type === "onChain") {
        return `Balance in the BSC Network: ${amount}`;
      } else {
        return `Balance in the APWars Off-chain: ${amount}`;
      }
    },
  },
};
</script>

<style scoped>
.page-background {
  background-image: url("/images/backgrounds/desert.jpg");
  background-size: cover;
  background-position: top;
  margin-bottom: -200px;
}
.page-title {
  display: inline-block;
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 54px;
  line-height: 73px;
}
.page-title-line {
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
  border-radius: 5px;
  height: 4px;
  width: 80%;
  min-width: 300px;
}
.page-subtitle {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient {
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.currency-append {
  margin-top: 4px !important;
}

.switch-transfer >>> .v-input--selection-controls__ripple,
.switch-transfer >>> .v-input--switch__track,
.switch-transfer >>> .v-input--switch__thumb {
  color: rgb(255, 238, 188);
  caret-color: rgb(255, 238, 188);
}

.box-bridge {
  width: 100%;
}

.box-bridge >>> .v-card {
  background-color: #3a2720 !important;
  border: 2px solid #ffeebc;
  border-radius: 0px;
  color: #fff;
}

.card-bridge {
  background: #181a1b;
  border: 2px solid #2a3238;
  min-height: 560px;
}
.card-bridge-title {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: #ffb800;
  text-align: center;
}
.card-bridge-image {
  min-height: 180px;
}

.scroll-items-transfer {
  height: 580px;
  overflow: auto;
  margin: 0px 0px 0px 0px;
  border: 2px solid #ffeebc;
  position: relative;
}
.loading-items-transfer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #111111b3;
  z-index: 1;
}

.table-bridge >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-bridge >>> .v-data-table__wrapper > table > thead > tr > td,
.table-bridge >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-bridge >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-bridge >>> .v-data-table__wrapper > table > thead > tr > th,
.table-bridge >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}

.table-bridge >>> .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: thin solid #ffffff;
}

.table-bridge
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

.table-bridge
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

.table-bridge >>> .v-data-footer {
  border-top: thin solid #ffffff;
}

.table-bridge >>> .avatar {
  width: 60px;
  border: 3px solid #bb7248;
  border-radius: 6px;
}

.table-bridge
  >>> .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  background-color: #3a2720 !important;
}

.cursor-pointer-exchange {
  cursor: pointer;
}

.input-bridge-receive >>> .theme--dark.v-input.v-input--is-disabled {
  opacity: 0.75;
}

.arrow {
  transform: rotate(90deg);
}

.select-transfer >>> .v-select__selections {
  padding-top: 9px !important;
  padding-bottom: 6px !important;
}

.v-list-item:nth-child(even) {
  background-color: #222;
}

.v-autocomplete__content.v-menu__content .v-select-list {
  border: 2px solid #ffb800 !important;
  margin-top: -2px !important;
  background-color: #262626 !important;
}

.image-select {
  height: 50px;
  width: 60px;
}

.image-select > img {
  display: block;
  margin: 0px auto;
}

.list-avatar {
  width: 25%;
}

.input-bridge {
  margin-top: 20px;
  width: 96%;
}

.checkbox-transfer-input >>> .v-input__control > .v-input__slot fieldset {
  color: #fff !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.checkbox-transfer-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #fff !important;
}

.checkbox-transfer-input >>> .v-input__append-inner {
  color: #fff !important;
  font-weight: bold !important;
  font-size: 13px;
}

.checkbox-transfer-input >>> .v-icon {
  color: #fff !important;
}

.checkbox-transfer-input.v-input--is-disabled {
  opacity: 0.2;
}

.checkbox-transfer-input >>> input {
  color: #fff;
  font-weight: bold;
}

.checkbox-transfer-input >>> .v-messages__message {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .page-title {
    font-size: 24px;
    line-height: 34px;
  }
  .page-title-icon {
    height: 60px;
  }
  .page-subtitle {
    font-size: 26px;
    line-height: 32px;
  }
  .page-title-line {
    min-width: 0px;
  }

  .v-list-item {
    padding: 0 8px;
  }
  .list-avatar {
    width: 30%;
  }

  .currency-append {
    white-space: nowrap;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }

  .cursor-pointer-exchange {
    transform: rotate(90deg);
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
