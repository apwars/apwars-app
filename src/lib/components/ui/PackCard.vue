<template>
  <div>
    <div class="pack-container" :style="`background-image: url('${bg}');`">
      <div :class="['gem-container', [variant]]">
        <img class="gem" :src="gem" :alt="variant" />
      </div>
      <div class="pack-info">
        <div class="pack-title text-center">{{ title }}</div>
        <div class="pack-subtitle text-center">{{ subtitle }}</div>
      </div>
      <div class="divider"></div>
      <div class="pack-content">
        <div class="units-container">
          <div class="unit-container" v-for="unit in raceUnits" :key="unit.id">
            <v-img
              :src="`/images/troops/${unit.name.toLowerCase()}-portrait.png`"
              :alt="unit.name"
              width="112"
            />
            <div class="unit-name text-center mt-1">{{ unit.name }}</div>
          </div>
        </div>
        <div class="additional-info mt-3">
          <div class="items-container"></div>
          <div class="bonus-info">
          <div :class="['bonus-container', [variant]]">
            <div class="bonus-text mr-2">Bonus:</div>
            <div class="tokens">
              <div class="d-flex align-center">
                <img src="/images/wcourage.png" alt="wcourage" width="48" />
                <div class="token-text ml-1">2,650 wCOURAGE</div>
              </div>
              <div class="d-flex align-center mt-2">
                <img src="/images/wgold.png" alt="wgold" width="48" />
                <div class="token-text ml-1">600 wGOLD</div>
              </div>
            </div>
          </div>
          <div class="bonus-chance text-center mt-1">You have 0,7% chance rare item</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['pack-price-container', [variant]]">
      <img class="chest" :src="chest" :alt="variant" />
      <div class="price-text mr-1">50.000</div>
      <img src="/images/wgold.png" :alt="wGOLD" height="32" />
      <div class="token-text mr-4">wGOLD</div>
      <div class="remaining-text mr-2">Remaining Packs 100</div>
      <Button type="whot" text="Buy this pack" />
    </div>
  </div>
</template>
<script>
import { getTroops } from "@/data/Troops";

import Button from "@/lib/components/ui/Buttons/Button";
export default {
  components: { Button },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "blue",
    },
    race: {
      type: Number,
      default: 1,
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
        return "/images/icons/red-chest.png";
      }
      if (this.variant === "green") {
        return "/images/icons/green-chest.png";
      }

      return "/images/icons/blue-chest.png";
    },
    raceUnits() {
      return getTroops().filter((t) => t.race === this.race);
    },
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
  padding: 18px 50px;
  background-size: cover;
  display: flex;
  justify-content: space-between;
}
.blue {
  background: linear-gradient(to top, #1e2126 0%, #006fc4 100%);
  background-origin: border-box;
  border: 1px solid #ffeebc;
}
.green {
  background: linear-gradient(to top, #205330 0%, #192417 100%);
  background-origin: border-box;
  border: 1px solid #ffeebc;
}
.red {
  background: linear-gradient(to top, #1b0500 0%, #3b180d 100%);
  background-origin: border-box;
  border: 1px solid #ffeebc;
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
.pack-title {
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
}
.pack-subtitle {
  font-weight: normal;
  font-size: 28px;
  line-height: 37px;
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
}
.unit-name {
  font-size: 8px;
}
.divider {
  border-right: 2px solid #ffeebc;
}
.bonus-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 12px 24px;
}
.bonus-text {
  font-weight: bold;
  font-size: 32px;
  line-height: 42px;
}
.additional-info {
  display: flex;
  justify-content: space-between;
}
.bonus-chance {
  font-weight: bold;
font-size: 22px;
line-height: 29px;
text-align: center;
color: #FFEEBC;
}
</style>
