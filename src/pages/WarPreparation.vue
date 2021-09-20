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
      <div v-if="tab === 0" class="d-flex text-center justify-center">
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

      <div v-else class="d-flex text-center justify-center">
        <v-img
          v-if="$vuetify.breakpoint.mobile"
          class="mx-auto"
          max-width="90%"
          src="/images/war-preparation/spendables-research.png"
        />
        <v-img
          v-else
          max-width="610px"
          src="/images/war-preparation/spendables-research.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <v-container class="bg-tabs px-0">
      <v-row class="d-flex">
        <v-col cols="12" md="12" lg="12" class="d-flex">
          <v-tabs v-model="tab">
            <v-tab>Weapons</v-tab>
            <!-- <v-tab>Magical Items</v-tab> -->
          </v-tabs>
        </v-col>
      </v-row>
      
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <list-units
              type="war-preparation"
              :filter-rules="filterTiers"
              show-only-my-units
            />
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-card flat>
            <list-combinators type="game-items-combinator" />
          </v-card>
        </v-tab-item> -->
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
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
    ListCombinators
  },

  data() {
    return {
      isLoading: true,
      filterTiers: {
        name: ["wWARRIOR", "wGRUNT", "wSKELETON-WARRIOR"],
      },
      tab: 0,
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

  mounted() {},

  methods: {},
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
</style>
