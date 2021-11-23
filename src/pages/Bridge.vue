<template>
  <div>
    <div class="bg-page">
      <v-container>
        <v-row class="d-flex mt-n6">
          <v-col offset-sm="2" cols="12" sm="8">
            <div class="mt-3">
              <h1 class="text-h1 text-wGOLD text-center">Bridge</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                dolorem tenetur repellendus sequi quisquam unde, dolorum esse
                quam veritatis odio assumenda rerum necessitatibus numquam
                dignissimos, id odit ea! Assumenda, consequuntur?
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container class="mt-n6 mt-sm-n16">
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="12" class="d-flex align-center justify-center">
          <div>
            <div class="primary--text font-weight-bold">From:</div>
            <v-card
              color="white"
              :width="$vuetify.breakpoint.smAndUp ? '170px' : '120px'"
              :height="$vuetify.breakpoint.smAndUp ? '120px' : '170px'"
              class="px-3 py-1"
            >
              <img :src="bridgeNetwork.from.image" height="50px" />
              <div class="black--text font-weight-bold">
                {{ bridgeNetwork.from.name }}
              </div>
            </v-card>
          </div>
          <div class="mx-1 mx-sm-6 mt-3">
            <div class="cursor-pointer" @click="changeNetwork()">
              <img
                src="/images/icons/exchange.png"
                width="50px"
                alt="exchange"
              />
            </div>
          </div>
          <div>
            <div class="primary--text font-weight-bold">To:</div>
            <v-card
              color="white"
              :width="$vuetify.breakpoint.smAndUp ? '170px' : '120px'"
              :height="$vuetify.breakpoint.smAndUp ? '120px' : '170px'"
              class="px-3 py-1"
            >
              <img :src="bridgeNetwork.to.image" height="50px" />
              <div class="black--text font-weight-bold">
                {{ bridgeNetwork.to.name }}
              </div>
            </v-card>
          </div>
        </v-col>

        <v-col class="px-0" cols="12">
          <v-tabs v-model="tab">
            <v-tab>Transfer</v-tab>
            <v-tab>History</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <div class="select-transfer px-1 px-sm-6 px-md-12 pt-3">
                  <v-alert dense outlined text type="info">
                    You can select up to 5 Token or GameItems to single
                    transfer
                  </v-alert>
                  <div class="d-flex align-center">
                    <div class="d-flex align-center mt-n3 mr-2">
                      Token
                      <v-switch v-model="typeTransfer" class="ml-1"></v-switch>
                      GameItem
                    </div>
                    <v-autocomplete
                      v-model="bridgeListSelect"
                      :items="filterBridgeList"
                      outlined
                      chips
                      dense
                      :label="`Select ${typeTransfer ? 'GameItems' : 'Token'}`"
                      item-text="name"
                      item-value="name"
                      multiple
                      return-object
                      @input="inputSelect"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          <img height="30px" :src="data.item.image" />

                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template>
                          <div class="d-flex py-1 align-center">
                            <div class="image-select">
                              <img
                                class="text-center"
                                height="50px"
                                :src="data.item.image"
                              />
                            </div>
                            <div>{{ data.item.name }}</div>
                          </div>
                        </template>
                      </template>
                    </v-autocomplete>
                  </div>
                </div>

                <v-list>
                  <v-list-item
                    v-for="token in bridgeListSelect"
                    :key="token.address"
                  >
                    <v-list-item-content>
                      <div class="my-1 d-flex align-center justify-center">
                        <div
                          class="d-flex flex-column justify-center align-center list-avatar"
                        >
                          <img
                            :width="
                              $vuetify.breakpoint.smAndUp ? '70px' : '45px'
                            "
                            :src="token.image"
                            :alt="token.name"
                          />
                          <div
                            class="text-subtitle-2 primary--text font-weight-bold mt-1"
                          >
                            {{ token.name }}
                          </div>
                        </div>
                        <div class="input-bridge">
                          <v-currency-field
                            label="Amount to send"
                            outlined
                            v-bind="
                              token.type === 'erc20'
                                ? currencyConfig
                                : currencyGameItemConfig
                            "
                            v-model="token.amount"
                            :hint="
                              `Balance in Binance Smart Chain Network: 109.100,92`
                            "
                            persistent-hint
                            dense
                          >
                            <template v-slot:append>
                              <div class="d-flex">
                                <span
                                  class="mr-1 currency-append align-self-center"
                                  >{{ token.name }}</span
                                >
                              </div>
                            </template>
                          </v-currency-field>
                          <img
                            src="images/icons/arrow.png"
                            width="30px"
                            class="d-block my-1 mx-auto arrow"
                            alt="arrow"
                          />
                          <v-currency-field
                            label="Amount to receive"
                            outlined
                            v-bind="
                              token.type === 'erc20'
                                ? currencyConfig
                                : currencyGameItemConfig
                            "
                            v-model="token.amount"
                            :hint="`Balance in Arcadia offchain: 109.100,92`"
                            persistent-hint
                            dense
                            disabled
                          >
                            <template v-slot:append>
                              <div class="d-flex">
                                <span
                                  class="mr-1 currency-append align-self-center"
                                  >{{ token.name }}</span
                                >
                              </div>
                            </template>
                          </v-currency-field>
                        </div>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <wButton
                  class="pb-4 text-center"
                  :disabled="bridgeListSelect.length === 0"
                  >Transfer</wButton
                >
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-data-table
                  class="table-leaderboard elevation-2"
                  :headers="headers"
                  :items="leaderboards"
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
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>

      <v-row v-else>
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
import ToastSnackbar from "@/plugins/ToastSnackbar";

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
      headers: [
        {
          text: "Player",
          value: "account",
          width: "30%",
          sortable: false,
        },
        { text: "Average time", value: "time", width: "35%", sortable: false },
        {
          text: "Points",
          value: "points",
          width: "35%",
          sortable: false,
        },
      ],
      leaderboards: [
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
          name: "Binance Smart Chain Network",
          image: "/images/icons/bsc-icon.svg",
        },
        to: {
          name: "APWars offchain",
          image: "/images/icons/world.png",
        },
      },
      tab: 0,
      bridgeListSelect: [],
      bridgeList: [
        {
          type: "erc20",
          name: "wGOLD",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a07c60EA",
          image: "/images/wGOLD.png",
        },
        {
          type: "erc20",
          name: "wCOURAGE",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a07c60EB",
          image: "/images/wCOURAGE.png",
        },
        {
          type: "erc1155",
          name: "Worker",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a01c60EA",
          image: "/images/nfts/worker.png",
        },
        {
          type: "erc1155",
          name: "Weapon Simple potion",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a01c60EC",
          image: "/images/nfts/weapon-simple-potion.png",
        },
        {
          type: "erc1155",
          name: "Weapon Simple Shield",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a01c60EE",
          image: "/images/nfts/weapon-simple-shield.png",
        },
        {
          type: "erc1155",
          name: "Weapon Simple Sword",
          address: "0x3A5c025065a14EF9e834fBD90aeD3876a01c60EE",
          image: "/images/nfts/weapon-simple-sword.png",
        },
      ],
      limitSelectList: 5,
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
      return this.bridgeList.filter(
        (bridge) =>
          (this.typeTransfer && bridge.type === "erc1155") ||
          (!this.typeTransfer && bridge.type === "erc20")
      );
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

      this.isLoading = false;
    },

    remove(item) {
      this.bridgeListSelect = this.bridgeListSelect.filter(
        (itemSelect) => itemSelect.name !== item.name
      );
    },

    inputSelect(items) {
      if (items.length > this.limitSelectList) {
        this.bridgeListSelect.splice(items.length - 1, 1);
        return ToastSnackbar.warning(
          "The transfer limit Token or GameItem is 5."
        );
      }
    },

    changeNetwork() {
      this.bridgeNetwork = {
        from: this.bridgeNetwork.to,
        to: this.bridgeNetwork.from,
      };
    },
  },
};
</script>

<style scoped>
.bg-page {
  background-image: url("/images/black-market/Market.jpg");
  background-size: cover;
  background-position: top;
}

.gradient {
  width: 100%;
  height: 100px;
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

.cursor-pointer {
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
  width: 60%;
}

@media only screen and (max-width: 600px) {
  .v-list-item {
    padding: 0 8px;
  }
  .list-avatar {
    width: 30%;
  }

  .input-bridge {
    width: 70%;
  }

  .currency-append {
    white-space: nowrap;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  .gradient {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
