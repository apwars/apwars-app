<template>
  <div>
    <div class="bg-war-preparation">
      <v-container class="pb-0">
        <page-title
          title="War Preparation"
          description="Welcome to my laboratory. Let's gear you up."
          image="/images/war-preparation/icon-war-preparation.png"
        />
      </v-container>
      <div class="d-flex text-center justify-center">
        <v-img
          v-if="$vuetify.breakpoint.mobile"
          class="mx-auto"
          max-width="90%"
          src="/images/war-preparation/weapon-research.png"
        />
        <v-img
          v-else
          max-width="610px"
          src="/images/war-preparation/weapon-research.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <v-container class="bg-tabs px-0">
      <v-row class="d-flex mb-3">
        <v-col cols="12" md="12" lg="12" class="d-flex">
          <v-tabs v-model="tab">
            <v-tab>Weapons</v-tab>
            <v-tab>Magical Items</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <list-units
        v-if="tab === 0"
        class="mt-n6"
        type="war-preparation"
        :filter-rules="filterTiers"
        show-only-my-units
      ></list-units>

      <list-combinators
        v-else-if="tab === 1"
        type="game-items-combinator"
        class="mt-n6">
      </list-combinators>
    </v-container>
  </div>
</template>

<script>
import NftItem from '@/lib/components/ui/NFTItem';
import GameText from '@/lib/components/ui/Utils/GameText';

import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

import ListCombinators from "@/lib/components/ui/Lists/ListCombinators";

export default {
  name: 'war-preparation',
  components: {
    PageTitle,
    wButton,
    ListUnits,
    NftItem,
    GameText,
    ListCombinators,
  },

  data() {
    return {
      isLoading: true,
      filterTiers: {
        name: ["wWARRIOR", "wGRUNT", "wSKELETON-WARRIOR"],
      },
      tab: 0
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

  mounted() {
    this.loadData();
  },

  watch: {
    isConnected() {
      this.loadData();
    },
  },

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }
      this.isLoading = true;
      try {
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.bg-war-preparation {
  background-image: url("/images/war-preparation/bg-war-preparation.png");
  background-size: cover;
  background-position: center;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

@media only screen and (max-width: 600px) {
  .bg-war-preparation {
    background-size: contain;
    background-position: top;
  }
}

.bg-tabs {
  background-color: #000;
}
</style>
