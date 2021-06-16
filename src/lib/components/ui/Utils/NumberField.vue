<template>
  <div class="number-field mt-n1" :hidden="hidden">
    <v-currency-field
      :label="label"
      v-model="quantity"
      outlined
      v-bind="currencyConfig"
      v-on:change="update"
      v-on:keyPress="update"
    >
      <v-icon slot="append" @click="increment">
        mdi-plus
      </v-icon>
      <v-icon slot="prepend-inner" @click="decrement">
        mdi-minus
      </v-icon>
    </v-currency-field>
  </div>
</template>

<script>
export default {
  props: ['label', 'max', 'buyOrSell', 'hidden'],
  data() {
    return {
      quantity: 0,
      currencyConfig: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
      alert: false,
    };
  },
  model: {
    prop: 'quantity',
    event: 'change',
  },
  computed: {},
  methods: {
    update() {
      if (!this.buyOrSell) {
        if (this.quantity > this.max) {
          this.quantity = this.max;
        }
      }
      this.$emit('change', this.quantity);
      this.$emit('input');
    },
    decrement() {
      if (this.quantity !== 0) {
        this.quantity--;
        this.update();
      }
    },
    increment() {
      if (this.buyOrSell) {
        this.quantity++;
        this.update();
      } else {
        if (this.quantity <= this.max) {
          this.quantity++;
          this.update();
        } else {
          this.$emit('alert');
        }
      }
    },
  },
};
</script>

<style scoped>
.number-field >>> .v-text-field input {
  text-align: center !important;
}
</style>
