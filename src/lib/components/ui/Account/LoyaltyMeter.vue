<template>
  <div class="lp-meter">
    <div class="scale-label">
      <img src="/images/lp-levels/0.png" height="24" />
      <img src="/images/lp-levels/3.png" height="24" />
      <img src="/images/lp-levels/4.png" height="24" />
    </div>
    <div class="scale">
      <div class="scale-track">
        <div
          class="arrow-down"
          :style="`--position:${arrowPosition[level]}`"
        ></div>
      </div>
      <div class="numbers">
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    level: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    arrowPosition() {
      return {
        2: "0%",
        1: "24.8%",
        2: "49.6%",
        2: "74.4%",
        2: "99.2%",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.scale-label {
  display: flex;
  justify-content: space-between;
}
.scale {
  margin-top: 21px;
}
.scale-track {
  position: relative;
  border-bottom: 2px solid #ffeebc;
}
.numbers {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
}
.arrow-down {
    box-sizing: border-box;
  position: absolute;
  width: 0;
  height: 0;
  z-index: 0;
  top: -10px;
  left: var(--position);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid #ffeebc;
  transition: all ease;
}
</style>
