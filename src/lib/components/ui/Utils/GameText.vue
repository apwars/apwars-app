<template>
  <span>
    <span v-if="header === 'h1'">
      <h1 class="text-h1 text-wGOLD">
        <slot></slot>
      </h1>
    </span>
    <span v-if="header === 'h2'">
      <h2 class="text-h2 text-wGOLD">
        <slot></slot>
      </h2>
    </span>
    <span v-if="header === 'h3'">
      <h2 class="text-h3 text-wGOLD">
        <slot></slot>
      </h2>
    </span>
    <span v-if="header === 'h4'">
      <h2 class="text-h4 text-wGOLD">
        <slot></slot>
      </h2>
    </span>
    <span v-if="header === 'h5'">
      <h2 class="text-h5 text-wGOLD">
        <slot></slot>
      </h2>
    </span>
    <span v-if="!header">
      <span class="text-wGOLD">
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: ["header"]
};
</script>

<style scoped>

</style>
