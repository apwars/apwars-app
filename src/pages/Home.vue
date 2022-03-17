<template>
  <div class="d-flex justify-center align-center bg-home">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <div class="card-container">
            <Profile :isLoading="isLoading" :profile="profileInfo" />
            <Resources :isLoading="isLoading" :offChainBalance="resourcesInfo" />
            <div class="divider"></div>
            <LoyaltyProgram :isLoading="isLoading" :lpLevels="lpLevelsInfo" :wSCARS="wSCARS" />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="card-container">
            <UnlockSoldier :isLoading="isLoading" :humanSoldier="humanSoldierInfo" :orcSoldier="orcSoldierInfo" />
            <div class="divider"></div>
            <Wars :isLoading="isLoading" :warData="warInfo" />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="column-container">
            <Arcadia :isLoading="isLoading" :assets="assetsInfo" />
            <Leaderboard class="mt-1" />
            <News class="mt-1" :isLoading="isLoading" :news="newsInfo" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserController from "@/controller/UserController";

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
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    profileInfo() {
      return this.info?.user
    },
    resourcesInfo() {
      return this.info?.wallet?.balances;
    },
    humanSoldierInfo() {
      return this.info?.soldiers?.human;
    },
    orcSoldierInfo() {
      return this.info?.soldiers?.orc;
    },
    warInfo() {
      return this.info?.lastWar;
    },
    assetsInfo() {
      return this.info?.lands;
    },
    newsInfo() {
      return this.info?.news;
    },
    lpLevelsInfo() {
      return this.info?.user?.lpLevels;
    },
    wSCARS() {
      if (!this.resourcesInfo) {
        return 0;
      }
      return this.resourcesInfo['wSCARS'];
    }
  },
  data() {
    return {
      isLoading: false,
      info: null,
    };
  },
  methods: {
    async fetchUserInfo() {
      if (!this.isConnected || !this.account || this.isLoading) {
        return;
      }
      this.isLoading = true;
      try {
        const controller = new UserController();
        const info = await controller.getHome(this.account);
        this.info = info;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchUserInfo();
  },
  watch: {
    isConnected() {
      this.fetchUserInfo();
    },
    account() {
      this.fetchUserInfo();
    },
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
  min-height: 640px;
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
