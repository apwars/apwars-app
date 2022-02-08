<template>
  <div class="mt-1">
    <div class="phase-title">
      <div class="mb-1">{{ title }}</div>
      <Button
        :text="`Go to War Report ${phase === 'claim' ? 'and Claim Prizes' : ''}`"
        type="wsecondary"
        size="small"
        class="mb-1"
        :handleClick="goToReport"
      />
    </div>

    <div class="versus-bar" id="versus">
      <div class="corp" :style="`--corp:${getPercent(corpForce)}%`">
        <div class="standart">
          <img id="corp-flag" class="faction-icon left" src="/images/icons/corp.png" />
          <div class="crown" v-show="corpForce > 0 && corpForce >= degenForce">
            <v-img src="/images/icons/crown.png" />
            <div class="winner" v-if="isWarFinished">Winner!</div>
          </div>
        </div>
        <img
          class="battle-icon"
          height="42"
          width="42"
          src="/images/battle/battle-icon.png"
        />
        <div class="total-amount d-none d-sm-flex">
          <Amount :amount="corpForce" formatted compact decimals="2" symbol="Power Units" v-if="getPercent(corpForce) > 10" />
        </div>
      </div>
      <div class="degen" :style="`--degen:${getPercent(degenForce)}%`">
        <div class="standart">
          <img id="degen-flag" class="faction-icon right" src="/images/icons/degen.png" />
          <div class="crown" v-show="degenForce > 0 && degenForce > corpForce">
            <v-img src="/images/icons/crown.png" />
            <div class="winner" v-if="isWarFinished">Winner!</div>
          </div>
        </div>
        <div class="total-amount d-none d-sm-flex">
          <Amount :amount="degenForce" formatted compact decimals="2" symbol="Power Units" v-if="getPercent(degenForce) > 10" />
        </div>
      </div>
    </div>
    <div :class="['prizes', degenForce > corpForce ? 'invert' : '']" >
      <template v-if="phase !== 'not-started'">
      <div :class="['winner-prize', degenForce > corpForce ? 'invert' : '']">
        <div class="d-sm-none">Winner Prize</div>
        <IconInfo id="wgold-prize" iconPath="/images/wgold.png" title="PRIZE">
          <span class="prize-text"
            >~<Amount :amount="winnerAmount" formatted compact />
            <span class="game-text">wGOLD</span></span
          >
        </IconInfo>
        <IconInfo
          iconPath="/images/battle/burned.png"
          title="BURNED PRIZE"
          v-if="burnAmount"
        >
          <span class="prize-text"
            >~<Amount :amount="burnAmount" formatted compact />
            <span class="game-text">wGOLD</span></span
          >
        </IconInfo>
      </div>
      <div class="loser-prize">
        <div class="d-sm-none">Loser Prize</div>
        <IconInfo id="wcourage-prize" iconPath="/images/wcourage.png" title="Prize">
          <span class="prize-text"
            >~<Amount :amount="loserAmount" formatted compact />
            <span class="game-text-purple">wCOURAGE</span></span
          >
        </IconInfo>
      </div>
      </template>
    </div>
  </div>
</template>
<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import IconInfo from "@/lib/components/ui/IconInfo";
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    phase: {
      type: String,
      default: '',
    },
    corpForce: {
      type: Number,
      default: 0,
    },
    degenForce: {
      type: Number,
      default: 0,
    },
    winnerAmount: {
      type: Number,
      default: 0,
    },
    burnAmount: {
      type: Number,
      default: 0,
    },
    loserAmount: {
      type: Number,
      default: 0,
    },
  },
  components: { Amount, IconInfo, Button },
  computed: {
    totalFactionForces() {
      return this.corpForce + this.degenForce;
    },
    isWarFinished() {
      return this.phase === 'claim' || this.phase === 'finished';
    }
  },
  methods: {
    goToReport() {
      this.$router.push(`/war/report`);
    },
    getPercent(amount) {
      return (100 * amount) / this.totalFactionForces;
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
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
}
.versus-bar {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: gray;
}
.corp {
  height: 40px;
  background-color: #1c4844;
  display: inline-block;
  position: relative;
  width: var(--corp);
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
    z-index: 2;
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
    > .winner {
      position: absolute;
      top: 12px;
      font-weight: bold;
      color: yellow;
    }
    @media screen and (min-width: 768px) {
      width: 75px;
      top: -54px;
      left: -2px;
      > .winner {
        left: 80px;
      }
    }
  }
}
.degen {
  height: 40px;
  background-color: #45722c;
  display: inline-block;
  position: relative;
  width: var(--degen);
  .faction-icon {
    position: absolute;
    top: -14px;
    right: -21px;
    width: 96px;
    z-index: 2;
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
    > .winner {
      position: absolute;
      top: 12px;
      font-weight: bold;
      color: yellow;
    }
    @media screen and (min-width: 768px) {
      width: 75px;
      top: -52px;
      right: -16px;
      > .winner {
        right: 80px;
      }
    }
  }
}
.prizes {
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 68px;
  min-height: 48px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    &.invert {
      flex-direction: row-reverse;
    }
    .winner-prize {
      display: flex;
      &.invert {
        flex-direction: row-reverse;
      }
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
