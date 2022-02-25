<template>
  <div class="d-flex justify-center align-center bg-home">
    <div v-if="isLoading">
      <game-text header="h2" class="text-center d-block py-9"
        >Loading...</game-text
      >
    </div>
    <v-container fluid v-else>
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
          <div class="card-container">
            <UnlockSoldier />
            <div class="divider"></div>
            <Wars />
          </div>
        </v-col>
        <v-col cols="12" md="4">
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
import UnlockSoldier from "@/lib/components/ui/Home/UnlockSoldier";
import Wars from "@/lib/components/ui/Home/Wars";

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
    UnlockSoldier,
    Wars,
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
      this.isLoading = false;
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
  background-repeat: repeat;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.divider {
  width: 100%;
  border-bottom: 1px solid #FFEEBC;
  margin: 12px 0;
}
</style>
