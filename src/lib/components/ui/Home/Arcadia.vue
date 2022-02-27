<template>
  <div class="arcadia-container">
    <img src="/images/arcadia-expansion.png" height="48" />
    <div class="villages-navigation">
        <div class="controls" v-if="villages.length > 1">
              <div class="prev" @click="() => changeIndex(-1)"></div>
              <div class="next" @click="() => changeIndex(1)"></div>
            </div>
      <Village
        class="mt-2"
        :village="currentVillage"
      />
    </div>
    <div class="buy-villages-info mt-1" v-if="!hasVillages">
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
    currentVillage() {
      return this.villages[this.currentIndex];
    },
    hasVillages() {
      return this.villages[0].id !== 99999999999999999999999;
    },
  },
  data() {
    return {
      villages: [
        {
          id: 99999999999999999999999,
          foundationType: 62,
          x: "#",
          y: "#",
          name: "No villages",
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
      const controller = new ArcadiaController();

      const landsData = await controller.getLands(this.account);
      const villages = landsData.filter((l) => l.foundationType === 62);
      if (villages.length > 0) {
        this.villages = [].concat(villages);
      }
    },
    changeIndex(direction) {
      const nextIndex = this.currentIndex + direction;
      const limit = this.villages.length - 1;
      if (nextIndex > limit) {
        this.currentIndex = 0;
      } else if (nextIndex < 0) {
        this.currentIndex = this.villages.length - 1;
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
}
.controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
