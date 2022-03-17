<template>
  <div>
    <div class="title-container">
      <div class="lp-title">Loyalty Program</div>
      <div class="lp-levels">
        <v-skeleton-loader
          v-if="isLoading"
          type="image"
          width="90px"
          height="32px"
        />
        <template v-else>
          <div class="pool">
            <img
              class="token"
              height="40"
              width="40"
              src="/images/wgold.png"
              alt="wGOLD Pool"
            />
            <img
              height="70"
              width="70"
              :src="`/images/lp-levels/${lpLevels.wGOLD.level}.png`"
              :alt="lpLevels.wGOLD.level"
            />
          </div>
          <div class="pool">
            <img
              class="token"
              height="40"
              width="40"
              src="/images/wcourage.png"
              alt="wCOURAGE Pool"
            />
            <img
              height="70"
              width="70"
              :src="`/images/lp-levels/${lpLevels.wCOURAGE.level}.png`"
              :alt="lpLevels.wCOURAGE.level"
            />
          </div>
          <div class="pool">
            <img
              class="token"
              height="40"
              width="40"
              src="/images/wland.png"
              alt="wLAND Pool"
            />
            <img
              height="70"
              width="70"
              :src="`/images/lp-levels/${lpLevels.wLAND.level}.png`"
              :alt="lpLevels.wLAND.level"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="d-flex justify-start align-center">
      <img src="/images/icons/coins/wSCARS.png" width="64px" alt="War SCARS" />
      <div class="ml-2">
        <div class="scars-amount">
          <v-skeleton-loader
            v-if="isLoading"
            type="image"
            width="100%"
            height="47px"
          />
          <Amount
            v-else
            :amount="wSCARS"
            :formatted="true"
            decimals="2"
            tooltip
          />
        </div>
        <div class="scars-text">Your War SCARS</div>
      </div>
    </div>
    <div class="d-flex justify-center mt-1">
      <Button
        type="wsecondary"
        icon="pcs"
        :handleClick="() => $router.push('/loyalty-program')"
        class="mt-1"
      >
        <span class="text-none text-center">Loyalty Program</span>
      </Button>
      <Button
        type="wsecondary"
        :handleClick="() => $router.push('/loyalty-program/shop')"
        class="ml-2 mt-1"
      >
        <span class="text-none text-center">Shop</span>
      </Button>
    </div>
  </div>
</template>
<script>
import Button from "@/lib/components/ui/Buttons/Button";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: {
    Amount,
    Button,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    wSCARS: {
      type: Number,
      default: 0,
    },
    lpLevels: {
      type: Object,
      default: () => ({
        wGOLD: { level: 0 },
        wCOURAGE: { level: 0 },
        wLAND: { level: 0 },
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.lp-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  text-align: left;
  color: #ffeebc;
  margin-bottom: 12px;
}
.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.scars-amount {
  font-weight: bold;
  font-size: 36px;
  line-height: 1.2;
  color: #ffffff;
}
.lp-levels {
  display: flex;
}
.pool {
  position: relative;
  > .token {
    position: absolute;
    top: -10px;
    left: -5px;
  }
  &:not(:last-child) {
    margin-right: 4px;
  }
}
.scars-text {
  font-size: 14px;
  line-height: 1.2;
  color: #ffffff;
}
</style>
