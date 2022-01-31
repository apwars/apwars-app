<template>
  <div>
    <iframe
      v-if="isConnected"
      id="gameBattle"
      width="100%"
      :src="
        `/Game/Battle/?baseUrl=${getBaseUrl}`
      "
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {},

  data() {
    return {
      baseUrl: {
        "56": "https://apiv2.apwars.farm",
        "97": "https://api-qa.apwars.farm",
      },
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    getWorldManager() {
      return this.worldManager[this.networkInfo.id];
    },
    getLandMap() {
      return this.landMap[this.networkInfo.id];
    },
    getTreasureHunt() {
      return this.treasureHunt[this.networkInfo.id];
    },
    getTreasureHuntId() {
      return this.treasureHuntId[this.networkInfo.id];
    },
    getBaseUrl() {
      return this.baseUrl[this.networkInfo.id];
    },
  },

  watch: {
    isConnected() {
      this.initData();
    },
  },

  mounted() {
    this.setHeader(false);
    // document.getElementsByTagName("footer")[0].style.display = 'none';
    // document.getElementsByClassName("btn-chat")[0].style.display = 'none';

    if (!this.isConnected) {
      return;
    }
    this.initData();
  },

  beforeDestroy() {
    // document.getElementsByTagName("footer")[0].style.display = 'block';
    // document.getElementsByClassName("btn-chat")[0].style.display = 'block';
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  },

  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),

    initData() {
      this.$nextTick(() => {
        this.resizeIframe();
      });
      window.addEventListener("resize", this.resizeIframe);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    },

    resizeIframe() {
      const footer = document.querySelector(".v-footer").clientHeight;
      const reduceHeight = footer;
      document.querySelector("#gameBattle").height =
        document.getElementsByTagName("html")[0].clientHeight - reduceHeight;
    },
  },
};
</script>
