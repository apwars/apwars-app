<template>
  <div v-bind:class="{ disabled: this.disabled }">
    <div
      :class="this.getSize"
      @mouseleave="hover = false"
      @mouseover="hover = true"
      @click="emitClick"
    >
      <v-img
        v-if="!getHover"
        class="mx-auto"
        :width="this.getWidth"
        src="/images/buttons/btn-default.png"
      />
      <v-img
        v-if="getHover"
        class="mx-auto"
        :width="this.getWidth"
        src="/images/buttons/btn-default-hover.png"
      />
      <span class="label">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["amount", "actived", "size", "disabled", "width"],

  data() {
    return {
      hover: false,
    };
  },

  components: {
    Amount,
  },

  computed: {
    getHover() {
      if (this.actived === undefined || this.disabled) {
        return false;
      }
      return this.actived === "" || this.actived ? true : this.hover;
    },
    getSize() {
      switch (this.size) {
        case "small":
          return "btn btn-small";
        case "x-small":
          return "btn btn-x-small";
        default:
          return "btn btn-medium";
      }
    },
    getWidth() {
      switch (this.size) {
        case "small":
          return "160px";
        default:
          return "222px";
      }
    },
  },

  methods: {
    emitClick() {
      !this.disabled && this.$emit("click");
    },
  },
};
</script>

<style scoped>
.btn {
  position: relative;
  margin: 0 auto;
  cursor: pointer;
}
.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-family: PT Serif;
  font-weight: bold;
  color: #fff;
}

.btn-medium {
  width: 222px;
}
.btn-small {
  width: 160px;
}
.btn-x-small {
  width: 160px;
}
.btn-x-small .label{
  font-size: 10px;
}
.btn-small .label {
  font-size: 16px;
}
.disabled {
  opacity: 0.6;
}
.disabled .btn {
  cursor: not-allowed !important;
}
</style>
