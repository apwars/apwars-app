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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
            pharetra faucibus nisl sit turpis iaculis elementum. Nibh lorem
            auctor enim sit volutpat varius fames. Arcu aliquam sit id et. Non
            id purus tincidunt egestas dui nibh commodo enim. Tortor feugiat
            tortor augue purus morbi venenatis faucibus imperdiet sed. Fringilla
            in metus, in interdum quis pellentesque duis. Vel gravida facilisi
            ultricies duis at viverra morbi eu. Sed diam, convallis elementum
            mauris elementum egestas tristique congue vitae.
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
            <span class="mx-3">History</span>
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
                You can select up to 5 Tokens or Game Items to single transfer
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
                class="ml-2"
              ></v-switch>
              <span class="font-weight-bold white--text text-h6"
                >Game Item</span
              >
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center text-h6 font-weight-bold">
                Your Selection 1/5
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

          <v-row dense>
            <div class="scroll-items-transfer">
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
                      <img
                        width="120px"
                        :src="item.image"
                        alt="weapon-simple-shield"
                      />
                    </div>
                  </div>
                  <div class="card-bridge-title">
                    {{ item.name }}
                  </div>
                  <div class="text-caption">
                    Fee: 1% / Minimum transfer: 1000
                  </div>
                  <div class="input-bridge">
                    <v-currency-field
                      label="Amount to send"
                      outlined
                      v-bind="!typeTransfer ? currencyConfig : currencyGameItemConfig"
                      v-model="item.amountFrom"
                      :hint="hintFrom(item.balanceFormattedFrom)"
                      persistent-hint
                      dense
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
                      v-bind="!typeTransfer ? currencyConfig : currencyGameItemConfig"
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
            </div>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <div class="d-flex justify-center">
                <wButton
                  @click="transfer"
                  flat
                  :size="$vuetify.breakpoint.mobile ? 'small' : 'default'"
                  class="mx-auto btn-transfer mt-1"
                >
                  <span class="mx-3">
                    Transfer to {{ bridgeNetwork.to.name }}
                  </span>
                </wButton>
              </div>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="history">
          <v-data-table
            class="table-leaderboard elevation-2"
            :headers="headers"
            :items="history"
            nowrap
          >
            <template v-slot:[`item.account`]="{ item }">
              <div class="d-flex align-center my-1">
                <v-avatar :address="item.account" />
                <v-address
                  class="text-center text-caption"
                  :address="item.account"
                  link
                  tooltip
                >
                </v-address>
              </div>
            </template>

            <template v-slot:[`item.time`]="{ item }">
              <countdown
                :auto-start="false"
                :time="item.time"
                v-slot="{ minutes, seconds }"
              >
                {{ minutes }} minutes, {{ seconds }} seconds
              </countdown>
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
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import Medal from "@/lib/components/ui/Utils/Medal";
import ERC20 from "@/lib/eth/ERC20";
import Collectibles from "@/lib/eth/Collectibles";
import Convert from "@/lib/helpers/Convert";

