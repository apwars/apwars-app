<template>
  <div>
    <iframe
      id="gameArcadia"
      width="100%"
      src="/Game/Arcadia/?worldManager=0xD55eDCe573d50593088c0b9f7263E0870975089a&expectedVersion=1.0.0.7"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  mounted() {
    this.$nextTick(() => {
      this.resizeIframe();
    });
    window.addEventListener("resize", this.resizeIframe);
    document.getElementsByTagName("html")[0].style.overflow = 'hidden';
  },

  beforeDestroy() {
    document.getElementsByTagName("html")[0].style.overflow = 'auto';
  },

  methods: {
    resizeIframe() {
      const footer = document.querySelector(".v-footer").clientHeight;
      const appBar = document.querySelector(".v-app-bar").clientHeight;
      const reduceHeight = footer + appBar;
      document.querySelector("#gameArcadia").height = document.getElementsByTagName("html")[0].clientHeight - reduceHeight;
    },
  },
};
</script>
