<template>
  <div :class="['select-container', isBlock ? 'is-block' : '']">
    <label v-if="label">{{ label }}</label>
    <div
      :class="['input-select', isBlock ? 'is-block' : '']"
      @click.stop="() => (isOpen = !isOpen)"
    >
      <div class="selected-option">
        <div class="image-container" v-if="selectedOption.image">
          <img class="option-image" :src="selectedOption.image" />
        </div>
        {{ selectedOption.label || "Select" }}
      </div>
      <div
        class="options-container"
        v-show="isOpen"
        v-click-outside="{ handler: onClickOutside, closeConditional }"
      >
        <div
          class="option"
          v-for="option in options"
          :key="option.id"
          @click.stop="() => handleChange(option.value)"
        >
          <div class="image-container" v-if="option.image">
            <img class="option-image" :src="option.image" />
          </div>
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
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
  computed: {
    selectedOption() {
      return this.options.find((o) => o.value === this.content) || {};
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      content: this.value,
      isOpen: false,
    };
  },
  methods: {
    handleChange(value) {
      this.content = value;
      this.isOpen = false;
      this.$emit("change", this.content);
    },
    onClickOutside() {
      this.isOpen = false;
    },
    closeConditional() {
      return this.isOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
}
.input-select {
  position: relative;
  border: 2px solid #ffebc0;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  padding-right: 16px;
  cursor: pointer;
  &.is-block {
    width: 100%;
  }
}
.options-container {
  position: absolute;
  left: 0;
  top: 56px;
  width: 100%;
  background-color: #000;
  border: 1px solid #ffebc0;
  z-index: 1;
  max-height: 180px;
  overflow-y: auto;
}
.option {
  padding: 12px;
  &:hover {
    background-color: #ffebc0;
    color: #000;
    cursor: pointer;
  }
}
.image-container {
  display: inline-block;
  width: 21px;
  text-align: center;
  margin-right: 6px;
}
.option-image {
  height: 12px;
  display: inline-block;
}
</style>
