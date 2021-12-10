<template>
  <div class="force-meter">
    <div class="base">
      <img v-for="i in ticks"
        :key="i" class="force" :src="asset" :alt="`force-${i}`" />
    </div>
    <div :class="['active', [color]]" :style="`--percent: ${percent}`" v-show="value > 0">
      <img
        v-for="i in ticks"
        :key="i"
        class="force"
        :src="activeAsset"
        :alt="`force-${i}-active`"
        />
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
    color: {
      type: String,
      validator: (value) => {
        const supportedColors = ['wgreen', 'wyellow'];
        return supportedColors.includes(value);
      },
      default: '',
    },
    type: {
      type: String,
      default: '',
    }
  },
  computed: {
    percent() {
      return (100 * this.value) / this.maxScale.toString() + "%";
    },
    asset() {
      if (this.type === 'flat') {
        return "/images/icons/stat-point.png"
      }
      return "/images/icons/force.png"
    },
    activeAsset() {
      if (this.type === 'flat') {
        return "/images/icons/stat-active.png"
      }
      return "/images/icons/force-active.png"
    }

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
.force {
  display: inline-block;
  &:not(:first-child) {
    margin-left: 2px;
  }
}
.active {
  position: absolute;
  top: 0;
  width: var(--percent);
  white-space: nowrap;
  overflow: hidden;
  transition: all 1s ease;
  &.wyellow {
    filter: hue-rotate(200deg);
  }
  &.wgreen {
    filter: hue-rotate(260deg);
  }
}
</style>
