<template>
  <button
    :class="[
      'btn-container',
      [type],
      [size],
      isBlock ? 'is-block' : '',
      noPadding ? 'no-padding' : '',
    ]"
    :style="`--color: ${color};`"
    @click="handleClick"
    :disabled="disabled || isLoading"
  >
    <img
      :src="`/images/icons/${icon}.png`"
      :alt="icon"
      v-if="icon"
      class="mr-1"
    />
    <slot>
      <template v-if="isLoading"
        >{{ text
        }}<v-progress-circular
          class="ml-1"
          indeterminate
          size="16"
          width="2"
        /> </template
      ><game-text v-else-if="type === 'wtertiary'">{{ text }}</game-text
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
    color: {
      type: String,
      default: "#3a2720",
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-container {
  padding: 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  color: var(--color);
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.4;
  height: 35px;
  white-space: nowrap;
  > img {
    width: 16px;
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

  &.large {
    font-size: 16px;
    line-height: 24px;
    padding: 12px 16px;
    height: 48px;

    > img {
      width: 36px;
    }
  }
  &.no-padding {
    padding: 8px 0;
  }
  &:hover:enabled {
    cursor: pointer;
    background-color: #e5e5e5;
    border: 1px solid var(--color);
  }
  &.is-block {
    width: 100%;
  }
  &.wprimary {
    background-color: var(--color);
    border: 1px solid #ffeebc;
    color: #fff;
    &:hover:enabled {
      background-color: #e5e5e5;
      border: 1px solid var(--color);
      color: var(--color);
    }
  }
  &.wsecondary {
    background-color: transparent !important;
    border: 2px solid #ffeebc;
    color: #FFF;
    &:hover:enabled {
      background-color: #e5e5e5 !important;
      border: 2px solid var(--color);
      color: var(--color);
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
