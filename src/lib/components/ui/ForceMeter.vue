<template>
  <div class="force-meter">
    <div class="base">
      <div
        v-for="(tick, index) in ticksPercent"
        :key="index"
        :class="['unit', [size]]"
      >
        <div
          :class="['active', [size]]"
          :style="`--width: ${tick}%;--fill:${fillColor}`"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ticks: {
      type: Number,
      default: 5,
    },
    maxScale: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    fillColor: {
      type: String,
      default: "#FFEEBC",
    },
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    ticksPercent() {
      let ticks = [];
      let remainingTicks = this.value;
      const unit = this.maxScale / this.ticks;
      for (let i = 0; i <= this.ticks - 1; i++) {
        if (remainingTicks - unit >= 0) {
          ticks = ticks.concat(100);
        } else {
          const rest = (100 * remainingTicks) / unit;
          ticks = ticks.concat(rest > 0 ? rest : 0);
        }
        remainingTicks = remainingTicks - unit;
      }
      return ticks;
    },
  },
};
</script>
<style lang="scss" scoped>
.force-meter {
  position: relative;
  user-select: none;
  .base {
    white-space: nowrap;
  }
}
.unit {
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: black;
  outline: 1px solid #ffeebc;
  margin-right: 4px;
  &.large {
    height: 32px;
    width: 32px;
  }
  > .active {
    height: 20px;
    &.large {
      height: 32px;
    }
    display: inline-block;
    width: var(--width);
    background-color: var(--fill);
    box-sizing: border-box;
  }
}
</style>
