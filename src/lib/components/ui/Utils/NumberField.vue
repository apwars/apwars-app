<template>
  <div class="number-field">
    <v-currency-field
      v-bind:dense="dense"
      :label="label"
      v-model="quantity"
      outlined
      @input="update"
      v-bind="currencyConfig"
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
  props: ["label", "min", "max", "dense"],
  data() {
    return {
      quantity: null,
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: true,
      },
    };
  },
  model: {
    prop: "quantity",
    event: "change",
  },
  mounted() {
    this.quantity = this.getMin;
  },
  computed: {
    getMin() {
      if (this.min === undefined || this.min === null) {
        return 0;
      }
      return parseFloat(this.min);
    },
    getMax() {
      if (this.max === undefined || this.max === null) {
        return Number.MAX_SAFE_INTEGER;
      }
      return parseFloat(this.max);
    },
  },
  methods: {
    update() {
      if (this.quantity === null) return;

      if (this.quantity > this.getMax) {
        this.$emit("error", { error: "Value greater than allowed" });
        this.$nextTick(() => {
          this.quantity = this.getMax;
        });
        return;
      }
      if (this.quantity < this.getMin) {
        this.$emit("error", { error: "Value less than allowed" });
        this.$nextTick(() => {
          this.quantity = this.getMin;
        });
        return;
      }

      this.$emit("change", this.quantity);
      this.$emit("input", this.quantity);
    },
    decrement() {
      if (this.quantity > this.getMin) {
        this.quantity--;
        this.update();
      }
    },
    increment() {
      if (this.quantity < this.getMax) {
        this.quantity++;
        this.update();
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