<template>
  <div>
    <iframe
      v-if="isConnected"
      id="gameArcadia"
      width="100%"
      :src="
        `/Game/Arcadia/?worldManager=${getWorldManager}&landMap=${getLandMap}&treasureHunt=${getTreasureHunt}&expectedVersion=1.0.1.12`
      "
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      worldManager: {
        "56": "0xF32396A265CdF21F3485b2803F80c7EDE086899E",
        "97": "0xDBe11E0663A23e2444e12Ee8677f72039b21890A",
      },
      landMap: {
        "56": "0xd0E085043253045E2FbCe84561c31a4407deE0EE",
        "97": "0xb732A7877c6E7E12545730113fd5305849E848A7",
      },
      treasureHunt: {
        "56": "0x66cadff076e70183ccc6d4d8d6c091670f4a2830",
        "97": "0xd3fE14C58b1d284aF14Bf61dec20a7727F22f1cc",
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
  },

  watch: {
    isConnected() {
      this.initData();
    },
  },

  mounted() {
    if (!this.isConnected) {
      return;
    }
    this.initData();
  },

  beforeDestroy() {
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  },

  methods: {
    initData() {
      this.$nextTick(() => {
        this.resizeIframe();
      });
      window.addEventListener("resize", this.resizeIframe);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    },

    resizeIframe() {
      const footer = document.querySelector(".v-footer").clientHeight;
      const appBar = document.querySelector(".v-app-bar").clientHeight;
      const reduceHeight = footer + appBar;
      document.querySelector("#gameArcadia").height =
        document.getElementsByTagName("html")[0].clientHeight - reduceHeight;
    },
  },
};
</script>
