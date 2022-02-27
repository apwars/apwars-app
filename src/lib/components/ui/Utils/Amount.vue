<template>
  <v-tooltip :top="!unitsColor" :right="unitsColor" color="#111111">
    <template v-slot:activator="{ on, attrs }">
      <span class="amount" v-bind="attrs" v-on="isTooltip ? on : false">
        <span :style="$vuetify.breakpoint.lgAndUp ? 'white-space: nowrap;': ''">
          <img
            v-if="isIcon"
            :src="`/images/${symbol.toLowerCase()}.png`"
            height="22px"
            :alt="symbol"
            class="image-symbol"
          />
          <span v-if="size" :style="`font-size: ${size}px`">
            {{ computedAmount }}
          </span>
          <span v-else> {{ computedAmount }} </span>
          <span v-if="symbol"> {{ symbol }} </span>
        </span>
      </span>
    </template>
    <span style="color: #FFB800">{{ tooltipAmount }}</span>
  </v-tooltip>
</template>

<script>
import Convert from "@/lib/helpers/Convert";

export default {
  props: {
    amount: {
      type: [Number, String],
      default: 0,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    formatted: {
      type: Boolean,
      default: false,
    },
    decimals: {
      type: [Number, String],
      default: 0,
    },
    approximate: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    symbol: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    attribute: {
      type: Number,
      default: 0,
    },
    unitsColor: {
      type: String,
      default: '',
    },
    ignoreThousand: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedAmount() {
      let numberAmount = this.amount || '0';
      numberAmount = this.isFormatted ? numberAmount : Convert.fromWei(numberAmount.toString());

      if (this.attribute) {
        numberAmount = numberAmount * this.attribute
      }

      if (this.compact !== undefined) {
        numberAmount = Convert.compactNumber(numberAmount, this.getDecimals, this.ignoreThousand);
      } else {
        numberAmount = Convert.roundDown(numberAmount, this.getDecimals);
        numberAmount = Convert.formatString(numberAmount, this.getDecimals);
      }

      if (this.approximate) {
        return `~${numberAmount}`;
      }
      return numberAmount;
    },

    tooltipAmount() {
      let numberAmount = this.amount || "0";
      return this.isFormatted
        ? numberAmount
        : Convert.fromWei(numberAmount.toString());
    },
    isTooltip() {
      return this.tooltip !== undefined;
    },
    getDecimals() {
      return this.decimals ?? 0;
    },
    isFormatted() {
      return this.formatted;
    },
    isIcon() {
      return (
        this.icon !== undefined &&
        this.symbol !== undefined &&
        this.symbol.length > 0
      );
    },
  },
};
</script>

<style scoped>
.amount > span {
  white-space: nowrap;
}
.image-symbol {
  vertical-align: bottom;
  margin-left: 2px !important;
}
</style>
