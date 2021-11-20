<template>
  <div class="versus-bar">
    <div class="corp">
      <img class="faction-icon left" src="/images/icons/corp.png" />
      <img
        class="battle-icon"
        height="42"
        width="42"
        src="/images/battle/battle-icon.png"
      />
    </div>
    <div class="degen">
      <img class="faction-icon right" src="/images/icons/degen.png" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.versus-bar {
  width: 100%;
  height: 40px;
  position: relative;
}
.corp {
  height: 40px;
  background-color: #1c4844;
  display: inline-block;
  position: relative;
  width: 50%;
  > .battle-icon {
    position: absolute;
    right: -21px;
    bottom: 0;
    z-index: 1;
  }
  .faction-icon {
    position: absolute;
    top: -12px;
    left: -32px;
    width: 64px;
    @media screen and (min-width: 1440px) {
        width: 98px;
        left: -49px;
    }
  }
}
.degen {
  height: 40px;
  background-color: #45722c;
  display: inline-block;
  position: relative;
  width: 50%;
  .faction-icon {
    position: absolute;
    top: -12px;
    right: -32px;
    width: 64px;
    @media screen and (min-width: 1440px) {
        width: 98px;
        right: -49px;
    }
  }
}
</style>
