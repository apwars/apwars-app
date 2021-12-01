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
        v-for="rowIndex in rows"
        :key="rowIndex"
        :style="`--index: ${invertUnitDirection ? rows - rowIndex : rowIndex}`"
      >
        <div
          :class="[
            'slot',
            rowIndex + '' + colIndex === selected ? 'selected' : '',
            invertUnitDirection ? 'invert' : '',
          ]"
          v-for="colIndex in cols"
          :key="colIndex"
          @click="() => selectUnit(rowIndex, colIndex)"
        >
          <img
            :class="['unit', invertUnitDirection ? 'invert' : '']"
            width="110%"
            :src="unitImage"
            v-show="rowIndex + '' + colIndex === selected"
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
      type: Number,
      default: 0,
    },
    translate: {
      type: String,
      default: '0',
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
  > .unit {
    position: absolute;
    left: 0px;
    top: -18px;
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
</style>