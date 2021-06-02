<template>
  <span v-if="isTooltip">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" class="d-flex">
          <img
            src="/images/wgold.png"
            :class="$vuetify.breakpoint.mdAndUp ? 'ml-1' : ''"
            height="25px"
            alt="wGOLD"
          />
          <span class="ml-1">{{ computedAmount }}</span>
          <span class="ml-1">{{ token }}</span>
        </span>
      </template>
      <span>{{ tooltipAmount }}</span>
    </v-tooltip>
  </span>
  <div v-else class="d-flex">
    <img
      src="/images/wgold.png"
      :class="$vuetify.breakpoint.mdAndUp ? 'ml-1' : ''"
      height="25px"
      alt="wGOLD"
    />
    <span> {{ computedAmount }} </span>
    <span class="ml-1">{{ token }}</span>
  </div>
</template>

<script>
import Convert from '@/lib/helpers/Convert';

export default {
  props: ['amount', 'compact', 'formatted', 'decimals', 'approximate', 'tooltip', 'token'],

  computed: {
    computedAmount() {
      let numberAmount = this.amount || '0';
      numberAmount = this.isFormatted ? numberAmount : Convert.fromWei(numberAmount.toString());
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
      let numberAmount = this.amount || '0';
      return this.isFormatted ? numberAmount : Convert.fromWei(numberAmount.toString());
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
  },
};
</script>
