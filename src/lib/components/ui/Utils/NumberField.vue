<template>
  <v-row>
    <v-col cols="12">
      <v-currency-field
        class="mb-1"
        outlined
        :label="label"
        v-model="units"
        :hint="hintLabel"
        persistent-hint
        v-bind="v-bind"
      >
        <template v-slot:append>
          <div v-if="wToken" class="d-flex">
            <span class="mr-1 align-self-center">{{ wToken }}</span>
          </div>
          <div v-else>
            <v-icon @click="decrement">
              mdi-minus
            </v-icon>
            <v-icon @click="increment">
              mdi-plus
            </v-icon>
          </div>
        </template>
      </v-currency-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['label', 'hintLabel', 'units', 'wToken', 'v-bind'],
  model: {
    prop: 'units',
    event: 'change',
  },
  methods: {
    decrement() {
      if (this.units !== 0) {
        this.units--;
        this.$emit('change', this.units);
      }
    },
    increment() {
      this.units++;
      this.$emit('change', this.units);
    },
  },
};
</script>

<style scoped></style>
