<template>
  <div>
    <div class="phase-title">
      <div>Parcial Result</div>
      <Button text="Go to War Report" type="wtertiary" :handleClick="goToReport" />
    </div>

    <div class="versus-bar">
      <div class="corp">
        <div class="standart">
        <img class="faction-icon left" src="/images/icons/corp.png" />
        <div class="crown">
          <v-img src="/images/icons/crown.png" />
        </div>
        </div>
        <img
          class="battle-icon"
          height="42"
          width="42"
          src="/images/battle/battle-icon.png"
        />
        <div class="total-amount d-none d-sm-flex"><Amount :amount="1555555555555555555555" formatted compact symbol="Power Units"/></div>
      </div>
      <div class="degen">
        <div class="standart">
        <img class="faction-icon right" src="/images/icons/degen.png" />
        <div class="crown" v-show="1 == 2">
          <v-img src="/images/icons/crown.png" />
        </div>
        </div>
        <div class="total-amount d-none d-sm-flex"><Amount :amount="1555555555555555555555" formatted compact symbol="Power Units" /></div>
      </div>
    </div>
    <div class="prizes">
      <div class="winner-prize">
        <div class="d-sm-none">Winner Prize</div>
        <IconInfo iconPath="/images/wgold.png" title="Unlocked Prize">
          <span class="prize-text">~<Amount :amount="1555555555555555555555" formatted compact /> <span class="game-text">wGOLD</span></span>
        </IconInfo>
        <IconInfo iconPath="/images/battle/burned.png" title="Unlocked Prize">
          <span class="prize-text">~<Amount :amount="1555555555555555555555" formatted compact /> <span class="game-text">wGOLD</span></span>
        </IconInfo>
      </div>
      <div class="loser-prize">
        <div class="d-sm-none">Loser Prize</div>
        <IconInfo iconPath="/images/wcourage.png" title="Unlocked Prize">
          <span class="prize-text">~<Amount :amount="1555555555555555555555" formatted compact /> <span class="game-text-purple">wCOURAGE</span></span>
        </IconInfo>
      </div>
    </div>
  </div>
</template>
<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import IconInfo from "@/lib/components/ui/IconInfo";
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  components: { Amount, IconInfo, Button },
  methods: {
    goToReport() {
      this.$router.push(`/wars/${this.$route.params.contractWar}/report`);
    },
  },
};
</script>
<style lang="scss" scoped>
.phase-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.4;
}
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
    left: -21px;
    width: 96px;
    @media screen and (min-width: 768px) {
      width: 115px;
      right: -34px;
      top: -18px;
    }
  }
  .crown {
  position: absolute;
  top: -48px;
  left: -10px;
  width: 71px;
  @media screen and (min-width: 768px) {
    width: 75px;
      top: -54px;
    left: -2px;
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
    top: -14px;
    right: -21px;
    width: 96px;
    @media screen and (min-width: 768px) {
      width: 115px;
      right: -34px;
      top: -18px;
    }
  }
  .crown {
  position: absolute;
  top: -48px;
  right: -10px;
  width: 71px;
  @media screen and (min-width: 768px) {
    width: 75px;
      top: -52px;
  right: -16px;
  }
}
}
.prizes {
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 62px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    .winner-prize {
      display: flex;
      > div {
        margin-right: 6px;
      }
    }
  }
  @media screen and (min-width: 1440px) {
    padding: 0 64px;
  }
}
.prize-text {
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
}
.game-text {
  background: -webkit-linear-gradient(#ffb800, #ead200);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.game-text-purple {
  color: #5c62eb;
}
.total-amount {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
}
.standart {
  position: relative;
}
</style>