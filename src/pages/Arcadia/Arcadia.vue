<template>
  <div>
    <iframe
      v-if="isConnected"
      id="gameArcadia"
      width="100%"
      :src="
        `/Game/Arcadia/?worldManager=${getWorldManager}&expectedVersion=1.0.0.11`
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
        "56": "",
        "97": "0xDBe11E0663A23e2444e12Ee8677f72039b21890A",
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
