<template>
  <div class="shop-item-container">
    <div class="item-viewport" v-if="item">
      <img :src="item.image" :alt="item.title" />
    </div>
    <div class="item-title" v-if="item">{{ amount }} {{ item.title }}</div>
    <div class="item-price">
      <img class="mr-1" :src="`/images/wSCARS.png`" alt="War SCARS" />
      <div class="price">
        <Amount :amount="priceValue" formatted />
        <div class="token">War SCARS</div>
      </div>
    </div>
    <Button
      type="wsecondary"
      :text="!remainingAmount ? 'Sold Out' : 'Buy'"
      :handleClick="() => handleBuy(packageName)"
      :disabled="isLoadingBuy || !remainingAmount"
      isBlock
    />
    <div class="qty-info">
      <template v-if="remainingAmount > 0"
        >{{ remainingAmount }}
        {{ totalAmount ? `/${totalAmount}` : "remaining" }}</template
      >
    </div>
  </div>
</template>
<script>
import { getCollectibleById } from "@/data/Collectibles";

import Button from "@/lib/components/ui/Buttons/Button";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Button, Amount },
  props: {
    gameItem: {
      type: [String, Number],
    },
    packageName: {
      type: String,
      default: "",
    },
    priceValue: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: "",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
    isLoadingBuy: {
      type: Boolean,
    },
    handleBuy: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      item: null,
    };
  },
  mounted() {
    let id = this.gameItem;
    if (this.gameItem.includes("GameItem")) {
      id = this.gameItem.replace(/\D/g, "");
    }
    const i = getCollectibleById(Number(id));
    this.item = i;
  },
};
</script>
<style lang="scss" scoped>
.shop-item-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #181a1b, #181a1b), #3a2720;
  padding: 24px 12px 6px 12px;
  border: 2px solid #2a3238;
  box-sizing: border-box;
  margin: 12px;
  width: 250px;
  .item-viewport {
    width: 122px;
    height: 200px;
    > img {
      height: 100%;
      width: 100%;
    }
  }
  .item-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.3;
    color: #ffffff;
    margin-top: 4px;
  }

  .item-price {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    > img {
      height: 36px;
      width: 36px;
    }
    .price {
      position: relative;
      font-weight: bold;
      font-size: 36px;
      line-height: 1.3;
      color: #ffeebc;

      .token {
        position: absolute;
        right: 0;
        bottom: -3px;
        font-weight: bold;
        font-size: 10px;
        color: white;
        line-height: 1.3;
      }
    }
  }

  .qty-info {
    height: 13px;
    font-weight: bold;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    width: 100%;
    color: #11d300;
    margin-top: 2px;
  }
}
</style>
