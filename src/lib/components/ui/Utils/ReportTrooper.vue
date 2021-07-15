<template>
  <div>
    <div class="d-flex justify-center">
      <div class="align-self-center">
        <v-img width="160" :src="`/images/troops/${getTrooper.name}.png`" />
      </div>
      <div class="ml-1 align-self-center">
        <div class="stats mt-2">Report</div>
        <div class="qty">
          My Survivors:
          <amount :amount="getTrooper.mySurvivor" decimals="2" compact />
        </div>
        <div class="qty">
          My units enlisted:
          <amount :amount="getTrooper.myEnlisted" decimals="2" compact />
        </div>
        <div class="qty mb-3">
          My dead units:
          <amount :amount="getTrooper.myDead" decimals="2" compact />
        </div>
        <div class="globalQty">
          Global survivors:
          <amount :amount="getTrooper.troopsSurvivors" decimals="2" compact />
        </div>
        <div class="globalQty">
          Global death:
          <amount :amount="getTrooper.troopsDead" decimals="2" compact />
        </div>
        <div class="d-flex justify-start">
          <v-img
            class="mt-3"
            max-width="80"
            :src="`/images/tier-${getTrooper.tier}.png`"
          />
        </div>
      </div>
    </div>
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
.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
}
.globalQty {
  color: #f6ff00;
  font-weight: bold;
  font-size: 16px;
}
.qty >>> span,
.globalQty >>> span {
  color: #fff;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 600px) {
  .qty,
  .globalQty {
    font-size: 14px;
  }
}
</style>
