<template>
  <div>
    <div class="pack-container" :style="`background-image: url('${bg}');`">
      <div :class="['gem-container', [theme]]">
        <img class="gem" :src="gem" :alt="theme" />
      </div>
      <div :class="['pack-title', [theme]]">{{ pack.title }}</div>
      <div class="pack-content">
        <div class="units-container">
          <div class="tier-container" v-for="tier in tiers" :key="tier">

          
          <div class="unit-container" v-for="unit in getTierUnits(tier)" :key="unit.id">
            <v-img
              :src="`/images/troops/${unit.name.toLowerCase()}-portrait.png`"
              :alt="unit.name"
              width="112"
            />
            <div class="unit-name text-center mt-1">{{ unit.displayName }}</div>
            <div class="amount">x{{ pack.units[unit.name] || 0}}</div>
          </div>
          </div>
        </div>
        <div class="additional-info mt-3">
          <div :class="['bonus-container']">
            <div class="bonus-text">Bonus:</div>
            <div class="items-container">
            <Reward v-for="item in Object.keys(pack.items)" :key="item" size="large" :prize="item" :amount="pack.items[item]" />
          </div>
          <div class="total-power d-flex align-center">
            <img src="/images/icons/wars.png" width="64" height="64" alt="Power units"/>
          <div class="ml-1">
            <div class="total-power-title">TOTAL POWER UNITS</div>
            <div class="total-power-value"><Amount :amount="totalForce" formatted/></div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['pack-price-container', [theme]]">
      <img class="chest" :src="chest" :alt="theme" />
      <div class="price-container d-flex align-center">
      <div class="price-text mr-1"><Amount :amount="pack.price.amount" formatted/></div>
      <img
        :src="`/images/${pack.price.symbol.toLowerCase()}.png`"
        :alt="pack.price.symbol"
        height="32"
      />
      <div class="token-text">{{ pack.price.symbol }}</div>
      </div>
      <div class="remaining-text">
        Remaining Packs {{ pack.remainingAmount }}
      </div>
      <div class="buy-button-container">
        <Button type="whot" text="Buy this pack" :handleClick="() => handleBuy(pack.package)" :isLoading="isLoadingBuy" isBlock/>
      </div>
    </div>
  </div>
</template>
<script>
import { getTroopByName } from "@/data/Troops";
import { getCollectibleById } from "@/data/Collectibles";

import Button from "@/lib/components/ui/Buttons/Button";
import Reward from "@/lib/components/ui/Reward";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Button, Reward, Amount },
  props: {
    pack: {
      type: Object,
      default: null,
    },
    theme: {
      type: String,
      default: 'blue-theme',
    },
    handleBuy: {
      type: Function,
      default: () => {}
    },
    isLoadingBuy: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    gem() {
      if (this.theme === "red-theme") {
        return "/images/icons/stone-red.png";
      }
      if (this.theme === "green-theme") {
        return "/images/icons/stone-green.png";
      }
      if (this.theme === "light-green-theme") {
        return "/images/icons/stone-light-green.png";
      }

      return "/images/icons/stone-blue.png";
    },
    bg() {
      if (this.theme === "red-theme") {
        return "/images/background/red-desert.jpg";
      }
      if (this.theme === "green-theme") {
        return "/images/background/green-swamp.jpg";
      }

      return "/images/background/blue-woods.png";
    },
    chest() {
      if (this.theme === "red-theme") {
        return "/images/icons/red-chest.webp";
      }
      if (this.theme === "green-theme") {
        return "/images/icons/green-chest.png";
      }

      return "/images/icons/blue-chest.webp";
    },
    gameItems() {
      return Object.keys(this.pack.items).map(c => getCollectibleById(c.replace(/\D/g, ""))) || [];
    },
    raceUnits() {
      return Object.keys(this.pack.units).map(troopName => getTroopByName(troopName)) || [];
    },
    totalForce() {
      let totalUnitsForce = this.raceUnits.reduce((t, unit) => {
        t = t + unit.strength;
        t = t + unit.defense;
        return t;
      }, 0);
      const totalForce = this.gameItems.reduce((t, gameItem) => {
        t = t + gameItem.strength;
        t = t + gameItem.defense;
        return t;
      }, totalUnitsForce);
      return totalForce;
    },
  },
  data() {
    return {
      tiers: [1, 2, 3, 4],
    }
  },
  methods: {
    getTierUnits(tier) {
      return this.raceUnits.filter(u => u.tier === tier);
    }
  },
};
</script>
<style lang="scss" scoped>
.pack-container {
  position: relative;
  min-height: 420px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 2px solid #ffeebc;
  padding: 12px;
  background-size: cover;
  background-origin: border-box;
  @media screen and (min-width: 1024px) {
    padding: 42px 80px;
  }
}
.blue-theme {
  background: #002B4C;
  border: 2px solid #FFEEBC;
}
.green-theme {
  background: #194B29;
  border: 2px solid #FFEEBC;
}
.red-theme {
  background: #300A00;
  border: 2px solid #FFEEBC;
}
.light-green-theme {
  background: #006F4D;
  border: 2px solid #FFEEBC;
}

