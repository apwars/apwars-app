<template>
  <div :class="['reward-container', [size]]" v-if="reward">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
    <img :src="reward.image" :alt="reward.title" v-bind="attrs" v-on="on" />
      </template>
      <span>{{ reward.title }}</span>
    </v-tooltip>
    <div class="reward-title mt-1" v-if="label">{{ label }}</div>
    <div class="reward-amount"><Amount :amount="amount" compact formatted :approximate="baseType === 'token' && amount && approximate" /></div>
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
    },
    approximate: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      reward: null,
      baseType: '',
    };
  },
  mounted() {
    if (this.prize.includes('GameItem')) {
      const id = Number(this.prize.replace(/\D/g, ""));
      this.reward = getCollectibleById(id);
      this.baseType = "game-item";
      return
    }
    this.reward = TOKENS.find(t => t.id === this.prize);
    this.baseType = "token";
  },
};
</script>
<style lang="scss" scoped>
.reward-container {
  position: relative;
  text-align: center;
  margin: 8px;
  > img {
        height: 62px;
    }
  &.small {
    width: 81px;
    > img {
        height: 48px;
    }
  }
  &.large {
> img {
        height: 102px;
        width: 62px;
    }
  }
}
.reward-title {
  font-size: 10px;
  font-weight: bold;
  padding: 0 4px;
  max-width: 148px;
  text-align: center;
  height: 28px;
  color: #FFB800;
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
  height: 28px;
  font-weight: bold;
  line-height: 1.2;
  width: 100%;
  text-align: center;
}
</style>
