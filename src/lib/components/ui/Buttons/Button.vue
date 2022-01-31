<template>
  <button
    :class="[
      'btn-container',
      [type],
      [size],
      isBlock ? 'is-block' : '',
      noPadding ? 'no-padding' : '',
    ]"
    @click="handleClick"
    :disabled="disabled"
  >
    <img
      :src="`/images/icons/${icon}.png`"
      :alt="icon"
      v-if="icon"
      class="mr-1"
    />
    <slot
      ><v-progress-circular
        class="ml-1"
        indeterminate
        size="16"
        width="2"
        v-if="isLoading"
      /><game-text v-else-if="type === 'wtertiary'">{{ text }}</game-text
      ><span v-else>{{ text }}</span></slot
    >
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
    size: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
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
  color: #3a2720;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  height: 40px;
  white-space: nowrap;
  > img {
    width: 24px;
  }
  &.small {
    font-size: 12px;
    line-height: 16px;
    padding: 4px 12px;
    height: 24px;
    > img {
      width: 12px;
    }
  }
  &.no-padding {
    padding: 8px 0;
  }
  &:hover:enabled {
    cursor: pointer;
    background-color: #e5e5e5;
    border: 1px solid #3a2720;
  }

  &.is-block {
    width: 100%;
  }
  &.wprimary {
    background-color: #3a2720;
    border: 1px solid #ffeebc;
    color: #fff;
    &:hover:enabled {
      background-color: #e5e5e5;
      border: 1px solid #3a2720;
      color: #3a2720;
    }
  }
  &.wsecondary {
    background-color: transparent !important;
    border: 1px solid #ffeebc;
    color: #ffeebc;
    &:hover:enabled {
      background-color: #e5e5e5 !important;
      border: 1px solid #3a2720;
      color: #3a2720;
    }
  }
  &.wtertiary {
    border: none;
    &:hover:enabled {
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 17px;
      transition: all 0.4s;
    }
  }
  &.whot {
    background-color: #ffd600;
    border: 1px solid black;
    color: black;
    &:hover:enabled {
      background-color: #e4c000;
      border: 1px solid black;
      color: black;
    }
  }
  &:disabled {
    background-color: #2a3238;
    border: 1px solid white;
    color: white;
    cursor: not-allowed;
  }
}
</style>
