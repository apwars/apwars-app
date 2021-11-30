<template>
  <div>
    <div class="page-background">
      <div class="container py-3 d-flex align-center justify-space-between">
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
          <p>
            d varius laoreet in mattis posuere quis ornare viverra in. Sit et,
            quis lectus urna. Gravida est nunc massa, mi. Odio arcu risus amet
            lectus. Cursus elementum luctus tortor tempus dignissim dictum. Sed
            commodo netus cras aliquet morbi proin varius nec. Purus et,
            dignissim nisl et tincidunt sapien. Placerat et lacinia enim iaculis
            quis. Nulla habitant ut in mi. Sit nibh ipsum id scelerisque. Vel
            risus urna, a sollicitudin ac euismod. Molestie integer malesuada
            donec sapien scelerisque.
          </p>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="12"
          class="d-flex flex-column flex-sm-row align-center justify-center"
        >
          <div class="box-bridge">
            <div class="white--text text-h5 font-weight-bold">From:</div>
            <v-card
              color="white"
              width="100%"
              class="d-flex align-center px-3 py-1"
            >
              <img :src="bridgeNetwork.from.image" height="90px" />
              <div class="ml-3 text-h6 text-sm-h4 white--text font-weight-bold">
                {{ bridgeNetwork.from.name }}
              </div>
            </v-card>
          </div>
          <div class="mx-1 mx-sm-4 mt-4">
            <div class="cursor-pointer" @click="changeNetwork()">
              <img
                src="/images/icons/exchange-bridge.png"
                width="60px"
                alt="exchange"
              />
            </div>
          </div>
          <div class="box-bridge">
            <div class="white--text text-h5 font-weight-bold">To:</div>
            <v-card
              color="white"
              width="100%"
              class="d-flex align-center px-3 py-1"
            >
              <img :src="bridgeNetwork.to.image" height="90px" />
              <div class="ml-3 text-h6 text-sm-h4 white--text font-weight-bold">
                {{ bridgeNetwork.to.name }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <wButton flat size="large" actived class="mr-1">
            <span class="mx-3">Transfer</span>
          </wButton>
          <wButton flat size="large">
            <span class="mx-3">History</span>
          </wButton>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <v-alert class="mx-auto font-weight-bold text-center" dense type="info" outlined>
            You can select up to 5 Tokens or Game Items to single transfer
          </v-alert>
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
          name: "APWars Offchain",
          image: "/images/project/logo-icon.png",
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

.box-bridge {
  width: 100%;
}

.box-bridge >>> .v-card {
  background-color: #3a2720 !important;
  border: 2px solid #ffeebc;
  border-radius: 0px;
  color: #fff;
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
