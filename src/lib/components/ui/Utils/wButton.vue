<template>
  <div>
    <div
      class="btn"
      @mouseleave="hover = false"
      @mouseover="hover = true"
      @click="emitClick"
    >
      <v-img
        v-if="!getHover"
        class="mx-auto"
        width="222"
        src="/images/buttons/btn-default.png"
      />
      <v-img
        v-if="getHover"
        class="mx-auto"
        width="222"
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
  props: ["amount", "actived"],

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
  width: 222px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
}
.label {
  position: absolute;
  top: 14px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: PT Serif;
  font-weight: bold;
}
</style>
