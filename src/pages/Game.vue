<template>
  <div>
    <iframe
      id="gameArcadia"
      width="100%"
      src="/Game/Arcadia/?worldManager=0x9F4B5A875eA98f699E8B6Af93eb5B1d2Db508609"
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
