<template>
  <div>
    <div v-if="!isConnected">Connect wallet</div>
    <v-row class="war-info mx-1 mx-sm-0 px-0 px-md-2 mt-3">
      <v-col cols="12" md="9" class="align-self-center pa-2 pa-md-3">
        <div>
          <h3 class="text-h3 text-white">{{ war.name }}</h3>
          <p class="war-description">
            {{ war.description }}
          </p>
        </div>
        <div class="d-flex stats flex-column flex-md-row">
          <div class="d-flex">
            <v-img
              max-width="85"
              width="85"
              height="98"
              class="mr-2"
              src="/images/battle/war-info/statistic-the-corpotation.png"
            />
            <div>
              <div class="stats-info my-1">
                Enlisted:
                <amount
                  :amount="teamA.enlisted"
                  decimals="2"
                  compact
                  approximate
                />
              </div>
              <div class="stats-info my-1">
                Survivors:
                <amount
                  v-if="teamA.survivor !== '0'"
                  :amount="teamA.survivor"
                  decimals="2"
                  compact
                  approximate
                />
                <span v-else>
                  Waiting
                </span>
              </div>
              <div class="stats-info my-1">
                Dead:
                <amount
                  v-if="teamA.dead !== '0'"
                  :amount="teamA.dead"
                  decimals="2"
                  compact
                  approximate
                />
                <span v-else>
                  Waiting
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex  my-2 my-md-0 mx-0 mx-md-2 justify-start">
            <v-img
              max-width="85"
              width="85"
              height="98"
              class="mr-2"
              src="/images/battle/war-info/statistic-the-degenerate.png"
            />
            <div>
              <div class="stats-info my-1">
                Enlisted:
                <amount
                  :amount="teamB.enlisted"
                  decimals="2"
                  compact
                  approximate
                />
              </div>
              <div class="stats-info my-1">
                Survivors:
                <amount
                  v-if="teamB.survivor !== '0'"
                  :amount="teamB.survivor"
                  decimals="2"
                  compact
                  approximate
                />
                <span v-else>
                  Waiting
                </span>
              </div>
              <div class="stats-info my-1">
                Dead:
                <amount
                  v-if="teamB.dead !== '0'"
                  :amount="teamB.dead"
                  decimals="2"
                  compact
                  approximate
                />
                <span v-else>
                  Waiting
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-start">
            <v-img
              max-width="120"
              width="120"
              class="mr-2"
              src="/images/battle/war-info/statistic-FED.png"
            />
            <div>
              <div class="stats-info my-1">
                Total Prize:
                <amount
                  :amount="prizewGOLD.totalPrize"
                  decimals="2"
                  compact
                  approximate
                />
                wGOLD
              </div>
              <div class="stats-info my-1">
                Won:
                <span v-if="prizewGOLD.won !== '0'">
                  <amount
                    :amount="prizewGOLD.won"
                    decimals="2"
                    compact
                    approximate
                  />
                  wGOLD
                </span>
                <span v-else>
                  Waiting
                </span>
              </div>
              <div class="stats-info my-1">
                Burned:
                <span v-if="prizewGOLD.burned !== '0'">
                  <amount
                    :amount="prizewGOLD.burned"
                    decimals="2"
                    compact
                    approximate
                  />
                  wGOLD
                </span>
                <span v-else>
                  Waiting
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons-stages mt-3 d-flex flex-column flex-md-row">
          <wButton
            v-if="warStage === 0"
            @click="openPage('enlistment')"
            class="mr-0 mr-md-1"
            :actived="false"
            size="small"
          >
            Enlistment
          </wButton>
          <wButton
            @click="openPage('round-1')"
            class="my-1 my-md-0 mx-1"
            :disabled="warStage === 0"
            :actived="false"
            size="small"
          >
            Round 1 Result
          </wButton>
          <wButton
            @click="openPage('round-2')"
            class="my-1 my-md-0 mx-1"
            :disabled="warStage < 2"
            :actived="false"
            size="small"
          >
            Round 2 Result
          </wButton>
          <wButton
            @click="openPage('report')"
            class="my-1 my-md-0 mx-1"
            :disabled="warStage < 2"
            :actived="false"
            size="small"
          >
            War Report
          </wButton>
        </div>
      </v-col>
      <v-col cols="12" md="3" class="pa-2 pa-md-2">
        <div class="date">{{ war.dateStart }} ~ {{ war.dateEnd }}</div>
        <v-img
          class="mx-auto my-3"
          max-width="260"
          :src="`/images/battle/${imgWinner}`"
        />
        <div v-if="warStage < 2">
          <div class="date">War stage:</div>

          <h5 class="text-h5 text-wGOLD text-center">
            {{ warStageLabel }}
          </h5>
        </div>
        <div v-else>
          <div class="date">Winner:</div>

          <h4 class="text-h4 text-wGOLD text-center">
            {{ winnerLabel }}
          </h4>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Utils/wButton";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  props: ["war"],
  components: {
    Amount,
    wButton,
  },
  data() {
    return {
      warMachine: {},
      warStage: 0,
      teamA: {
        enlisted: "0",
        survivor: "0",
        dead: "0",
      },
      teamB: {
        enlisted: "0",
        survivor: "0",
        dead: "0",
      },
      prizewGOLD: {
        totalPrize: "0",
        won: "0",
        burned: "0",
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
    winner() {
      if (!this.warStats.winner) return "";
      return this.warStats.winner;
    },
    imgWinner() {
      if (this.warStage === 0) {
        return "/war-info/flag-stage.png";
      }
      if (this.winner == "2") {
        return "the-degenerate-win.png";
      }
      return "the-corporation-win.png";
    },
    winnerLabel() {
      if (this.winner == "2") {
        return "The Degenerate";
      }
      return "The Corporation";
    },
    warStageLabel() {
      if (this.warStage === 0) {
        return "The battle for supremacy";
      }
      return "The Battle against the FED";
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },
  },

  mounted() {
    this.isConnected && this.loadData();
  },

  methods: {
    async loadData() {
      this.warMachine = new WarMachine(
        this.war.contractAddress[this.networkInfo.id],
        this.networkInfo.id
      );
      this.warStats = await this.warMachine.warStats();
      this.warStage = await this.warMachine.warStage();
      this.warStage = parseInt(this.warStage);

      this.teamA = await this.warMachine.getWarReportTeam("1");
      this.teamB = await this.warMachine.getWarReportTeam("2");
      this.prizewGOLD = await this.warMachine.getWarReportwGOLD();
    },
    openPage(page) {
      return this.$router.push(
        `/wars/${this.war.contractAddress[this.networkInfo.id]}/${page}`
      );
    },
  },
};
</script>

<style scoped>
.war-info {
  background-image: url("/images/battle/bg-wars.png");
  background-repeat: repeat;
  border: 3px solid #966a3c;
  border-radius: 20px;
  padding: 0px 40px;
}

.war-description {
  color: #bea38d;
  font-size: 16px;
  font-weight: bold;
}

.war-info .date {
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  color: #c4c4c4;
  text-align: center;
}

.stats-info {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: #ffb800;
}

@media only screen and (max-width: 1440px) {
  .stats-info {
    font-size: 14px;
  }
}
</style>
