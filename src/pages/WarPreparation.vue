<template>
  <div>
    <div class="bg-war-preparation">
      <v-container class="pb-0">
        <page-title
          :refact="true"
          title="War Preparation"
          description="Welcome to my laboratory. Let's gear you up."
          image="/images/war-preparation/icon-war-preparation.png"
        />
      </v-container>
      <div class="d-flex text-center justify-center">
        <v-img
          class="mx-auto weapon-research-image"
          src="/images/war-preparation/weapon-research.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <v-container class="bg-tabs px-0">
      <v-row>
        <list-combinators type="magical-items" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";
import ListCombinators from "@/lib/components/ui/Lists/ListCombinators";

export default {
  name: "war-preparation",
  components: {
    PageTitle,
    wButton,
    ListUnits,
    ListCombinators,
  },

  data() {
    return {
      isLoading: true,
      filterTiers: {
        name: ["wWARRIOR", "wGRUNT", "wSKELETON-WARRIOR", "wPIKE-ELF"],
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

<style scoped lang="scss">
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

.weapon-research-image {
  @media only screen and (min-width: 0px) {
    max-width: 90%;
  }

  @media only screen and (min-width: 600px) {
    max-width: 70%;
  }

  @media only screen and (min-width: 960px) {
    max-width: 55%;
  }

  @media only screen and (min-width: 1264px) {
    max-width: 610px;
  }
}
</style>
