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

    <list-units
      class="mt-n6"
      type="war-preparation"
      :filter-rules="filterTiers"
      show-only-my-units
    ></list-units>
  </div>
</template>

<script>
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

export default {
  name: 'war-preparation',
  components: {
    PageTitle,
    wButton,
    ListUnits,
  },

  data() {
    return {
      isLoading: true,
      filterTiers: {
        name: ["wWARRIOR", "wARCHER", "wGRUNT", "wORC-ARCHER", "wSKELETON-WARRIOR", "wHOUND"],
      }
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
