<template>
  <div class="arcadia-badges">
    <div class="logo-container">
      <img
        class="logo"
        src="/images/arcadia-expansion.png"
        alt="Arcadia Badges"
      />
    </div>
    <div class="ml-2 value" v-if="!hasProperties">No properties</div>
    <div class="badges ml-md-2" v-else>
      <div class="badge d-flex align-center" v-if="lands > 0">
        <img class="asset" src="/images/foundations/1.png" alt="Lands" />
        <div class="value ml-1">x{{ lands }} Lands</div>
      </div>
      <div class="badge d-flex align-center ml-2" v-if="villages > 0">
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
  computed: {
    hasProperties() {
      return this.lands + this.villages > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.arcadia-badges {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
}
.logo-container {
  width: 200px;
  flex-shrink: 0;
}
.logo {
  height: 62px;
}
.value {
  font-weight: 700;
  font-size: 18px;
  line-height: 1.3;
}
.badges {
  width: 100%;
  max-width: 320px;
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
