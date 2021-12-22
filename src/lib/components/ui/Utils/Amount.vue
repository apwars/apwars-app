<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <span class="amount" v-bind="attrs" v-on="isTooltip ? on : false">
        <span>
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
    <span>{{ tooltipAmount }}</span>
  </v-tooltip>
</template>

<script>
import Convert from "@/lib/helpers/Convert";

export default {
  props: ['amount', 'compact', 'formatted', 'decimals', 'approximate', 'tooltip', 'symbol', 'icon', 'size', 'attribute'],

  computed: {
    computedAmount() {
      let numberAmount = this.amount || '0';
      numberAmount = this.isFormatted ? numberAmount : Convert.fromWei(numberAmount.toString());

      if (this.attribute) {
        numberAmount = numberAmount * this.attribute
      }

      if (this.compact !== undefined) {
        numberAmount = Convert.compactNumber(numberAmount, this.getDecimals);
      } else {
        numberAmount = Convert.roundDown(numberAmount, this.getDecimals);
        numberAmount = Convert.formatString(numberAmount, this.getDecimals);
      }

      if (this.approximate !== undefined) {
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
      return this.formatted !== undefined;
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
