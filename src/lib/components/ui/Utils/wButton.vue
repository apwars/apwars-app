<template>
  <div>
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
  props: ["amount", "actived", "size"],

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
      if (this.actived === undefined) {
        return false;
      }
      return this.actived === "" || this.actived ? true : this.hover;
    },
    getSize() {
      switch (this.size) {
        case "small":
          return "btn btn-small";
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
      this.$emit("click");
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
  font-size: 20px;
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
.btn-small .label {
  font-size: 16px;
}
</style>
