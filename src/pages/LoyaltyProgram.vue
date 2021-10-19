<template>
  <div>
    <div class="bg-war">
      <v-container fluid>
        <v-row class="d-none d-sm-none d-md-flex my-n6">
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the-corporation.png"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="mt-9">
              <h1 class="text-h1 text-wGOLD text-center">Loyalty Program</h1>
              <h4 class="text-h4 text-center text-subtitle-welcome-war">
                Provide liquidity and receive rewards!
              </h4>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the degenerate.png"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container fluid>
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="12">
          <h3 class="text-h3 text-wGOLD text-center">Rewards</h3>
        </v-col>

        <v-col v-for="war in wars" v-bind:key="war.name" cols="12">
          <war-info :war="war"></war-info>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import WarInfo from "@/lib/components/ui/Utils/WarInfo";

import { getWars } from "@/data/Wars";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    WarInfo,
  },

  data() {
    return {
      isLoading: true,
      gobalTroops: [],
      wars: [],
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

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        this.wars = getWars(this.networkInfo.id !== "56");
        this.wars = this.wars.reverse();
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.bg-war {
  background-image: url("/images/battle/bg-war.jpg");
  background-size: cover;
}
.text-subtitle-welcome-war {
  color: #bea38d;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
  border-bottom: 3px solid #966a3c;
}

.war-battle {
  margin-top: -130px !important;
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
