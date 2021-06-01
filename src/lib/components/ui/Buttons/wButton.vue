<template>
  <div v-bind:class="{ disabled: this.disabled }">
    <div
      :class="`${this.getSize}`"
      @mouseleave="hover = false"
      @mouseover="hover = true"
      @click="emitClick"
    >
      <div class="btn-bg"></div>
      <div class="btn-bg-c">
        <div class="label">
          <slot></slot>
        </div>
      </div>
      <div class="btn-bg revert-img"></div>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["amount", "actived", "size", "disabled"],

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
        case "x-large":
          return "btn btn-x-large";
        case "large":
          return "btn btn-large";
        case "small":
          return "btn btn-small";
        case "x-small":
          return "btn btn-x-small";
        default:
          return "btn btn-default";
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
  cursor: pointer;
  display: inline-flex;
  position: relative;
}
.btn-bg {
  background-image: url("/images/buttons/btn-default-lr.png");
  background-size: contain;
  z-index: 1;
}

.btn-bg-c {
  background-image: url("/images/buttons/btn-default-c.png");
  background-size: contain;
  background-repeat: repeat;
  margin: 0 -1px;
  z-index: 2;
}

.btn-bg-c > .label {
  display: flex;
  align-items: center;
  height: 100%;
  text-transform: uppercase;
  font-weight: bold;
  z-index: 3;
  justify-content: space-around;
}

.btn-bg-c > .label:hover {
  background: url("/images/buttons/btn-default-hover-bg.png");
  background-size: cover;
  background-position: bottom;
}

.revert-img {
  transform: scaleX(-1);
}

.hover {
  position: absolute;
  top: 14%;
  left: 12.5%;
  width: 75%;
  height: 70%;
  background-color: #ff00007d;
  z-index: 2;
  border-radius: 10px;
}

/*********/
/* sizes */
/*********/

/* size [x-large] */
.btn.btn-x-large {
  height: 96px;
}
.btn.btn-x-large .btn-bg {
  width: 40px;
}
.btn.btn-x-large .btn-bg-c > .label {
  font-size: 28px;
  margin-top: 9.5px;
  margin-left: -17.5px;
  width: calc(100% + 35px);
  height: 75px;
  border-radius: 10px;
  padding: 10px;
}

/* size [large] */
.btn.btn-large {
  height: 72px;
}
.btn.btn-large .btn-bg {
  width: 30px;
}
.btn.btn-large .btn-bg-c > .label {
  font-size: 22px;
  margin-top: 6.5px;
  margin-left: -12.5px;
  width: calc(100% + 25px);
  height: 57px;
  border-radius: 8px;
  padding: 8px;
}

/* size [default] */
.btn.btn-default {
  height: 43px;
}
.btn.btn-default .btn-bg {
  width: 18px;
}
.btn.btn-default .btn-bg-c > .label {
  font-size: 16px;
  margin-top: 5px;
  margin-left: -6px;
  width: calc(100% + 12px);
  height: 33px;
  border-radius: 5px;
  padding: 6px;
}

/* size [small] */
.btn.btn-small {
  height: 30px;
}
.btn.btn-small .btn-bg {
  width: 13px;
}
.btn.btn-small .btn-bg-c > .label {
  font-size: 13px;
  margin-top: 5px;
  margin-left: -4px;
  width: calc(100% + 8px);
  height: 21px;
  border-radius: 4px;
  padding: 4px;
}

/* size [x-small] */
.btn.btn-x-small {
  height: 20px;
}
.btn.btn-x-small .btn-bg {
  width: 9px;
}
.btn.btn-x-small .btn-bg-c > .label {
  font-size: 10px;
  margin-top: 3px;
  margin-left: -3px;
  width: calc(100% + 6px);
  height: 15px;
  border-radius: 2px;
  padding: 3px;
}

.disabled {
  opacity: 0.6;
}
.disabled .btn {
  cursor: not-allowed !important;
}
</style>
