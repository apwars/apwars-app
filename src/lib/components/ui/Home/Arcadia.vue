<template>
  <div class="arcadia-container">
    <img src="/images/arcadia-expansion.png" height="48" />
    <div class="villages-navigation">
      <div class="controls" v-if="assets.length > 1">
        <div class="prev" @click="() => changeIndex(-1)"></div>
        <div class="next" @click="() => changeIndex(1)"></div>
      </div>
      <v-skeleton-loader
        type="image"
        height="100%"
        width="100%"
        v-if="isLoading"
      />
      <Village v-else class="mt-1" :village="currentLand" />
    </div>
    <div class="buy-villages-info" v-if="!hasLands">
      Be a master in the world of Arcadia. Acquire your village and build an
      empire.
    </div>
    <div class="d-flex justify-center mt-1">
    <Button
      type="wsecondary"
      icon="world"
      text="Play Arcadia"
      :handleClick="() => $router.push('/arcadia')"
    />
    <Button
      class="ml-1"
      type="wsecondary"
      text="Buy Foundations"
      :handleClick="() => $router.push('/arcadia-expansion')"
    /></div>
  </div>
</template>
<script>
import Village from "./Village";
import Button from "@/lib/components/ui/Buttons/Button";

const PLACEHOLDER_LAND = {
  id: 99999999999999999999999,
  foundationType: 62,
  x: "#",
  y: "#",
  name: "No lands",
  worldId: 1,
};

export default {
  components: { Button, Village },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    assets: {
      type: Array,
      default: () => [PLACEHOLDER_LAND]
    }
  },
  computed: {
    currentLand() {
      return this.assets[this.currentIndex];
    },
    hasLands() {
      return this.assets[0].id !== 99999999999999999999999;
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeIndex(direction) {
      const nextIndex = this.currentIndex + direction;
      const limit = this.assets.length - 1;
      if (nextIndex > limit) {
        this.currentIndex = 0;
      } else if (nextIndex < 0) {
        this.currentIndex = this.assets.length - 1;
      } else {
        this.currentIndex = nextIndex;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.arcadia-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #110c09;
  border: 2px solid #ffeebc;
  background-image: url("/images/texture/dark-wood.png");
  background-repeat: repeat;
}
.villages-navigation {
  position: relative;
  height: 92px;
  width: 100%;
}
.controls {
  display: flex;
  justify-content: space-between;
  width: 110%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  left: -15px;
}
.prev {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
.next {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
.buy-villages-info {
  font-weight: bold;
  font-size: 10px;
  line-height: 1.3;
  text-align: center;

  color: #ffeebc;
}
</style>
