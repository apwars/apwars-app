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
            The bridge is currently disabled.
          </p>
        </v-col>
      </v-row>
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
import Button from "@/lib/components/ui/Buttons/Button";
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

export default {
  components: {
    NumberField,
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
    Button,
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
      statusCode: {
        INSUFFICIENT_FUNDS_BRIDGE: {
          title: "You need more funds than that!",
          text: "This wallet needs more funds to procced with your request!",
        },
        INVALID_BRIDGE_TRANSACTION: {
          title: "The transaction tried was invalid!",
          text:
            "Sorry, your transaction was not found or not processed as it should! !",
        },
        INVALID_CONTRACT_BRIDGE: {
          title: "Contract was invalid I'm afraid!",
          text: "Contract is not correct. Please try again!",
        },
        INVALID_BRIDGE_CONTRACT_METHOD: {
          title: "Wrong contract typed!",
          text: "Contract entered was incorrect. Try once more!",
        },
        TRANSACTION_BRIDGE_ALREADY_REGISTERED: {
          title: "Transaction was registered before!",
          text: "The transaction you tried is already registered!",
        },
        INVALID_BODY_BRIDGE: {
          title: "Invalid body!",
          text:
            "Inacurrate information. Have another go with the correct one this time!",
        },
        INVALID_NEXT_CLAIM_BRIDGE: {
          title: "Next claim not authorized!",
          text: (blocks) => {
            return `You can try to claim again in (${blocks} blocks). Not before that!`;
          },
        },
        INVALID_SIGNATURE_BRIDGE: {
          title: "Signature was not good enough!",
          text: "Verification signature needs to be perfect please!",
        },
        INVALID_AMOUNT: {
          title: "Amount entered not valid!",
          text: "Apologies,the value you're trying to send is not valid!",
        },
        INSUFFICIENT_FUNDS: {
          title: "Oh oh, Not enough funds!",
          text: "You need more funds to make this transaction works!",
        },
        BRIDGE_OFFCHAIN_LIMIT: {
          title: "Oh oh, The limit is above the allowed!",
          text: "Use the allowed limit to perform your operation!",
        },
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

        let balanceOffChainLimit = parseInt(
          item.balanceFormattedFrom / item.minimumPackage
        );

        const packMaxFrom =
          balanceOffChainLimit >= packOffChainLimit
            ? packOffChainLimit
            : balanceOffChainLimit;

        let packMaxTo = 10;
        if (item.offChainLimit > item.balanceFormattedTo) {
          packMaxTo = parseInt(
            (item.offChainLimit - item.balanceFormattedTo) / item.minimumPackage
          );
        }

        item.packMax = packMaxTo > packMaxFrom ? packMaxFrom : packMaxTo;

        item.packMax = item.packMax;

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
    this.loadData();
  },

  methods: {
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
          return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text}
          `);
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
          return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text}
          `);
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
      if (this.isLoadingItems || this.isLoadingTransfer) {
        return;
      }
      this.bridgeNetwork = {
        from: this.bridgeNetwork.to,
        to: this.bridgeNetwork.from,
      };
      this.initStateBridgeList();
    },

    packQuantity(item) {
      item.amountFrom = item.packQuantity * item.minimumPackage;
      item.amountTo = item.amountFrom - item.feeUnit * item.packQuantity;
      this.isDisabledLimitSelectList(item);
      this.isDisabledItem(item);
    },

    isDisabledItem(item) {
      item.amountFrom = item.packQuantity * item.minimumPackage;
      item.amountTo = item.amountFrom - item.feeUnit * item.packQuantity;

      let isLimitBalance = true;
      if (
        this.bridgeNetwork.from.type === "offChain" ||
        item.offChainLimit >= item.balanceOffChain
      ) {
        isLimitBalance = false;
      }

      if (!item.isApproveOtto || isLimitBalance) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }

      this.$forceUpdate();
    },

    isDisabledLimitSelectList(item) {
      this.selectList = this.bridgeList.filter(
        (itemFilter) => itemFilter.packQuantity > 0
      ).length;
      item.amountFrom = item.packQuantity * item.minimumPackage;
      item.amountTo = item.amountFrom - item.feeUnit * item.packQuantity;

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
        this.checkboxTransfer = false;
        this.walletsList = await this.getWallets();
        await this.addBridgeList();
        this.history = await this.getHistory();
        this.isLoadingItems = false;
      } catch (error) {
        this.isLoadingItems = false;
      }
    },

    async clearBridgeList() {
      if (this.isLoadingItems || this.isLoadingTransfer) {
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
            return ToastSnackbar.warning(`
              <h3>${this.statusCode[error.code].title}</h3> <br />
              ${this.statusCode[error.code].text}
            `);
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
            return ToastSnackbar.warning(`
              <h3>${this.statusCode[error.code].title}</h3> <br />
              ${this.statusCode[error.code].text}
            `);
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
          amounts: _amounts
        });

        this.claimERC20FromBridge(claim);
      } catch (error) {
        this.isLoadingTransfer = false;
        if (error.code) {
          if (error.code === "INVALID_NEXT_CLAIM_BRIDGE") {
            const smcBridge = new Bridge(this.addresses.bridge);
            let nextBlock = await smcBridge.nextClaims(this.account);
            nextBlock -= this.currentBlockNumber;
            return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text(nextBlock)}
          `);
          }

          return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text}
          `);
        }
        return ToastSnackbar.error(error.toString() || error);
      }
    },

    async claimERC20FromBridge(claim) {
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
              return ToastSnackbar.warning(`
                <h3>${this.statusCode[error.code].title}</h3> <br />
                ${this.statusCode[error.code].text}
              `);
            }
            ToastSnackbar.error(
              "An error has occurred while to signing contract"
            );
          }
        });
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

        this.claim1155FromBridge(claim);
      } catch (error) {
        this.isLoadingTransfer = false;
        if (error.code) {
          if (error.code === "INVALID_NEXT_CLAIM_BRIDGE") {
            const smcBridge = new Bridge(this.addresses.bridge);
            let nextBlock = await smcBridge.nextClaims(this.account);
            nextBlock -= this.currentBlockNumber;
            return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text(nextBlock)}
          `);
          }

          return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text}
          `);
        }
        return ToastSnackbar.error(error.toString() || error);
      }
    },

    async claim1155FromBridge(claim) {
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
              return ToastSnackbar.warning(`
                <h3>${this.statusCode[error.code].title}</h3> <br />
                ${this.statusCode[error.code].text}
              `);
            }
            ToastSnackbar.error(
              "An error has occurred while to signing contract"
            );
          }
        });
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
          return ToastSnackbar.warning(`
            <h3>${this.statusCode[error.code].title}</h3> <br />
            ${this.statusCode[error.code].text}
          `);
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
          bridge.packQuantity = 0;
          this.isDisabledItem(bridge);
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
          bridge.packQuantity = 0;
          this.isDisabledItem(bridge);
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

    async reprocessTx(reprocessTx, type) {
      const bridgeController = new BridgeController();
      try {
        const claim = await bridgeController.reprocessTx(reprocessTx);
        if (type === 'claimERC20') {
          this.claimERC20FromBridge(claim);
        } else {
          this.claim1155FromBridge(claim);
        }
      } catch (error) {

      }
    }
  },
};
</script>

<style scoped>
.page-background {
  background-image: url("/images/background/desert.jpg");
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
  min-height: 510px;
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
  min-height: 140px;
}

.scroll-items-transfer {
  height: 570px;
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
