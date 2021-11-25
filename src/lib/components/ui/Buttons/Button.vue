<template>
  <button
    :class="['btn-container', [type], isBlock ? 'is-block' : '', noPadding ? 'no-padding' : '']"
    @click="handleClick"
    :disabled="disabled"
  >
    <img width="24" :src="`/images/icons/${icon}.png`" :alt="icon" v-if="icon" />
    <game-text class="btn-tertiary-text" v-if="type === 'wtertiary'">{{
      text
    }}</game-text>
    <span v-else-if="text" :class="['btn-text', icon ? 'ml-2' : '']">{{ text }}</span>
  </button>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    }
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  height: 40px;
  &.no-padding {
    padding: 8px 0;
  }
  &:hover:enabled {
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
    &:hover:enabled {
      background-color: #e5e5e5;
      border: 1px solid #3a2720;
      > .btn-text {
        color: #3a2720;
      }
    }
    &:focus:enabled{
      filter: grayscale(100%);
      > .btn-text {
        color: #fff;
      }
      &:hover:enabled {
        background-color: #3a2720;
      }
    }
  }
  &.wsecondary {
    background-color: transparent !important;
    border: 1px solid #FFF;;
    > .btn-text {
      color: white;
    }
    &:hover:enabled {
      background-color: #e5e5e5!important;
      border: 1px solid #3a2720;
      > .btn-text {
        color: #3a2720;
      }
    }
  }
  &.wtertiary {
    border: none;
    &:hover:enabled {
      border: none;
      background-color: transparent;
      > .btn-tertiary-text {
        cursor: pointer;
        font-size: 17px;
        transition: all 0.4s;
      }
    }
  }
  &:disabled {
    background-color: #2A3238;
    border: 1px solid white;
    color: white;
    cursor: not-allowed;
  }
}
</style>
