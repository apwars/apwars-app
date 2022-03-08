<template>
  <input @change="handleChange" :value="value" :placeholder="placeholder" />
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    handleChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  border: 2px solid #ffebc0;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
}
</style>
