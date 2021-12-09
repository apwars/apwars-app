<template>
  <div>
    <div class="bg-training-center">
      <v-container class="pb-0">
        <page-title
          :refact="true"
          title="Training Center"
          description="It is essential to strengthen your troops in combat whether with training or magical portions, use your time to improve your strategy!"
          image="/images/training-center/icon-training-center.png"
        />
      </v-container>
      <div class="d-flex text-center justify-center">
        <v-img
          class="mx-auto training-process-image"
          src="/images/training-center/training-process.png"
        />
      </div>
      <div class="gradient"></div>
    </div>

    <list-units
      class="mt-n6"
      type="training-center"
      :filter-rules="filters"
    ></list-units>
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
      filters: {
        name: ["wCROSSBOWMAN", "wPIKE-ORC", "wUNDEAD-PIKEMAN", "wBLADEMASTER"],
      },
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
.bg-training-center {
  background-image: url("/images/training-center/bg-training-center.png");
  background-size: cover;
  background-position: center;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

@media only screen and (max-width: 600px) {
  .bg-training-center {
    background-size: contain;
    background-position: top;
  }
}

.training-process-image {
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
