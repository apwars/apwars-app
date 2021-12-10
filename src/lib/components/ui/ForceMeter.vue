<template>
  <div class="force-meter">
    <div class="base">
      <div v-for="(tick, index) in ticksPercent"
        :key="index" class="unit" :src="asset" :alt="`unit-${i}`">
        <div class="active" :style="`--width: ${tick}%`"></div></div>
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
    type: {
      type: String,
      default: '',
    }
  },
  computed: {
    ticksPercent() {
      let ticks = [];
      let remainingTicks = this.value;
      const unit = this.maxScale / this.ticks;
       for (let i = 0; i <= this.ticks - 1; i++) {  
         if ((remainingTicks - unit) >= 0) {
           ticks = ticks.concat(100);
         } else {
           const rest = (100 * remainingTicks) / this.maxScale;
           ticks = ticks.concat(rest > 0 ? rest : 0);
         }
         remainingTicks = remainingTicks-unit;
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
  outline: 1px solid #FFEEBC;
  margin-right: 4px;
  > .active {
    height: 20px;
  width: 20px;
  display: inline-block;
    
    width: var(--width);
    background-color: #FFEEBC;
    box-sizing: border-box;
  }
}
</style>
