<template>
  <div class="lp-meter">
    <div class="scale-label">
      <img
        :class="[!level ? 'gray' : '']"
        src="/images/lp-levels/0.png"
        height="24"
      />
      <img
        :class="[level < 2 ? 'gray' : '']"
        src="/images/lp-levels/3.png"
        height="24"
      />
      <img
        :class="[level !== 5 ? 'gray' : '']"
        src="/images/lp-levels/5.png"
        height="24"
      />
    </div>
    <div class="scale">
      <div class="scale-track">
        <div class="arrow-down" :style="`--position:${arrowPosition}`"></div>
      </div>
      <div class="numbers">
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
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
    amount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    arrowPosition() {
      const liquidityMap = {
        0: 0,
        1: 10,
        2: 50,
        3: 100,
        4: 500,
        5: 1000,
      };
      const positionMap = {
        0: 0,
        1: 19.8,
        2: 39.6,
        3: 59.2,
        4: 78.8,
        5: 99,
      };

      let finalPosition = 0;
      if (this.level === 5) {
        finalPosition = positionMap[5];
      } else {
        const nextLevel = this.level + 1;
        const positionBase = positionMap[this.level];
        const positionUntilNextLevel = positionMap[nextLevel] - positionBase;

        const liquidityUntilNextLevel =
          liquidityMap[nextLevel] - liquidityMap[this.level];
        const remainingLiquidity = this.amount - liquidityMap[this.level];

        const percent = remainingLiquidity / liquidityUntilNextLevel;
        const partial = positionUntilNextLevel * percent;
        finalPosition = positionBase + partial;
      }

      return finalPosition.toFixed(1) + "%";
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
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid #ffeebc;
  transition: left 1s ease;
  left: var(--position);
}
.gray {
  filter: grayscale(1);
}
</style>
