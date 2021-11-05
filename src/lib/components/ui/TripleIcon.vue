<template>
  <div class="triple-icon" :style="`--size: ${size}`">
    <img :height="size" :width="size" class="one" :src="`/images/icons/${name}.png`" :alt="name" :style="`--size: ${size}`" />
    <img :height="size" :width="size" class="two" :src="`/images/icons/${name}.png`" :alt="name" :style="`--size: ${size}`" />
    <img :height="size" :width="size" class="three" :src="`/images/icons/${name}.png`" :alt="name" :style="`--size: ${size}`" />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
        type: String,
        default: '12px'
    }
  },
};
</script>
<style lang="scss" scoped>
.triple-icon {
    display: flex;
    align-items: flex-end;
    height: var(--size);
}
.one {
  display: inline-block;
}
.two {
  display: inline-block;
  margin-left: calc(-1 * (var(--size) * 0.7));
}
.three {
  display: inline-block;
  margin-left: calc(-1 * (var(--size) * 0.7));
}
</style>
