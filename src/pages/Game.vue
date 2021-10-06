<template>
  <div>
    <iframe
      id="gameArcadia"
      width="100%"
      src="/Game/Arcadia/?worldManager=0x41Ff6D79cfD224C854dd47A6e876c893FF623AFd"
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
