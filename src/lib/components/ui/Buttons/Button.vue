<template>
  <div class="button-container" @click="handleClick">
    <game-text class="button-text">{{ text }}</game-text>
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
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.button-container {
    padding: 8px 4px;
    height: 32px;
  &:hover {
    > .button-text {
        cursor: pointer;
        font-size: 17px;
        transition: all .4s;
    }
  }
}
</style>
