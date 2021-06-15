<template>
  <div class="number-field">
    <v-text-field :label="label" v-model="quantity"  outlined>
      <v-icon slot="append" @click="increment">
        mdi-plus
      </v-icon>
      <v-icon slot="prepend-inner" @click="decrement">
        mdi-minus
      </v-icon>
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: ['label', 'max'],
  data() {
    return {
      quantity: 1,
      currencyConfig: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
    };
  },
  model: {
    prop: 'quantity',
    event: 'change',
  },
  methods: {
    decrement() {
      if (this.quantity !== 0) {
        this.quantity--;
        this.$emit('change', this.quantity);
        this.$emit('input');
      }
    },
    increment() {
      if (this.quantity < this.max) {
        this.quantity++;
        this.$emit('change', this.quantity);
        this.$emit('input');
      }
    },
  },
};
</script>

<style scoped>
.number-field >>>
.v-text-field input {
  text-align: center !important;
}
</style>
