<template>
  <div>
    <div class="bg-war-preparation">
      <v-container class="pb-0">
        <page-title
          title="War Preparation"
          description="Send your units with the raw material of wGOLD so they can work and create tools of war."
          image="/images/black-market/black-market.png"
        />
      </v-container>
      <div class="gradient"></div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/lib/components/ui/Utils/PageTitle.vue";
import wButton from "@/lib/components/ui/Buttons/wButton";

export default {
  components: {
    PageTitle,
    wButton,
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

  methods: {
    
  },
};
</script>

<style scoped>
.bg-war-preparation {
  background-image: url("/images/black-market/Market.jpg");
  background-size: cover;
  background-position: top;
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
