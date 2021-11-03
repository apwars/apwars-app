<template>
  <div
    :class="['btn-container', [type], isBlock ? 'is-block' : '']"
    @click="handleClick"
  >
    <game-text class="btn-tertiary-text" v-if="type === 'wtertiary'">{{
      text
    }}</game-text>
    <span v-else class="btn-text">{{ text }}</span>
  </div>
</template>
<script>
import GameText from "@/lib/components/ui/Utils/GameText";
export default {
  components: {
    GameText,
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    type: String,
    handleClick: {
      type: Function,
      default: () => {},
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  padding: 4px 16px;
  display: inline-block;
  border: 1px solid white;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  height: 32px;
  &:hover {
    cursor: pointer;
    background-color: #e5e5e5;
    border: 1px solid #3a2720;
  }
  > .btn-text {
    color: #3a2720;
  }
  &.is-block {
    width: 100%;
  }
  &.wprimary {
    background-color: #3a2720;
    border: 1px solid #FFEEBC;
    > .btn-text {
      color: #fff;
    }
    &:hover {
      background-color: #e5e5e5;
      border: 1px solid #3a2720;
      > .btn-text {
        color: #3a2720;
      }
    }
  }
  &.wsecondary {
    background-color: transparent !important;
    border: 1px solid #FFF;;
    > .btn-text {
      color: white;
    }
    &:hover {
      background-color: #e5e5e5!important;
      border: 1px solid #3a2720;
      > .btn-text {
        color: #3a2720;
      }
    }
  }
  &.wtertiary {
    border: none;
    &:hover {
      background-color: transparent;
      > .btn-tertiary-text {
        cursor: pointer;
        font-size: 17px;
        transition: all 0.4s;
      }
    }
  }
}
</style>
