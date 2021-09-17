<template>
  <div class="bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9"
        >Loading...</game-text
      > 
    </div>
    <div v-else>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <countdown v-if="nextWarPhase" :time="nextWarPhase.endAt" :title="nextWarPhase.title" @end="getNextWarPhase" hideEnd />
            <div class="d-flex justify-center mt-1" v-if="nextWarPhase.redirect">
              <wButton
                @click="
                  $router.push(
                    nextWarPhase.redirect
                  )
                "
              >
                {{ nextWarPhase.button_label }}
              </wButton>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img
              class="mx-auto"
              max-width="350"
              src="/images/treasury/fed-treasury.png"
            />
            <wGOLD-button
              v-if="isConnected"
              class="mx-auto mt-n2"
              :amount="balanceFED"
              size="small"
            ></wGOLD-button>
          </v-col>
          <v-col cols="12" md="4">
            <game-text header="h3" class="text-center">
              Last war winner
            </game-text>
            <v-img
              class="mx-auto mt-3"
              max-width="400"
              :src="`/images/battle/${imgWinnerLastWar}`"
            />
            <div class="d-flex justify-center">
              <wButton
                v-if="(nextWar && lastWar) && nextWar.id !== lastWar.id"
                @click="
                  $router.push(
                    `/wars/${lastWar.contractAddress[networkInfo.id]}/report`
                  )
                "
              >
                War Report
              </wButton>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="7">
            <game-text header="h3">
              New Technologies - Coming soon 
            </game-text>

            <v-slide-group class="mt-3" show-arrows>
              <v-slide-item
                v-for="(item, index) in catapults"
                :key="index"
                v-slot="{ toggle }"
              >
                <div class="d-flex align-center" @click="toggle">
                  <div>
                    <v-img class="mx-2" max-width="150px" :src="item.image" />
                  </div>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-col>
          <v-col cols="12" md="5">
            <v-badge
              class="badge-large"
              color="red"
              bordered
              offset-y="30px"
              offset-x="5px"
            >
              <template v-slot:badge>
                {{ listTasks.length }}
              </template>

              <game-text header="h3">
                Tasks
              </game-text>
            </v-badge>

            <v-slide-group v-if="listTasks.length" class="mt-3" show-arrows>
              <v-slide-item
                v-for="(item, index) in listTasks"
                :key="index"
                v-slot="{ toggle }"
              >
                <div class="d-flex align-center" @click="toggle">
                  <div>
                    <img
                      class="bg-img-task"
                      :width="
                        `${$vuetify.breakpoint.mobile ? '70px' : '100px'}
                    `
                      "
                      :src="item.image"
                    />
                  </div>

                  <div class="ml-2 ml-md-3 mr-2 mr-md-6">
                    <span class="font-weight-bold">{{ item.name }}</span>

                    <div class="input-info" v-if="item.inputs">
                      <div class="claim-info" v-for="(input, index) in item.inputs" :key="index">
                        <div v-if="input.amount">{{ input.amount }} {{ input.name }} </div> <img height="16px" width="16px" :src="input.image" />
                      </div> 
                    </div>

                    <wButton
                      v-if="item.combinatorInfo.isClaim"
                      @click="$router.push(item.claimRouter)"
                      class="mt-1"
                      size="small"
                    >
                      Claim available
                    </wButton>

                    <countdown-block
                      v-else
                      :start-blocks="item.combinatorInfo.startBlock"
                      :end-blocks="item.combinatorInfo.endBlock"
                      show-progress
                    />
                  </div>
                </div>
              </v-slide-item>
            </v-slide-group>

            <div v-else>
              Hey, looks like you don't have any tasks right now. How about
              training units, researching weapons and evolving your troop?
              <wButton class="mt-3" @click="$router.push('/training-center')">
                Training center
              </wButton>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Countdown from "@/lib/components/ui/Utils/Countdown";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import Convert from "@/lib/helpers/Convert"

import { getWars } from "@/data/Wars";
import { getTroops } from "@/data/Troops";

import WarMachine from "@/lib/eth/WarMachine";
import wGOLD from "@/lib/eth/wGOLD";
import Combinator from "@/lib/eth/Combinator";

