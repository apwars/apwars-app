<template>
  <div class="arcadia-container">
    <img src="/images/arcadia-expansion.png" height="48" />
    <div class="villages-navigation">
      <div class="controls" v-if="lands.length > 1">
        <div class="prev" @click="() => changeIndex(-1)"></div>
        <div class="next" @click="() => changeIndex(1)"></div>
      </div>
      <v-skeleton-loader
        type="image"
        height="100%"
        width="100%"
        v-if="isLoading"
      />
      <Village v-else class="mt-2" :village="currentLand" />
    </div>
    <div class="buy-villages-info mt-1" v-if="!hasLands">
      Be a master in the world of Arcadia. Acquire your village and build an
      empire.
    </div>
    <Button
      class="mt-1"
      type="wsecondary"
      icon="world"
      text="Play Arcadia"
      :handleClick="() => $router.push('/arcadia')"
    />
  </div>
</template>
<script>
import ArcadiaController from "@/controller/ArcadiaController";
import Village from "./Village";
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  components: { Button, Village },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    currentLand() {
      return this.lands[this.currentIndex];
    },
    hasLands() {
      return this.lands[0].id !== 99999999999999999999999;
    },
  },
  data() {
    return {
      isLoading: true,
      lands: [
        {
          id: 99999999999999999999999,
          foundationType: 62,
          x: "#",
          y: "#",
          name: "No lands",
          worldId: 1,
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    async fetchLands() {
      if (!this.isConnected || !this.account) {
        return;
      }
      this.isLoading = true;
      try {
        const controller = new ArcadiaController();
        const landsData = await controller.getLands(this.account);
        if (landsData.length > 0) {
          this.lands = [].concat(landsData.filter(l => l.foundationType));
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    changeIndex(direction) {
      const nextIndex = this.currentIndex + direction;
      const limit = this.lands.length - 1;
      if (nextIndex > limit) {
        this.currentIndex = 0;
      } else if (nextIndex < 0) {
        this.currentIndex = this.lands.length - 1;
      } else {
        this.currentIndex = nextIndex;
      }
    },
  },
  watch: {
    isConnected() {
      this.fetchLands();
    },
    account() {
      this.fetchLands();
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
  width: 105%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
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
