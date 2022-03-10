<template>
  <div class="war-badges">
    <div class="logo-container">
      <img class="logo" src="/images/wars.png" alt="Wars Badges" />
    </div>
    <div class="badges ml-md-2">
      <div class="badge">
        <img
          class="card"
          src="/images/nfts/war-memorable-victory.png"
          alt="Victorys"
        />
        <div class="value ml-1">{{ victorys }} Victorys</div>
      </div>
      <div class="badge">
        <img
          class="card"
          src="/images/nfts/war-memorable-death.png"
          alt="Losses"
        />
        <div class="value ml-1">{{ losses }} Losses</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    victorys: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    hasWins() {
      return this.victorys + this.losses > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.war-badges {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.logo-container {
  width: 320px;
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
  text-align: center;
}
.card {
  width: 32px;
}
</style>
