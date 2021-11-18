<template>
  <div>
    <div class="bg-war">
      <v-container fluid>
        <v-row class="d-none d-sm-none d-md-flex mt-n6">
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
              <h1 class="text-h1 text-wGOLD text-center">Leaderboard</h1>
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

        <v-row class="d-flex d-sm-flex d-md-none">
          <v-col cols="12">
            <v-img
              class="mx-auto"
              max-width="600"
              src="/images/battle/war-info/flag-stage.png"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container class="mt-n6">
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="4"> </v-col>
        <v-col cols="4">
          <v-avatar :address="this.account" link tooltip />
        </v-col>
        <v-col cols="4"> </v-col>
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
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";

import { mapMutations } from "vuex";

export default {
  components: {
    Amount,
    wButton,
    VAvatar,
  },

  data() {
    return {
      isLoading: true,
      leaderboards: [
        {
          account: "0x35E7097DAeEb621057293c64288337ED5170AAaf",
        },
        {
          account: "0x64F5E89350eEf65c3fCe69d6cBF7fdd1eC61Aa00",
        },
        {
          account: "0xF80783C375f6F34999Cc16Fce2d326f597aeF38b",
        },
        {
          account: "0xFC9A805C4CE604711FA18d663CaccBef2965E667",
        },
        {
          account: "0x2d4bb1bcE02E1c0ec6cf08f585924F82707BEF89",
        },
        {
          account: "0xF7AE8490eb37973A4bb5797C3F193e1A5b721dA9",
        },
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

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.setHeader(false);
    this.loadData();
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.isLoading = false;
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
