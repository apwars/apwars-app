<template>
  <div>
    <div id="farmWorker">
      <div class="amountWorker">
        <div class="d-flex align-center">
          <div class="img-worker">
            <img
              width="40px"
              class="worker-img"
              src="/Map/farm-worker/map/assets/worker.png"
            />
          </div>
          <div class="amount-worker">
            {{ infoAccount.amount }}
            {{ infoAccount.amount == 1 ? 'worker' : 'workers'}}
            </div>
        </div>
        <div v-if="infoAccount.amount > 0" class="d-flex mt-1">
          <div class="withdraw-worker">
            <wButton size="small" @click="withdraw()">
              Withdraw
            </wButton>
          </div>
        </div>
      </div>
      <div class="menuWorker">
        <div v-if="isProgressWorker" class="d-flex align-center progressWorker">
          <img
            src="Map/farm-worker/map/assets/food_supplement.png"
            alt="food supplement"
          />
          <v-progress-linear
            color="#24B0FF"
            background-color="#3A2720"
            :value="progressPercentagemBlock"
            height="30"
          ></v-progress-linear>
        </div>
        <div v-else class="d-flex align-center justify-center">
          <wButton @click="openModalWorker()">
            Get Worker
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
      :text="textModalWorker"
    ></worker-modal>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import * as TRAVISO from "traviso.js";
import wButton from "@/lib/components/ui/Buttons/wButton";
import WorkerModal from "@/lib/components/ui/Modals/WorkerModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Worker from "@/lib/eth/Worker.js";

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
      isLoopWork: false,
      stepSpeed: 1,
      worker: null,
      isProgressWorker: false,
      modalWorker: false,
      isLoadingWorker: false,
      contractWorker: "0xa7431e4e0EC80FaC8F7393775a451aE7Be363bF1",
      defaultBlocks: 40,
      startBlocks: 0,
      smcWorker: {},
      infoAccount: {
        amount: 0,
        nextClaim: 0,
      },
      textFirstWorker: `
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      `,
      textWorker: `
      Lorem Ipsum has been the industry's standard dummy.
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      `,
      textModalWorker: "",
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    getBlocks() {
      return this.infoAccount.nextClaim - this.startBlocks;
    },

    getRemainingBlocks() {
      return this.infoAccount.nextClaim - this.currentBlockNumber;
    },

    progressPercentagemBlock() {
      return 100 - parseInt((this.getRemainingBlocks / this.getBlocks) * 100);
    },
  },

  watch: {
    isConnected() {
      this.$nextTick(() => {
        this.initData();
        this.loadData();
      });
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      if (!this.isConnected) {
        return 0;
      }
      this.loadData();
    },
  },

  mounted() {
    this.initData();
    this.loadData();
    window.addEventListener("resize", this.resizePIXE);
  },

  methods: {
    initData() {
      if (!this.isConnected) {
        return;
      }
      this.smcWorker = new Worker(this.contractWorker);
    },
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.infoAccount = await this.smcWorker.infoAccount(this.account);
      this.infoAccount.nextClaim = parseInt(this.infoAccount.nextClaim);

      if (this.infoAccount.nextClaim > this.currentBlockNumber) {
        this.startBlocks = this.infoAccount.nextClaim - this.defaultBlocks;
        this.isProgressWorker = true;
        if (!this.isLoopWork) {
          this.isLoopWork = true;
          this.moveWorker(this.stageWork);
        }
      } else {
        this.isProgressWorker = false;
        this.isLoopWork = false;
      }

      if (this.infoAccount.amount === "0" && this.infoAccount.nextClaim === 0) {
        this.openModalWorker();
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
            this.isLoopWork && this.moveWorker(this.stageWork);
          } else {
            this.moveWorker(this.stageWork);
          }
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
      this.textModalWorker = this.textWorker;
      if (
        this.infoAccount.amount === "0" &&
        this.infoAccount.nextClaim === "0"
      ) {
        this.textModalWorker = this.textFirstWorker;
      }
      this.modalWorker = true;
    },
    startWorker() {
      this.isLoadingWorker = true;
      const confirmTransaction = this.smcWorker.claim(this.account);
      this.textModalWorker = "waiting for confirmation in metamask...";

      confirmTransaction.on("error", (error) => {
        this.isLoadingWorker = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while to signing contract"
        );
      });

      confirmTransaction.on("transactionHash", () => {
        this.textModalWorker = "waiting confirmation from blockchain...";
      });

      confirmTransaction.on("receipt", () => {
        this.modalWorker = false;
        this.isLoadingWorker = false;
        ToastSnackbar.success("Worker successfully conquered");
        this.loadData();
      });
    },
    async withdraw() {
      this.infoAccount = await this.smcWorker.infoAccount(this.account);
      return this.smcWorker.withdraw(this.infoAccount.amount, this.account);
    },
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
.amountWorker {
  position: absolute;
  margin-left: 6px;
  margin-top: 9px;
}
.img-worker {
  background-color: #392720;
  border: 2px #bb7248 solid;
  border-radius: 12px;
  padding: 0px 6px;
  margin-right: -3px;
  z-index: 3;
}
.amount-worker {
  background: #392720;
  height: 30px;
  padding: 0px 6px;
  border: 2px #bb7248 solid;
  border-radius: 6px;
}
</style>
