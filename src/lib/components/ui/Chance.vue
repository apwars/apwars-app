<template>
  <div class="chance-container">
    <div class="text mb-1">{{ description }} chance {{ totalPoolChance }}</div>
    <div class="scale mb-1">
      <div class="min text">
        {{ minLabel }}
      </div>
      <div class="max text">
        {{ maxLabel }}
      </div>
    </div>
    <div class="base">
      <div
        class="active"
        :style="`--percent: ${percent}`"
        v-show="value > 0"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      default: "",
    },
    minLabel: {
      type: String,
      default: "",
    },
    maxLabel: {
      type: String,
      default: "",
    },
    maxChance: {
      type: Number,
      default: 0,
    },
    maxScale: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    percent() {
      return (100 * this.value) / this.maxScale + "%";
    },
    totalPoolChance() {
      const totalPoolChance = (100 * this.value) / this.maxScale;
      let poolChance = (totalPoolChance / 100) * this.maxChance;

      return poolChance.toFixed(2) + "%";
    },
  },
};
</script>
<style lang="scss" scoped>
.chance-container {
  position: relative;
  width: 100%;
  margin: 12px 0;
  .scale {
    display: flex;
    justify-content: space-between;
  }

  .base {
    background-color: #bb7248;
    outline: 1px solid #ffeebc;
    height: 8px;
    position: relative;
    .active {
      position: absolute;
      top: 0;
      height: 8px;
      width: var(--percent);
      white-space: nowrap;
      overflow: hidden;
      transition: all 1s ease;
      background-color: #11d300;
      &:after {
        content: "";
      }
    }
  }
}

.text {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;

  color: #ffffff;
}
</style>
