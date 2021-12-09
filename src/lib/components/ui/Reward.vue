<template>
  <div class="reward-container" v-if="reward">
    <img height="64" :src="reward.image" :alt="reward.title" />
    <div class="reward-title mt-1">{{ reward.title }}</div>
    <div class="reward-amount">{{ amount }}</div>
  </div>
</template>
<script>
import { getCollectibleById } from "@/data/Collectibles";

export default {
  props: {
    rewardId: {
      type: Number,
      default: null,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      reward: null,
    };
  },
  mounted() {
    this.reward = getCollectibleById(this.rewardId);
  },
};
</script>
<style lang="scss" scoped>
.reward-container {
  position: relative;
  display: inline-block;
  margin-right: 8px;
  text-align: center;
}
.reward-title {
  font-size: 12px;
  font-weight: bold;
  padding: 0 12px;
  width: 120px;
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
