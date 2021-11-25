<template>
  <div class="board-container" :style="`--rows: ${rows};--cols: ${cols}`">
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
          invertUnitDirection ? 'invert' : ''
        ]"
        v-for="colIndex in cols"
        :key="colIndex"
        @click="() => selectUnit(rowIndex,colIndex)"
      >
        <img
          :class="['unit', invertUnitDirection ? 'invert' : '']"
          height="150%"
          :src="unitImage"
          v-show="rowIndex + '' + colIndex === selected"
        />
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
    }
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
          this.$emit('selectSlot', key);
      },
      getKey(rowIndex, colIndex) {
          return rowIndex + '' + colIndex
      }
  }
};
</script>
<style lang="scss" scoped>
.board-container {
  width: calc(var(--cols) * 27px);
  height: calc(var(--rows) * 26px);
}
.board-row {
  height: 24px;
  margin-top: 1px;
  margin-left: calc(1 * (var(--index) * 2px));
  white-space: nowrap;
  &.invert {
      margin-left: calc(3px + (var(--index) * 2px));
    }
}
.slot {
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  background-image: url("/images/battle/floor.png");
  background-size: cover;
  transform: skewX(5deg);
  box-sizing: border-box;
  margin-right: 1px;
  &.invert {
        transform: skewX(-5deg) translateZ(0) scaleX(-1)!important;
    }
  &:hover {
    transform-style: preserve-3d;
    cursor: pointer;
    outline: 1px solid #312c26;
    transform: skewX(5deg) scale(1.1);
    z-index: 2;
  }
  &.selected {
    outline: 1px solid yellow;
    z-index: 2;
  }
  > .unit {
    position: absolute;
    left: 2px;
    top: -14px;
    transform: skewX(5deg) translateZ(0);
    animation: unit-enter 0.2s ease-in;
    &.invert {
        transform: skewX(-5deg) translateZ(0)!important;
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
