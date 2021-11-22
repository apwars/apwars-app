<template>
  <div>
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
      <v-col class="corp-prize d-flex justify-space-between">
        <IconInfo iconPath="/images/wgold.png" title="Unlocked Prize">
          <Amount :amount="1555555555555555555555" formatted compact />
        </IconInfo>
        <IconInfo iconPath="/images/battle/burned.png" title="Unlocked Prize">
          <Amount
            :amount="1555555555555555555555"
            formatted
            compact
          /> </IconInfo
      >
      </v-col>
      <v-col class="degen-prize d-flex justify-space-between"
        ><div class="info-placeholder"></div><IconInfo iconPath="/images/wcourage.png" title="Unlocked Prize">
          <Amount
            :amount="1555555555555555555555"
            formatted
            compact
          /> </IconInfo
      ></v-col>
    </div>
  </div>
</template>
<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import IconInfo from "@/lib/components/ui/IconInfo";

export default {
  components: { Amount, IconInfo },
};
</script>
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
    top: -14px;
    left: -32px;
    width: 98px;
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
    top: -14px;
    right: -32px;
    width: 98px;
    @media screen and (min-width: 1440px) {
      width: 98px;
      right: -49px;
    }
  }
}
.prizes {
  width: 100%;
  display: flex;
  .corp-prize {
    width: 50%;
  }
  .degen-prize {
    width: 50%;
  }

}
</style>