export default {
  components: {
    Countdown,
    wGOLDButton,
    wButton,
    GameText,
    CountdownBlock,
  },

  data() {
    return {
      isLoading: true,
      balanceFED: 0,
      wars: [],
      lastWar: {},
      warStats: {},
      listTasks: [],
      catapults: [
        { image: "/images/weapons/catapult-humans.png" },
        { image: "/images/weapons/catapult-orcs.png" },
        { image: "/images/weapons/catapult-undead.png" },
        { image: "/images/weapons/catapult-elves.png" },
      ],
      nextWar: {},
      nextWarPhase: null
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

    imgWinnerLastWar() {
      if (this.warStats.winner == "2") {
        return "the-degenerate-win.png";
      }
      return "the-corporation-win.png";
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
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
      const contractwGOLD = new wGOLD(this.addresses.wGOLD);
      this.balanceFED = await contractwGOLD.balanceOf(this.addresses.FED);

      this.wars = getWars(this.networkInfo.id !== "56");
      this.wars = this.wars.reverse();

      this.nextWar = { ...this.wars[0] };
      this.getNextWarPhase();

      let warMachine = new WarMachine(
        this.wars[0].contractAddress[this.networkInfo.id],
        this.networkInfo.id
      );
      this.lastWar = this.wars[0];
      const warStage = parseInt(await warMachine.warStage());
      if (!warStage) {
        this.lastWar = this.wars[1];
        warMachine = new WarMachine(
          this.wars[1].contractAddress[this.networkInfo.id],
          this.networkInfo.id
        );
      }

      this.warStats = await warMachine.warStats();
      await this.getTask();
      this.isLoading = false;
    },

    async getTask() {
      const getListTasks = [];
      getTroops().filter((trooper) => {
        for (let combinator in trooper.combinators) {
          const getCombinator = trooper.combinators[combinator];
          if (getCombinator.idCombinator[this.networkInfo.id]) {
            getListTasks.push(getCombinator);
          }
        }
      });

      for (let task of getListTasks) {
        const combinatorContract = new Combinator(
          task.combinatorAddress[this.networkInfo.id]
        );
        await combinatorContract.getContractManager();
        const combinatorId = task.idCombinator[this.networkInfo.id];
        const getGeneralConfig = await combinatorContract.getGeneralConfig(
          this.account,
          this.account,
          combinatorId
        );

        task.combinatorInfo = await combinatorContract.combinators(
          combinatorId,
          this.account
        );

        task.combinatorInfo.endBlock =
          parseInt(task.combinatorInfo.startBlock) +
          parseInt(getGeneralConfig.blocks);

        task.combinatorInfo.isClaim = false;

        if (task.inputs) {
          const tokenAConfig = await combinatorContract.getTokenAConfig(
            this.account,
            this.addresses.wCOURAGE,
            combinatorId
          );

          task.inputs[0].amount = Convert.fromWei(tokenAConfig.amount)

          const tokenBConfig = await combinatorContract.getTokenBConfig(
            this.account,
            this.account,
            combinatorId
          );

          task.inputs[1].amount = Convert.fromWei(tokenBConfig.amount)
        }

        if (this.currentBlockNumber >= task.combinatorInfo.endBlock) {
          task.combinatorInfo.isClaim = true;
        }
      }

      this.listTasks = getListTasks.filter(
        (task) => task.combinatorInfo.combinatorId !== "0"
      );
    },

    getNextWarPhase() {
      const nW = this.wars[0];
      const currentTime = new Date().getTime();
      let currentPhase = nW.phases.find(p => (p.endAt - currentTime) > 0);

      if (currentPhase) {
        currentPhase = {...currentPhase, endAt: currentPhase.endAt - currentTime};
        this.nextWarPhase = currentPhase;
        return
      }

      this.nextWarPhase = nW.phases[nW.phases.length - 1];
    }
  },
};
</script>

<style scoped>
.bg-home {
  background-image: url("/images/bg-home.jpg");
  background-size: cover;
  min-height: 100%;
  background-position: center;
}
.bg-img-task {
  background-image: url("/images/bg-papyrus.png");
  background-size: cover;
  background-color: #d7b796;
  border-radius: 6px;
  border: 3px solid #bb7248;
}

.badge-large >>> span {
  border-radius: 30px;
  font-size: 21px;
  height: 30px;
  min-width: 30px;
}

.claim-info {
  display: flex;
  font-size: 12px;
}
</style>
