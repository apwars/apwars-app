<template>
  <div class="board-container">
    <div
      class="board-row"
      v-for="rowIndex in rows"
      :key="rowIndex"
      :style="`--index: ${rowIndex}`"
    >
      <div
        :class="[
          'slot',
          rowIndex + '' + colIndex === selected ? 'selected' : '',
        ]"
        v-for="colIndex in cols"
        :key="colIndex"
        @click="() => selectUnit(rowIndex,colIndex)"
      >
        <img
          :class="['unit', invertUnitDirection ? 'invert' : '']"
          height="100%"
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
  width: 100%;
  overflow-y: none;
  overflow-x: auto;
  padding: 10px;
  /* responsive overflow */
  padding-left: 82px;
}
.board-row {
  height: 24px;
  margin-top: 2px;
  margin-left: calc(-1 * (var(--index) * 10px));
  white-space: nowrap;
}
.slot {
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  background-image: url("/images/battle/floor.png");
  transform: skewX(-20deg);
  margin-right: 1px;
  &:hover {
    transform-style: preserve-3d;
    cursor: pointer;
    outline: 1px solid #312c26;
    transform: skewX(-20deg) scale(1.1);
    z-index: 2;
  }
  &.selected {
    outline: 1px solid yellow;
  }
  > .unit {
    position: absolute;
    left: 0px;
    top: -8px;
    transform: skewX(20deg);
    animation: unit-enter 0.2s ease-in;
    &.invert {
        transform: skewX(20deg) scaleX(-1)!important;
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
