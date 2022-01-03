<template>

    <div class="progress" :style="`--color1: ${color1};--color2: ${color2}`">
      <div class="value" :style="`--percent: ${percent}`"><div class="text" :style="`--color: ${textColor}`" v-if="!noText"> {{ value }}% </div></div>
    </div>

</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    maxScale: {
      type: Number,
      default: 0,
    },
    noText: {
        type: Boolean,
        default: false
    },
    textColor: {
        type: String,
        default: '#3a2720'
    },
    color1: {
        type: String,
        default: '#faff00'
    },
    color2: {
        type: String,
        default: '#E1A807'
    }
  },
  computed: {
    percent() {
      return (100 * this.value) / this.maxScale.toString() + "%";
    },
  },
};
</script>
<style lang="scss" scoped>
.progress {
  position: relative;
  height: 24px;
  width: 100%;
  border: 2px solid var(--color2);
}
.value {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--percent);
  background: linear-gradient(180deg, var(--color1) 0%, var(--color2) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  > .text {
    color: var(--color);
    font-weight: 700;
    font-size: 14px;
  }
}
</style>
