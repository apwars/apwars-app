<template>
  <div class="wtitle">
    <span class="text">{{ text }}</span><slot></slot>
    <div class="subtitle mt-1" v-if="subtitle">{{ subtitle }}</div>
    <div class="decoration"></div>
    <a class="linked-tip mt-1" v-if="tipRedirect" :href="tipRedirect" target="_blank">{{ tip }}</a>
    <div class="tip mt-1" v-else>{{ tip }}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
    tipRedirect: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.wtitle {
  display: inline-block;
  font-weight: bold;
  font-size: 36px;
  line-height: 1.2;
}
.subtitle {
  font-weight: bold;
  font-size: 21px;
  line-height: 1.1;
  max-width: 70%;
}
.decoration {
  margin-top: 12px;
  width: 90%;
  height: 3px;
  border-radius: 5px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
}
.tip {
  font-size: 12px;
  font-style: italic;
}
.linked-tip {
  @extend .tip;
  display: block;
}
</style>