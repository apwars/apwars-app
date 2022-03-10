<template>
  <div class="tmj-badges">
    <img
      class="logo"
      src="/images/tmj.png"
      alt="The Monstrous Journey Badges"
    />
    <div class="badges ml-md-2">
      <div class="badge d-flex align-center">
        <img class="place" src="/images/game/icon-place-1.png" alt="First Places" />
        <div class="value ml-1">x{{ podiums[0] }}</div>
      </div>
      <div class="badge d-flex align-center">
        <img class="place" src="/images/game/icon-place-0.png" alt="Second Places" />
        <div class="value ml-1">x{{ podiums[1] }}</div>
      </div>
      <div class="badge d-flex align-center">
        <img class="place" src="/images/game/icon-place-2.png" alt="Third Places" />
        <div class="value ml-1">x{{ podiums[2] }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    podiums: {
      type: Array,
      default: () => [0, 0, 0],
    },
  },
  computed: {
    hasWins() {
      return this.podiums.reduce((total, wins) => (total += wins), 0) > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.tmj-badges {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
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
    width: 260px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.place {
    height: 32px;
    width: 32px;
}
</style>
