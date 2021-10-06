<template>
  <div>
    <iframe
      id="gameArcadia"
      width="100%"
      src="/Game/Arcadia/?worldManager=0x2948129F08AFb8FD1030A8a96D2d386F9dDeb70B"
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
