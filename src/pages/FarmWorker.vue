<template>
  <div>
    <div id="farmWorker"></div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import * as TRAVISO from "traviso.js";

export default {
  components: {},

  data() {
    return {
      loading: true,
      isRenderFarm: false,
      engine: {},
      pixiRoot: {},
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },
  },

  watch: {
    isConnected() {
      this.$nextTick(() => {
        this.loadData();
      });
    },

    account() {
      this.loadData();
    },

    page() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
    window.addEventListener("resize", this.resizePIXE);
  },

  methods: {
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      if (!this.isRenderFarm) {
        this.isRenderFarm = true;
        this.renderFarm();
      }
    },
    renderFarm() {
      this.pixiRoot = new PIXI.Application({
        width: document.body.clientWidth,
        height: document.querySelector(".v-main__wrap").clientHeight,
        backgroundColor: 0x6bacde,
      });

      this.$el.querySelector("#farmWorker").appendChild(this.pixiRoot.view);

      var instanceConfig = {
        mapDataPath: "./Map/farm-worker/mapData.json",
        tileHeight: 71,
        isoAngle: 30,
        highlightPath: false,
        mapDraggable: false,
        highlightTargetTile: false,
        followCharacter: false,
        checkPathOnEachTile: false,
        engineInstanceReadyCallback: () => {
          // this.engine.disableInteraction();
          // this.startWorker();
        }
      };

      this.engine = TRAVISO.getEngineInstance(instanceConfig);
      this.pixiRoot.stage.addChild(this.engine);
      
    },
    startWorker() {
      // farm
      setTimeout(() => {
        this.engine.moveCurrentControllableToLocation({ c: 5, r: 7 }, 0.25);
      }, 1000);

      setTimeout(() => {
        this.engine.moveCurrentControllableToLocation({ c: 5, r: 6 }, 0.25);
      }, 8000);

      // water
      setTimeout(() => {
        this.engine.moveCurrentControllableToLocation({ c: 2, r: 6 }, 0.25);
      }, 14000);

      setTimeout(() => {
        this.engine.moveCurrentControllableToLocation({ c: 5, r: 6 }, 0.25);
      }, 34000);

      // setTimeout(() => {
      //   this.startWorker();
      // }, 50000);
    },
    resizePIXE() {
      if (!this.isRenderFarm) {
        return;
      }
      this.pixiRoot.renderer.resize(
        document.body.clientWidth,
        document.querySelector(".v-main__wrap").clientHeight
      );
    },
  },
};
</script>