.price-container {
  @media screen and (min-width: 1266px) {
    margin-right: 36px;
  }
}

.pack-price-container {
  position: relative;
  min-height: 80px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 36px;
  @media screen and (min-width: 1266px) {
    padding: 0 32px;
    flex-direction: row;
  }
  &.blue-theme {
    @extend .blue-theme;
  }
  &.green-theme {
    @extend .green-theme;
  }
  &.red-theme {
    @extend .red-theme;
  }
}
.bonus-info {
  &.blue-theme {
    @extend .blue-theme;
  }
  &.green-theme {
    @extend .green-theme;
  }
  &.red-theme {
    @extend .red-theme;
  }
}
.gem-container {
  position: absolute;
  top: -24px;
  left: -24px;
  height: 48px;
  width: 48px;
  border: 2px solid #FFEEBC;
  box-sizing: border-box;
  border-radius: 10px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1024px) {
    top: -36px;
    left: -36px;
    height: 72px;
    width: 72px;
  }
  &.blue-theme {
    @extend .blue-theme;
  }
  &.green-theme {
    @extend .green-theme;
  }
  &.light-green-theme {
    @extend .green-theme;
  }
  &.red-theme {
    @extend .red-theme;
  }
}
.gem {
  width: 34px;
  height: 34px;;
  transform: rotate(-45deg);
  position: absolute;
  animation: 3s ease-in-out gem-floating infinite;
  @media screen and (min-width: 1024px) {
    height: 68px;
    width: 68px;
  }
}
.chest {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  height: 48px;
  width: 48px;
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    height: 196px;
    width: 196px;
  }
}
.pack-info {
  margin-right: 16px;
}

.pack-content {
  width: 100%;
}

.tier-container {
  display: flex;
}

.pack-title {
  font-weight: bold;
  font-size: 21px;
  line-height: 1;
  position: absolute;
  border-radius: 10px;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  white-space: nowrap;
  @media screen and (min-width: 1024px) {
    font-size: 36px;
    width: 360px;
  }
}
.pack-subtitle {
  font-weight: normal;
  font-size: 14px;
  line-height: 1.5;
}
.remaining-text {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  margin: 6px 0;
  @media screen and (min-width: 1266px) {
    margin: 0 12px;
  }
}
.price-text {
  font-weight: bold;
  font-size: 32px;
  line-height: 64px;
  text-align: center;
  color: #ffb800;
  @media screen and (min-width: 1024px) {
    font-size: 48px;
  }
}
.token-text {
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  color: #ffffff;
  @media screen and (min-width: 1024px) {
    font-size: 22px;
  }
}
.units-container {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  width: 100%;
}
.unit-name {
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
}
.total-power-value {
  font-size: 36px;
  color: #FFB800;
  font-weight: 700;
  text-align: center;
  text-align: center;
}

.total-power-title {
  font-size: 16px;
  line-height: 1.4;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  text-align: center;
}
.bonus-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  
  width: 100%;
  @media screen and (min-width: 1266px) {
    flex-direction: row;
    padding: 6px 12px;
  }
}
.bonus-text {
  font-weight: bold;
  font-size: 32px;
  line-height: 42px;
}
.additional-info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.items-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  @media screen and (min-width: 1266px) {
    width: auto;
    margin: 0 12px;
  }
}
.amount {
  font-weight: bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
}

.buy-button-container {
  width: 138px;
}

@keyframes gem-floating {
  0% {
    transform: rotate(-45deg) translateY(0);
  }

  25% {
    transform: rotate(-45deg) translateY(4px);
  }

  75% {
    transform: rotate(-45deg) translateY(-4px);
  }

  100% {
    transform: rotate(-45deg) translateY(0);
  }

}
</style>
