<template>
  <div>
    <div class="bg-fed">
      <v-container>
        <v-row class="mt-1">
          <v-col cols="12">
            <v-img
              class="mx-auto"
              max-width="600"
              src="/images/battle/the-battle-for-supremacy.png"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto"
              max-width="400"
              src="/images/battle/the-corporation.png"
            />
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-center">
            <div class="align-self-center">
              <v-img
                class="mx-auto"
                max-width="240"
                src="/images/battle/round-1.png"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto"
              max-width="400"
              src="/images/battle/the-degenerate .png"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="degrade"></div>
    </div>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img
            class="mx-auto"
            max-width="250"
            src="/images/battle/my-troops.png"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="6" class="dividing-line">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center"
              v-for="trooper in troopsHumans"
              v-bind:key="trooper.name"
            >
              <battle-trooper :info="trooper" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center"
              v-for="trooper in troopsOrcs"
              v-bind:key="trooper.name"
            >
              <battle-trooper :info="trooper" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="mt-3">
        <v-col cols="12" class="d-flex justify-center">
          <v-img
            class="mx-auto cursor-pointer"
            max-width="300"
            src="/images/buttons/btn-buy-more-troops.png"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Utils/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import BattleTrooper from "@/lib/components/ui/Utils/BattleTrooper";

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    BattleTrooper,
  },

  data() {
    return {
      balance: 0,
      balanceFED: 0,
      priceWGOLD: 0,
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
      selectTroops: "myTroops",
      myTroops: [],
      gobalTroops: [],
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

    formattedAmount() {
      const num = parseInt(this.balance);

      if (this.balance < 1) {
        return "~0";
      } else if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + "K";
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      } else if (num < 900) {
        return num;
      }
    },

    troopsHumans() {
      return this.gobalTroops.filter((trooper) => trooper.team === 1);
    },

    troopsOrcs() {
      return this.gobalTroops.filter((trooper) => trooper.team === 2);
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
    this.loadData();
  },

  methods: {
    goToSwap() {
      window.location = "https://exchange.apwars.farm/#/swap";
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      // try {
      //   const wgold = new wGOLD(this.addresses.wGOLD);
      //   this.balance = web3.utils.fromWei(await wgold.balanceOf(this.account));
      //   this.balanceFED = await wgold.balanceOf(this.addresses.FED);
      //   this.priceWGOLD = await wgold.priceWGOLD();

      this.gobalTroops = getTroops();

      this.gobalTroops = this.gobalTroops.map((trooper) => {
        return {
          ...trooper,
          ...{
            staked: "1639000000000000000000",
            myTroops: "1565000000000000000000",
            globalTroops: "26784000000000000000000",
          },
        };
      });

      console.log(this.gobalTroops);

      //   this.gobalTroops = await Promise.all(
      //     troops.map((trooper) => {
      //       return new Promise(async (resolve) => {
      //         try {
      //           if (trooper.contractAddress === "") {
      //             resolve({
      //               name: trooper.name,
      //               team: trooper.team,
      //               tier: trooper.tier,
      //               qtyAccount: "0",
      //               qtyGlobal: "0",
      //               priceWGOLD: "0",
      //               disabled: true,
      //             });
      //           }
      //           const getTropper = new Troops(trooper.contractAddress);
      //           const qtyAccount = await getTropper.balanceOf(this.account);
      //           const qtyGlobal = await getTropper.totalSupply();
      //           const priceWGOLD = await getTropper.priceWGOLD(
      //             trooper.lpAddresses
      //           );
      //           resolve({
      //             name: trooper.name,
      //             team: trooper.team,
      //             tier: trooper.tier,
      //             qtyAccount: qtyAccount,
      //             qtyGlobal: qtyGlobal,
      //             priceWGOLD: priceWGOLD,
      //             disabled: false,
      //           });
      //         } catch (error) {
      //           console.log(error);
      //         }
      //       });
      //     })
      //   );

      //   this.myTroops = this.gobalTroops
      //     .map((trooper) => {
      //       return { ...trooper, ...{ qty: trooper.qtyAccount } };
      //     });

      //   this.gobalTroops = this.gobalTroops.map((trooper) => {
      //     return { ...trooper, ...{ qty: trooper.qtyGlobal } };
      //   });
      // } catch (e) {
      //   console.log(e);
      // } finally {
      //   this.isLoading = false;
      // }
    },
  },
};
</script>

<style scoped>
.bg-fed {
  background-image: url("/images/battle/fed-background.png");
  background-size: cover;
}
.degrade {
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.dividing-line {
  background-image: url("/images/battle/line.png");
  background-position: right;
}

@media only screen and (max-width: 600px) {
  .degrade {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
