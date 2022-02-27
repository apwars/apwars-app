<template>
  <div class="d-flex justify-center align-center bg-home">
    <v-container fluid>
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
          <Arcadia />
          <tasks />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
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
import Arcadia from "@/lib/components/ui/Home/Arcadia";

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
    Arcadia
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
