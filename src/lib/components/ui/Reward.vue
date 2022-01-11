<template>
  <div class="reward-container" v-if="reward">
    <img :height="size === 'small' ? 48 : 64" :src="reward.image" :alt="reward.title" />
    <div class="reward-title mt-1">{{ reward.title }}</div>
    <div class="reward-amount"><Amount :amount="amount" compact formatted /></div>
  </div>
</template>
<script>
import { getCollectibleById } from "@/data/Collectibles";
import { TOKENS } from "@/data/Tokens";

import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Amount },
  props: {
    prize: {
      type: [Number, String],
      default: null,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      reward: null,
    };
  },
  mounted() {
    if (this.prize.includes('GameItem')) {
      const id = Number(this.prize.replace(/\D/g, ""));
      this.reward = getCollectibleById(id);
      this.type = "game-item";
      return
    }
    this.reward = TOKENS.find(t => t.id === this.prize);
    this.type = "token";
  },
};
</script>
<style lang="scss" scoped>
.reward-container {
  position: relative;
  text-align: center;
  margin: 0 4px;
}
.reward-title {
  font-size: 12px;
  font-weight: bold;
  padding: 0 12px;
  max-width: 120px;
  text-align: center;
  height: 28px;
}
.reward-amount {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  background-color: black;
  outline: 0.1px solid white;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 4px;
}
.reward-description {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
  width: 100%;
  text-align: center;
}
</style>
