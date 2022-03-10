<template>
  <div class="arcadia-badges">
    <img
      class="logo"
      src="/images/arcadia-expansion.png"
      alt="Arcadia Badges"
    />
    <div class="badges ml-md-2">
      <div class="badge d-flex align-center">
        <img class="asset" src="/images/foundations/1.png" alt="Lands" />
        <div class="value ml-1">x{{ lands }} Lands</div>
      </div>
      <div class="badge d-flex align-center ml-2">
        <img class="asset" src="/images/foundations/62.png" alt="Villages" />
        <div class="value ml-1">x{{ villages }} Villages</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lands: {
      type: Number,
      default: 0,
    },
    villages: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss" scoped>
.arcadia-badges {
  display: flex;
  align-items: center;
  width: 100%;
}
.logo {
  height: 64px;
}
.value {
  font-weight: 700;
  font-size: 18px;
  line-height: 1.3;
}
.badges {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.badge {
    display: flex;
    align-items: center;
}
.asset {
    width: 48px;
}
</style>
