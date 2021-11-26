<template>
  <div>
    <div class="phase-title">
      <div>Parcial Result</div>
      <Button text="Battle Report" type="wtertiary" :handleClick="goToReport" />
    </div>

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
    <div class="prizes">
      <div class="winner-prize">
        <div class="d-sm-none">Winner Prize</div>
        <IconInfo iconPath="/images/wgold.png" title="Unlocked Prize">
          <Amount :amount="1555555555555555555555" formatted compact />
        </IconInfo>
        <IconInfo iconPath="/images/battle/burned.png" title="Unlocked Prize">
          <Amount :amount="1555555555555555555555" formatted compact />
        </IconInfo>
      </div>
      <div class="loser-prize">
        <div class="d-sm-none">Loser Prize</div>
        <IconInfo iconPath="/images/wcourage.png" title="Unlocked Prize">
          <Amount :amount="1555555555555555555555" formatted compact />
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
    right: -21px;
    width: 96px;
    @media screen and (min-width: 768px) {
      width: 115px;
      right: -34px;
      top: -18px;
    }
  }
}
.prizes {
  width: 100%;
  margin-top: 12px;
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
</style>
