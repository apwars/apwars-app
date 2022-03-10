<template>
  <div :class="['input-container', isBlock ? 'is-block' : '']">
    <label v-if="label">{{ label }}</label>
    <input
      :class="[isBlock ? 'is-block' : '']"
      @input="handleInput"
      :value="content"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.content = e.target.value;
      this.$emit("input", this.content);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-container {
  &.is-block {
    width: 100%;
  }
}
input {
  border: 2px solid #ffebc0;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  &.is-block {
    width: 100%;
  }
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
}
</style>
