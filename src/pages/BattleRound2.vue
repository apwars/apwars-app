<template>
  <div>
    <div class="bg-fed">
      <v-container>
        <v-row class="mt-1">
          <v-col cols="12">
            <v-img
              class="mx-auto"
              max-width="600"
              src="/images/battle/the-battle-against-the-fed.png"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" class="align-self-center">
            <v-img
              class="mx-auto"
              max-width="400"
              src="/images/battle/the-degenerate-round-2.png"
            />
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-center">
            <div class="align-self-center">
              <v-img
                class="mx-auto"
                max-width="240"
                src="/images/battle/round-2.png"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto"
              width="370"
              src="/images/battle/fed-round-2.png"
            />
            <wGOLD-button
              v-if="isConnected"
              class="mx-auto mt-n8"
              :amount="balanceFED"
              size="small"
            ></wGOLD-button>
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
            max-width="200"
            src="/images/battle/my-troops.png"
          />
        </v-col>
      </v-row>

      <v-row v-if="isConnected">
        <v-col
          cols="12"
          lg="6"
          class="d-flex justify-center"
          v-for="trooper in troopsOrcs"
          v-bind:key="trooper.name"
        >
          <battle-FED-trooper :info="trooper" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Utils/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import BattleFEDTrooper from "@/lib/components/ui/Utils/BattleFEDTrooper";

import { getTroops } from "@/data/Troops";
import Troops from "@/lib/eth/Troops";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    BattleFEDTrooper,
  },

  data() {
    return {
      balanceFED: 0,
      isLoading: true,
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

      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        //this.balance = web3.utils.fromWei(await wgold.balanceOf(this.account));
        this.balanceFED = await wgold.balanceOf(this.addresses.FED);
        //this.priceWGOLD = await wgold.priceWGOLD();

        let troops = getTroops();

        troops = troops.map((trooper) => {
          return {
            ...trooper,
            ...{
              staked: "1639000000000000000000",
              myTroops: "0",
              globalTroops: "26784000000000000000000",
            },
          };
        });

        this.gobalTroops = await Promise.all(
          troops.map((trooper) => {
            return new Promise(async (resolve) => {
              try {
                if (trooper.contractAddress === "") {
                  resolve(trooper);
                }
                const getTropper = new Troops(trooper.contractAddress);
                trooper.myTroops = await getTropper.balanceOf(this.account);

                resolve(trooper);
              } catch (error) {
                console.log(error);
              }
            });
          })
        );

        // this.myTroops = this.gobalTroops
        //   .map((trooper) => {
        //     return { ...trooper, ...{ qty: trooper.qtyAccount } };
        //   });

        // this.gobalTroops = this.gobalTroops.map((trooper) => {
        //   return { ...trooper, ...{ qty: trooper.qtyGlobal } };
        // });
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
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

.flip-image {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

@media only screen and (max-width: 600px) {
  .degrade {
    display: none;
  }
}
</style>
