<template>
  <div>
    <div class="bg-weapon-research">
      <v-container class="pb-0">
        <page-title
          title="Weapon Research"
          description="It is essential to strengthen your troops in combat whether with training or magical portions, use your time to improve your strategy!"
          image="/images/weapon-research/icon-weapon-research.png"
        />
      </v-container>
      <div class="d-flex text-center justify-center">
        <v-img
          v-if="$vuetify.breakpoint.mobile"
          class="mx-auto"
          max-width="90%"
          src="/images/weapon-research/create-weapon.png"
        />
        <v-img
          v-else
          max-width="610px"
          src="/images/weapon-research/create-weapon.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <list-units class="mt-n6" type="weapon-research"></list-units>
  </div>
</template>

<script>
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ListUnits from "@/lib/components/ui/Lists/ListUnits";

export default {
  components: {
    PageTitle,
    wButton,
    ListUnits,
  },

  data() {
    return {
      isLoading: true,
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
.bg-weapon-research {
  background-image: url("/images/weapon-research/bg-weapon-research.png");
  background-size: cover;
  background-position: center;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

@media only screen and (max-width: 600px) {
  .bg-weapon-research {
    background-size: contain;
    background-position: top;
  }
}
</style>
