<template>
  <div>
    <div class="bg-war-preparation">
      <v-container class="pb-0">
        <page-title
          title="War Preparation"
          description="It is essential to strengthen your troops in combat whether with training or magical portions, use your time to improve your strategy!"
          image="/images/war-preparation/icon-war-preparation.png"
        />
      </v-container>
      <div class="d-flex justify-center">
        <v-img
          max-width="800px"
          src="/images/war-preparation/create-weapon.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <list-units class="mt-n6" type="war-preparation"></list-units>
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
  }
}
</style>
