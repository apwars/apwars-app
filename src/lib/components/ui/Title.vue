<template>
  <div class="wtitle">
    <span class="text">{{ text }}</span><slot></slot>
    <div class="decoration"></div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
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
  font-size: 48px;
  line-height: 1.2;
}
.decoration {
  margin-top: 12px;
  width: 90%;
  height: 3px;
  border-radius: 5px;
  background: linear-gradient(180deg, #faff00 0%, #ffb800 100%);
}
</style>
