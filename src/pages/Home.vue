<template>
  <div class="d-flex justify-center align-center bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9"
        >Loading...</game-text
      >
    </div>
    <v-container class="d-flex" v-else>
      <v-row>
        <v-col cols="12" md="4">
          <div class="card-container">
            <Profile />
            <Resources />
            <div class="divider"></div>
            <LoyaltyProgram />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-center">
            <img
              src="/images/tmj.png"
              height="90px"
              class="mt-5 mb-2"
              alt="the monstrous journey"
            />
          </div>
          <div class="d-flex justify-center mt-1">
            <wButton
              @click="$router.push('/the-monstrous-journey')"
              class="mt-1"
            >
              <span class="text-none text-center">
                Play Now
              </span>
            </wButton>
          </div>
          <div class="d-flex justify-center">
            <img
              src="/images/arcadia-expansion.png"
              height="90px"
              class="mt-5 mb-2"
              alt="arcadia-expansion"
            />
          </div>
          <div class="d-flex justify-center mt-1">
            <wButton @click="$router.push('/arcadia')" class="mt-1">
              <span class="text-none text-center">
                Play Now
              </span>
            </wButton>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <tasks />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import Tasks from "@/lib/components/ui/Home/Tasks";
import Amount from "@/lib/components/ui/Utils/Amount.vue";

import Profile from "@/lib/components/ui/Home/Profile";
import Resources from "@/lib/components/ui/Home/Resources";
import LoyaltyProgram from "@/lib/components/ui/Home/LoyaltyProgram";

import WarsController from "@/controller/WarsController";

export default {
  components: {
    Countdown,
    wGOLDButton,
    wButton,
    GameText,
    CountdownBlock,
    Tasks,
    Amount,
    Profile,
    Resources,
    LoyaltyProgram,
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
      stepWar: {},
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
    ...mapActions({
      fetchBalances: "wallet/fetchBalances",
    }),
    async loadData() {
      if (!this.isConnected) {
        return;
      }
      this.fetchBalances();
      this.stepWar = await this.getStepWar();
      this.isLoading = false;
    },

    async getStepWar() {
      const controller = new WarsController();
      const lastId = await controller.getLastId();
      const lastWar = await controller.getOne(lastId.id);

      let step = {
        title: "War is coming soon...",
        dateTime: new Date(lastWar.deadlines.startEnlistment).getTime(),
      };

      const dateNow = new Date().getTime();
      if (dateNow > new Date(lastWar.deadlines.endClaimPrize).getTime()) {
        step = {
          title: "War ended!",
          dateTime: 0,
        };
      } else if (
        dateNow > new Date(lastWar.deadlines.endEnlistment).getTime()
      ) {
        step = {
          title: "Collect prizes and wUNITS",
          dateTime: new Date(lastWar.deadlines.endClaimPrize).getTime(),
        };
      } else if (
        dateNow > new Date(lastWar.deadlines.startEnlistment).getTime()
      ) {
        step = {
          title: "Enlistment ends in",
          dateTime: new Date(lastWar.deadlines.endEnlistment).getTime(),
        };
      }
      step.dateTime -= dateNow;

      if (step.dateTime < 0) {
        step.dateTime = 0;
      }

      return step;
    },
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
.card-body-home {
  height: 150px;
}
.text-buy {
  width: 150px;
}
.card-container {
  padding: 24px;
  background-color: #110C09;
  border: 2px solid #FFEEBC;
  background-image: url('/images/texture/dark-wood.png');
}
.divider {
  width: 100%;
  border-bottom: 1px solid #FFEEBC;
  margin: 12px 0;
}
</style>
