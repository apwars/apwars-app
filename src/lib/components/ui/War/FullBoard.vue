<template>
  <div class="board-perspective">
    <div class="versus">VS</div>
    <div class="board-container" :style="`--rotate: ${rotate};`">
      <div
        :class="['board-row', isVerticalHalf(rowIndex) ? 'vertical-space' : '']"
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
      >
        <div
          :class="[
            'slot',
            col && col.rewards.length ? 'is-awarded' : '',
            isClickable ? 'is-clickable' : '',
          ]"
          v-for="(col, colIndex) in row"
          :key="colIndex"
          @click="
            () =>
              isClickable ? handleClick(getFaction(rowIndex, colIndex)) : null
          "
        >
          <div
            class="arrow-down"
            v-if="col && col.account === currentUserAddress"
          ></div>
          <img
            :class="['unit']"
            width="24"
            :src="getFaction(rowIndex, colIndex)"
            v-show="col"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    unitImage: {
      type: String,
      default: "",
    },
    rotate: {
      type: String,
      default: "0",
    },
    board: {
      type: Array,
      default: () => [
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
        ],
        [
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
        ],
        [
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          1,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
        ],
        [
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          0,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          1,
          1,
          0,
          1,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          1,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          1,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
        ],
        [
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          1,
        ],
      ],
    },
    currentUserAddress: {
      type: String,
      default: "",
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    selectUnit(rowIndex, colIndex) {
      const key = this.getKey(rowIndex, colIndex);
      this.selected = key;
      this.$emit("selectSlot", key);
    },
    getKey(rowIndex, colIndex) {
      return rowIndex + "" + colIndex;
    },
    isVerticalHalf(rowIndex) {
      const half = Math.floor(this.board.length / 2);
      return rowIndex === half;
    },
    isGreaterOrEqualVerticalHalf(rowIndex) {
      const half = Math.floor(this.board.length / 2);
      return rowIndex >= half;
    },
    isGreaterOrEqualHorizontalHalf(colIndex) {
      const half = Math.floor(this.board[0].length / 2);
      return colIndex >= half;
    },
    getFaction(rowIndex, colIndex) {
      if (
        this.isGreaterOrEqualVerticalHalf(rowIndex) &&
        this.isGreaterOrEqualHorizontalHalf(colIndex)
      ) {
        return "/images/troops/wskeleton-warrior.webp";
      } else if (
        this.isGreaterOrEqualVerticalHalf(rowIndex) &&
        !this.isGreaterOrEqualHorizontalHalf(colIndex)
      ) {
        return "/images/troops/warmoured-elf.webp";
      } else if (
        !this.isGreaterOrEqualVerticalHalf(rowIndex) &&
        this.isGreaterOrEqualHorizontalHalf(colIndex)
      ) {
        return "/images/troops/wgrunt.webp";
      }
      return "/images/troops/wwarrior.webp";
    },
    handleClick(factionImage) {
      let faction = 1;
      if (factionImage.includes("skeleton")) {
        faction = 3;
      } else if (factionImage.includes("elf")) {
        faction = 4;
      } else if (factionImage.includes("grunt")) {
        faction = 3;
      }
      this.$emit("clickFaction", faction);
    },
  },
};
</script>
<style lang="scss" scoped>
.board-perspective {
  perspective: 1366px;
}
.board-container {
  position: relative;
  transform: rotateX(var(--rotate));
  user-select: none;
}
.versus {
  font-weight: bold;
  font-size: 24px;
  line-height: 1.4;
  position: absolute;
  left: 49.5%;
  top: 45%;
  transform: translate(-49%, -45.5%, 0);
  box-sizing: content-box;
}
.board-row {
  height: 24px;
  margin-top: 2px;
  white-space: nowrap;
  &.vertical-space {
    margin-top: 24px;
  }
}
.slot {
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  background-image: url("/images/battle/floor.png");
  background-size: contain;
  box-sizing: border-box;
  margin-right: 1px;
  &.is-clickable {
    &:hover {
      cursor: zoom-in;
    }
  }
  &:nth-child(n + 20) {
    margin-right: 52px;
  }
  &:nth-child(n + 21) {
    margin-right: 0;
    > .unit {
      transform: scaleX(-1);
    }
  }
  &.is-awarded {
    background-image: url("/images/battle/floor-awarded.png");
  }
  > .unit {
    position: absolute;
    left: 0px;
    top: -18px;
    animation: unit-enter 0.2s ease-in;
    transform: rotateX(0);
  }

  @keyframes unit-enter {
    0% {
      opacity: 0;
      top: -50px;
      left: 0;
      z-index: -1;
    }
    100% {
      opacity: 1;
      top: 0;
      z-index: 3;
    }
  }
}

.arrow-down {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 0;
  top: -16px;
  left: 8px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid yellow;
  animation: flutuation 1s linear forwards infinite;
  transition: all ease;
}

/* width */
div::-webkit-scrollbar {
  height: 4px;
  background-color: rgba($color: #000000, $alpha: 0.1);
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: rgba($color: #000000, $alpha: 0.2);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@keyframes flutuation {
  0% {
    transform: translateY(-50%);
  }

  50% {
    transform: translateY(-80%);
  }

  100% {
    transform: translateY(-50%);
  }
}
</style>
