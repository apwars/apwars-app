<template>
  <div>
    <div class="troop" :style="`width: ${imgWidth}`">
      <div class="d-flex">
        <v-img
          :max-width="imgWidth"
          :src="`/images/battle/troops/${getTrooper.name}.png`"
        />
      </div>
      <span class="staked">
        Survivors:
        <amount
          :amount="getTrooper.mySurvivor"
          decimals="2"
          compact
          approximate
          tooltip
        ></amount>
      </span>
      <span class="troop-symbol">{{ getTrooper.name }}</span>
      <span class="my-troops">
        My enlisted troops:
        <amount
          :amount="getTrooper.myEnlisted"
          decimals="2"
          compact
          approximate
          tooltip
        />
        / dead:
        <amount
          :amount="getTrooper.myDead"
          decimals="2"
          compact
          approximate
          tooltip
        />
      </span>
    </div>

    <v-row class="ma-0">
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center justify-md-start pa-0"
      >
        <div class="global-troops align-self-center">
          Global troops survivors:
          <div>
            QTY:
            <amount
              :amount="getTrooper.troopsSurvivors"
              decimals="2"
              compact
              approximate
              tooltip
            />
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center justify-md-start pa-0"
      >
        <div class="global-troops align-self-center">
          Global dead troops:
          <div>
            QTY:
            <amount
              :amount="getTrooper.troopsDead"
              decimals="2"
              compact
              approximate
              tooltip
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  props: ["trooper", "contractWar"],
  components: {
    Amount,
  },
  data() {
    return {
      openModal: false,
      warMachine: {},
      trooperInfo: {
        myEnlisted: "0",
        myDead: "0",
        mySurvivor: "0",
        troopsDead: "0",
        troopsSurvivors: "0",
      },
    };
  },
  mounted() {
    this.initData();
    this.loadData();
  },
  computed: {
    imgWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        default:
          return "500px";
      }
    },
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
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
    getTrooper() {
      return { ...this.trooper, ...this.trooperInfo };
    },
  },
  watch: {
    isConnected() {
      this.loadData();
    },
    currentBlockNumber() {
      this.loadData();
    },
    account() {
      this.loadingApproved = false;
      this.btnBringHomeDisabled = false;
      this.isSendingWar = false;
      this.loadData();
    },
  },
  methods: {
    initData() {
      this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);
    },
    async loadData() {
      try {
        const reportTrooperGlobal = await this.warMachine.getWarReportTrooper(
          this.trooper.team.toString(),
          this.trooper.contractAddress[this.networkInfo.id]
        );
        this.trooperInfo.troopsDead = reportTrooperGlobal.dead;
        this.trooperInfo.troopsSurvivors = reportTrooperGlobal.survivor;

        const reportTrooperMy = await this.warMachine.getWarReportMyTrooper(
          this.trooper.team.toString(),
          this.trooper.contractAddress[this.networkInfo.id],
          this.account
        );
        this.trooperInfo.myEnlisted = reportTrooperMy.enlisted;
        this.trooperInfo.myDead = reportTrooperMy.dead;
        this.trooperInfo.mySurvivor = reportTrooperMy.survivor;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.troop {
  position: relative;
}
.staked {
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
}
.troop-symbol {
  position: absolute;
  top: 50%;
  font-size: 13px;
  font-weight: bold;
  right: 15px;
  transform: translate(0%, -50%);
  color: #ffb800;
}
.my-troops {
  position: absolute;
  font-size: 16px;
  font-weight: bold;
  bottom: 5px;
  left: 322px;
  transform: translate(-50%, -50%);
  color: #ffb800;
  width: 350px;
}
.global-troops {
  font-size: 18px;
  font-weight: bold;
  margin-right: 32px;
  width: 100%;
}
.global-troops > div {
  font-size: 22px;
  color: #ffb800;
}

@media only screen and (max-width: 600px) {
  .troop {
    margin: 0 auto;
  }
  .troop-symbol {
    top: 15%;
    font-size: 11px;
    right: 0px;
  }
  .staked {
    font-size: 14px;
    top: 50%;
    left: 65%;
  }
  .my-troops {
    font-size: 13px;
    left: 240px;
  }
}
</style>
