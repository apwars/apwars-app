<template>

    <div class="progress" :style="`--trail: ${trailColor};--border: ${borderColor}`">
      <div class="value" :style="`--percent: ${percent};--fill: ${fillColor}`"><div class="text" :style="`--textColor: ${textColor}`" v-if="!noText"> {{ label || percent }} </div></div>
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
        default: '#FFF'
    },
    borderColor: {
      type: String,
      default: '#BB7248',
    },
    trailColor: {
      type: String,
      default: '#503522'
    },
    fillColor: {
      type: String,
      default: '#00C42B',
    },
    label: {
      type: String,
      default: ''
    },
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
  height: 100%;
  width: 100%;
  border: 1px solid var(--border);
  background-color: var(--trail);
  border-radius: 2px;
}
.value {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--percent);
  background-color: var(--fill);
  display: flex;
  justify-content: center;
  align-items: center;
  > .text {
    color: var(--textColor);
    font-weight: 700;
    font-size: 10px;
  }
}
</style>
