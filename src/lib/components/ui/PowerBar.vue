<template>
  <div class="power-container">
    <div class="base">
      <div class="power-unit-active"></div>
      <div class="power-unit-active"></div>
      <div class="power-unit-active"></div>
      <div class="power-unit-active"></div>
    </div>
    <div class="active" :style="`--percent: ${percent()}`">
      <div class="power-unit"></div>
      <div class="power-unit"></div>
      <div class="power-unit"></div>
      <div class="power-unit"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    maxScale: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    percent() {
      return 100 - (((100 * this.value) / this.maxScale)).toString() + "%";
    },
  },
};
</script>
<style lang="scss" scoped>
.power-container {
  display: block;
  position: relative;
}
.power-unit {
  width: 20px;
  height: 20px;
  background-color: #000;
  outline: 1px solid #ffeebc;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
.power-unit-active {
  @extend .power-unit;
  background-color: #ffeebc;
}
.active {
  position: absolute;
  top: 0;
  overflow: hidden;
  height: var(--percent);
}
</style>
