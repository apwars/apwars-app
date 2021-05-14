<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
export default {};
</script>

<style scoped>
span {
  color: white;
  font-weight: bold;
  font-size: 28px;
}

@media only screen and (max-width: 600px) {
  span {
    font-size: 18px;
  }
}
</style>
