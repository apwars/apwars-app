<template>
  <div>
    <div id="farmWorker">
      <div class="menuWorker">
        <div v-if="isProgressWorker" class="d-flex align-center progressWorker">
          <img
            src="Map/farm-worker/map/assets/food_supplement.png"
            alt="food supplement"
          />
          <v-progress-linear
            color="#24B0FF"
            background-color="#3A2720"
            :value="percetageProgress"
            height="30"
          ></v-progress-linear>
        </div>
        <div
          v-else-if="!isProgressWorker && !isClaim"
          class="d-flex align-center justify-center"
        >
          <wButton @click="openModalWorker()">
            Get Worker
          </wButton>
        </div>
        <div v-else class="d-flex align-center justify-center">
          <wButton @click="claim()">
            Claim
          </wButton>
        </div>
      </div>
    </div>
    <worker-modal
      v-if="modalWorker"
      :open="modalWorker"
      @confirm="startWorker"
      @close="modalWorker = false"
      :isLoading="isLoadingWorker"
      :text="
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`
      "
    ></worker-modal>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import * as TRAVISO from "traviso.js";
import wButton from "@/lib/components/ui/Buttons/wButton";
import WorkerModal from "@/lib/components/ui/Modals/WorkerModal";

export default {
  components: {
    wButton,
    WorkerModal,
  },

  data() {
    return {
      loading: true,
      isRenderFarm: false,
      engine: {},
      pixiRoot: {},
      stageWork: 0,
      isLoopWork: true,
      stepSpeed: 1,
      worker: null,
      isProgressWorker: false,
      isClaim: false,
      modalWorker: false,
      isLoadingWorker: false,
      percetageProgress: 0,
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
        tileHeight: 142,
        isoAngle: 29,
        changeTransparencies: false,
        highlightPath: false,
        mapDraggable: true,
        highlightTargetTile: false,
        followCharacter: false,
        checkPathOnEachTile: false,
        minScale: 0.1,
        initialZoomLevel: 0.1,
        engineInstanceReadyCallback: () => {
          this.engine.centralizeToLocation(2, 3, true);
          this.engine.disableInteraction();
          this.worker = this.engine.createAndAddObjectToLocation("9", {
            c: 3,
            r: 5,
          });
          this.engine.setCurrentControllable(this.worker);
        },
        objectReachedDestinationCallback: () => {
          this.stageWork++;
          if (this.stageWork === 4) {
            this.worker.changeVisualToDirection(
              TRAVISO.DIRECTIONS.NW,
              false,
              false,
              false,
              null,
              2
            );
            this.stageWork = 0;
          }
          this.isLoopWork && this.moveWorker(this.stageWork);
        },
      };

      this.engine = TRAVISO.getEngineInstance(instanceConfig);
      window.engine = this.engine;
      window.TRAVISO = TRAVISO;
      this.pixiRoot.stage.addChild(this.engine);
    },
    moveWorker(stage) {
      if (stage < 2) {
        this.workerFarm(stage);
      } else {
        this.workerWater(stage);
      }
    },
    workerFarm(stage) {
      if (stage === 0) {
        setTimeout(() => {
          this.engine.moveCurrentControllableToLocation(
            { c: 3, r: 6 },
            this.stepSpeed
          );
        }, 2000);
      }
      if (stage === 1) {
        setTimeout(() => {
          this.engine.moveCurrentControllableToLocation(
            { c: 3, r: 5 },
            this.stepSpeed
          );
        }, 3000);
      }
    },
    workerWater(stage) {
      if (stage === 2) {
        setTimeout(() => {
          this.engine.moveCurrentControllableToLocation(
            { c: 1, r: 5 },
            this.stepSpeed
          );
        }, 2000);
      }
      if (stage === 3) {
        setTimeout(() => {
          this.engine.moveCurrentControllableToLocation(
            { c: 3, r: 5 },
            this.stepSpeed
          );
        }, 3000);
      }
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
    openModalWorker() {
      this.modalWorker = true;
    },
    startWorker() {
      this.isLoadingWorker = true;
      setTimeout(() => {
        this.modalWorker = false;
        this.isProgressWorker = true;
        this.isLoopWork = true;
        this.moveWorker(this.stageWork);
        this.percetageProcess();
      }, 3000);
    },
    percetageProcess() {
      if (this.percetageProgress >= 100) {
        this.isProgressWorker = false;
        this.isClaim = true;
        this.isLoopWork = false;
      } else {
        this.percetageProgress += 10;
        setTimeout(() => {
          this.percetageProcess();
        }, 2000);
      }
    },
    claim() {
      this.isClaim = false;
    }
  },
};
</script>

<style scoped>
.menuWorker {
  position: absolute;
  width: 100%;
  margin: 10px auto;
}
.progressWorker {
  width: 300px;
  margin: 0px auto;
}
.progressWorker > img {
  z-index: 2;
  margin-right: -2px;
}
.progressWorker >>> .v-progress-linear {
  border: 2px solid #bb7248;
  border-radius: 3px;
  width: 100% !important;
  background: #3a2720;
}
</style>
