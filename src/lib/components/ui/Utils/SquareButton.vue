<template>
  <v-btn
    :outlined="!selected"
    :color="selected ? 'secondary' : ''"
    @click="emitClick"
  >
    <v-icon left v-if="icon" small>{{icon}}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: ['label', 'selected', 'icon'],

  methods: {
    emitClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.v-btn {
  border-radius: 0px;
  border-color: #966A3C;
  color: #966A3C
}
</style>
