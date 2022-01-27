<template>
  <div>
    <div class="pack-container" :style="`background-image: url('${bg}');`">
      <div :class="['gem-container', [variant]]">
        <img class="gem" :src="gem" :alt="variant" />
      </div>
      <div class="pack-title">{{ pack.title }}</div>
      <div class="pack-content">
        <div class="units-container">
          <div class="tier-container" v-for="tier in tiers" :key="tier">

          
          <div class="unit-container" v-for="unit in getTierUnits(tier)" :key="unit.id">
            <v-img
              :src="`/images/troops/${unit.name.toLowerCase()}-portrait.png`"
              :alt="unit.name"
              width="112"
            />
            <div class="unit-name text-center mt-1">{{ unit.name }}</div>
            <div class="amount">x{{ pack.units[unit.id] || 0}}</div>
          </div>
          </div>
        </div>
        <div class="additional-info mt-3">
          <div :class="['bonus-container']">
            <div class="bonus-text mr-4">Bonus:</div>
            <div class="items-container">
            <GameItem size="large" :rewardId="29" :amount="1" />
            <GameItem size="large" :rewardId="34" :amount="1" />
          </div>
          <div class="total-power ml-4">
            <div>TOTAL POWER</div>
            <div>480.000,00</div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['pack-price-container', [variant]]">
      <img class="chest" :src="chest" :alt="variant" />
      <div class="price-text mr-1">{{ format(pack.price) }}</div>
      <img
        :src="`/images/${pack.token.toLowerCase()}.png`"
        :alt="pack.token"
        height="32"
      />
      <div class="token-text mr-4">{{ pack.token }}</div>
      <div class="remaining-text mr-2">
        Remaining Packs {{ pack.remaining }}
      </div>
      <Button type="whot" text="Buy this pack" />
    </div>
  </div>
</template>
<script>
import { getTroops } from "@/data/Troops";

import Button from "@/lib/components/ui/Buttons/Button";
import GameItem from "@/lib/components/ui/GameItem";

export default {
  components: { Button, GameItem },
  props: {
    pack: {
      type: Object,
      default: null,
    },
  },
  computed: {
    gem() {
      if (this.variant === "red") {
        return "/images/icons/stone-red.png";
      }
      if (this.variant === "green") {
        return "/images/icons/stone-green.png";
      }
      if (this.variant === "light-green") {
        return "/images/icons/stone-light-green.png";
      }

      return "/images/icons/stone-blue.png";
    },
    bg() {
      if (this.variant === "red") {
        return "/images/background/red-desert.jpg";
      }
      if (this.variant === "green") {
        return "/images/background/green-swamp.jpg";
      }

      return "/images/background/blue-woods.png";
    },
    chest() {
      if (this.variant === "red") {
        return "/images/icons/red-chest.webp";
      }
      if (this.variant === "green") {
        return "/images/icons/green-chest.png";
      }

      return "/images/icons/blue-chest.webp";
    },
    raceUnits() {
      return getTroops().filter((t) => t.race === this.pack.race);
    },
    variant() {
      return this.pack.theme || "blue";
    },
  },
  data() {
    return {
      tiers: [1, 2, 3, 4],
    }
  },
  methods: {
    format(value) {
      return new Intl.NumberFormat("en-US").format(value);
    },
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
  border: 1px solid #ffeebc;
  padding: 8px 80px;
  background-size: cover;
  background-origin: border-box;
}
.blue {
  background: linear-gradient(to top, #1e2126 0%, #006fc4 100%);
}
.green {
  background: linear-gradient(to top, #205330 0%, #192417 100%);
}
.red {
  background: linear-gradient(to top, #1b0500 0%, #3b180d 100%);
}
.light-green {
  background: linear-gradient(to top, #093952 0%, #028E64 100%);
}
.pack-price-container {
  position: relative;
  min-height: 80px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 32px;
  justify-content: flex-end;
  margin-bottom: 36px;
  &.blue {
    @extend .blue;
  }
  &.green {
    @extend .green;
  }
  &.red {
    @extend .red;
  }
}
.bonus-info {
  &.blue {
    @extend .blue;
  }
  &.green {
    @extend .green;
  }
  &.red {
    @extend .red;
  }
}
.gem-container {
  position: absolute;
  top: -36px;
  left: -36px;
  height: 72px;
  width: 72px;
  border: 2px solid #ffeebc;
  box-sizing: border-box;
  border-radius: 10px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    transform: rotate(-45deg);
  }
  &.blue {
    @extend .blue;
  }
  &.green {
    @extend .green;
  }
  &.red {
    @extend .red;
  }
}
.chest {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
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
  font-size: 36px;
  line-height: 1.4;
  text-transform: uppercase;
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
}
.price-text {
  font-weight: bold;
  font-size: 48px;
  line-height: 64px;
  text-align: center;
  color: #ffb800;
}
.token-text {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;
}
.units-container {
  display: flex;
  justify-content: space-between;
}
.unit-name {
  font-size: 8px;
}
.total-power {
  font-size: 22px;
  color: #FFB800;
  font-weight: 700;
  text-align: center;
}
.bonus-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 6px 12px;
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
  align-items: center;
}
.amount {
  font-weight: bold;
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
}
</style>
