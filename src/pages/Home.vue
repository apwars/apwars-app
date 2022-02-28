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
          <div class="column-container">
            <Arcadia />
            <Leaderboard class="mt-1" />
            <News class="mt-1" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Profile from "@/lib/components/ui/Home/Profile";
import Resources from "@/lib/components/ui/Home/Resources";
import LoyaltyProgram from "@/lib/components/ui/Home/LoyaltyProgram";
import UnlockSoldier from "@/lib/components/ui/Home/UnlockSoldier";
import Wars from "@/lib/components/ui/Home/Wars";
import Arcadia from "@/lib/components/ui/Home/Arcadia";
import Leaderboard from "@/lib/components/ui/Home/Leaderboard";
import News from "@/lib/components/ui/Home/News";

export default {
  components: {
    Profile,
    Resources,
    LoyaltyProgram,
    UnlockSoldier,
    Wars,
    Arcadia,
    Leaderboard,
    News,
  },
};
</script>

<style lang="scss" scoped>
.bg-home {
  background-image: url("/images/background/castle-mist.png");
  background-size: cover;
  min-height: 100%;
  background-position: center;
}
.column-container {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-container {
  @extend .column-container;
  padding: 24px;
  background-color: #110c09;
  border: 2px solid #ffeebc;
  background-image: url("/images/texture/dark-wood.png");
  background-repeat: repeat;
}
.divider {
  width: 100%;
  border-bottom: 1px solid #ffeebc;
  margin: 12px 0;
}
</style>