import { mapMutations } from "vuex";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
  },

  data() {
    return {
      isLoading: true,
      typeTransfer: false,
      tab: "transfer",
      search: "",
      headers: [
        {
          text: "Player",
          value: "account",
          width: "30%",
          sortable: false,
        },
        {
          text: "Amount",
          value: "points",
          width: "35%",
          sortable: false,
        },
      ],
      history: [
        {
          account: "0xFC9A805C4CE604711FA18d663CaccBef2965E667",
          game: "Monstrous Journey",
          time: 65000,
          stage: "Start",
          points: 1000,
        },
        {
          account: "0x2d4bb1bcE02E1c0ec6cf08f585924F82707BEF89",
          game: "Monstrous Journey",
          time: 64000,
          stage: "Start",
          points: 900,
        },
        {
          account: "0xF7AE8490eb37973A4bb5797C3F193e1A5b721dA9",
          game: "Monstrous Journey",
          time: 67000,
          stage: "Start",
          points: 870,
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
          name: "APWars Offchain",
          image: "/images/project/logo-icon.png",
        },
      },
      bridgeList: [],
      limitSelectList: 2,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 2,
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
          item.balanceFormattedFrom = Convert.fromWei(item.balanceFrom, true);
          item.balanceFormattedTo = Convert.fromWei(item.balanceTo, true);
        } else {
          item.balanceFormattedFrom = item.balanceFrom;
          item.balanceFormattedTo = item.balanceTo;
        }

        item.amountFrom = 0;
        item.amountTo = 0;
        return item;
      });
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
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

      if (this.bridgeList.length === 0) {
        await this.addBridgeList();
      }

      this.isLoading = false;
    },

    changeNetwork() {
      this.bridgeNetwork = {
        from: this.bridgeNetwork.to,
        to: this.bridgeNetwork.from,
      };
    },

    transfer() {
      console.log(this.bridgeList);
    },

    async addBridgeList() {
      // ERC20
      await this.addERC20BridgeList(
        this.addresses.wGOLD,
        "wGOLD",
        "/images/wGOLD.png"
      );
      await this.addERC20BridgeList(
        this.addresses.wCOURAGE,
        "wCOURAGE",
        "/images/wCOURAGE.png"
      );

      // ERC1155
      await this.addERC1155BridgeList(49, "Worker", "/images/nfts/worker.png");
      await this.addERC1155BridgeList(
        39,
        "Simple Shield",
        "/images/nfts/weapon-simple-shield.png"
      );
      await this.addERC1155BridgeList(
        63,
        "Simple Archery",
        "/images/nfts/weapon-simple-archery.png"
      );
      await this.addERC1155BridgeList(
        64,
        "Simple Spear",
        "/images/nfts/weapon-simple-spear.png"
      );
      await this.addERC1155BridgeList(
        65,
        "Simple Potion",
        "/images/nfts/weapon-simple-potion.png"
      );
    },

    async addERC20BridgeList(address, name, image) {
      const smc = new ERC20(address);
      const balanceOnChain = await smc.balanceOf(this.account);
      this.bridgeList.push({
        type: "erc20",
        name: name,
        address: address,
        image: image,
        balanceOnChain: balanceOnChain,
        balanceOffChain: balanceOnChain,
      });
    },

    async addERC1155BridgeList(id, name, image) {
      const smc = new Collectibles(this.addresses.collectibles);
      const balanceOnChain = await smc.balanceOf(this.account, id);
      this.bridgeList.push({
        type: "erc1155",
        id: id,
        name: name,
        address: this.addresses.collectibles,
        image: image,
        balanceOnChain: balanceOnChain,
        balanceOffChain: balanceOnChain,
      });
    },

    hintFrom(value) {
      const amount = this.typeTransfer ? value : Convert.formatString(value, 2);
      if (this.bridgeNetwork.from.type === "onChain") {
        return `Balance in BSC Network: ${amount}`;
      } else {
        return `Balance in APWars Offchain: ${amount}`;
      }
    },

    hintTo(value) {
      const amount = this.typeTransfer ? value : Convert.formatString(value, 2);
      if (this.bridgeNetwork.to.type === "onChain") {
        return `Balance in BSC Network: ${amount}`;
      } else {
        return `Balance in APWars Offchain: ${amount}`;
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
  min-height: 200px;
}

.scroll-items-transfer {
  padding: 3px 0px;
  width: 100%;
  overflow: auto;
  border: 2px solid #ffeebc;
  margin: 0px 8px;
  display: flex;
}

.table-leaderboard >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-leaderboard >>> .v-data-table__wrapper > table > thead > tr > td,
.table-leaderboard >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-leaderboard >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-leaderboard >>> .v-data-table__wrapper > table > thead > tr > th,
.table-leaderboard >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}

.table-leaderboard
  >>> .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: thin solid #ffffff;
}

.table-leaderboard
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

.table-leaderboard
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

.table-leaderboard >>> .v-data-footer {
  border-top: thin solid #ffffff;
}

.table-leaderboard >>> .avatar {
  width: 60px;
  border: 3px solid #bb7248;
  border-radius: 6px;
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
