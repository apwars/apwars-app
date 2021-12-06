<template>
  <div class="board-perspective">
    <div
      class="board-container"
      :style="
        `--rows: ${rows};--cols: ${cols}; --rotate: ${rotate};--translate: ${translate}`
      "
    >
      <div
        :class="['board-row', invertUnitDirection ? 'invert' : '']"
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
      >
        <div
          :class="[
            'slot',
            getKey(rowIndex, colIndex) === selected ? 'selected' : '',
            col.isAwarded ? 'is-awarded' : ''
          ]"
          v-for="(col, colIndex) in row"
          :key="colIndex"
          @click="() => selectUnit(rowIndex, colIndex)"
        >
          <div
            class="arrow-down"
            v-if="getKey(rowIndex, colIndex) === currentUserAddress"
          ></div>
          <img
            :class="['unit', invertUnitDirection ? 'invert' : '']"
            height="160%"
            :src="unitImage"
            v-show="col.isEnlisted || getKey(rowIndex, colIndex) === selected"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 0,
    },
    cols: {
      type: Number,
      default: 0,
    },
    unitImage: {
      type: String,
      default: "",
    },
    invertUnitDirection: {
      type: Boolean,
      default: false,
    },
    rotate: {
      type: String,
      default: "0deg",
    },
    translate: {
      type: String,
      default: "0",
    },
    board: {
      type: Array,
      default: () => [
        [{ isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}],
        [{ isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: true}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}],
        [{ isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: true}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}],
        [{ isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: true}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}],
        [{ isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: true}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: false, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, { isEnlisted: true, address: '4-3', isAwarded: false}, 0, { isEnlisted: true, address: '4-3', isAwarded: false}],
      ],
    },
    currentUserAddress: {
        type: String,
        default: "",
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
      this.$emit("selectedSlot", key);
    },
    getKey(rowIndex, colIndex) {
      return rowIndex + "-" + colIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.board-perspective {
  perspective: 1366px;
}
.board-container {
  transform: rotateX(var(--rotate)) translateZ(var(--translate));
}
.board-row {
  height: 32px;
  margin-top: 1px;
  white-space: nowrap;
}
.slot {
  position: relative;
  height: 32px;
  width: 32px;
  display: inline-block;
  background-image: url("/images/battle/floor.png");
  background-size: contain;
  box-sizing: border-box;
  margin-right: 1px;
  &:hover {
    transform-style: preserve-3d;
    cursor: pointer;
    outline: 1px solid #312c26;
    z-index: 2;
  }
  &.selected {
    outline: 1px solid yellow;
    z-index: 2;
  }
  &.is-awarded {
    background-image: url("/images/battle/floor-awarded.png");
  }
  > .unit {
    position: absolute;
    left: 0px;
    bottom: 8px;
    animation: unit-enter 0.2s ease-in;
    &.invert {
      transform: scaleX(-1);
    }
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
  top: -28px;
  left: 14px;
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
