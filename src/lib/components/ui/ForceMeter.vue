<template>
  <div class="force-meter">
    <div class="base">
      <img class="force" src="/images/icons/force.png" alt="force-1" />
      <img class="force" src="/images/icons/force.png" alt="force-2" />
      <img class="force" src="/images/icons/force.png" alt="force-3" />
      <img class="force" src="/images/icons/force.png" alt="force-4" />
      <img class="force" src="/images/icons/force.png" alt="force-5" />
    </div>
    <div class="active" :style="`--percent: ${percent}`" v-show="value > 0">
      <img
        class="force"
        src="/images/icons/force-active.png"
        alt="force-1-active"
      />
      <img
        class="force"
        src="/images/icons/force-active.png"
        alt="force-2-active"
      />
      <img
        class="force"
        src="/images/icons/force-active.png"
        alt="force-3-active"
      />
      <img
        class="force"
        src="/images/icons/force-active.png"
        alt="force-4-active"
      />
      <img
        class="force"
        src="/images/icons/force-active.png"
        alt="force-5-active"
      />
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
  computed: {
      percent() {
        return (100 * this.value) / this.maxScale.toString() + '%'
      }
  }
};
</script>
<style lang="scss" scoped>
.force-meter {
    position: relative;
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
    height: 46px;
    width: var(--percent);
    white-space: nowrap;
    overflow: hidden;
    transition: all 1s ease;
}
</style>
