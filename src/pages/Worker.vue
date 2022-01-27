<template>
  <div>
    <div id="worker">
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
            {{ infoAccount.amount === 1 ? "worker" : "workers" }}
            / ~{{ timeReduction }}% time reduction
          </div>
        </div>
        <wButton v-if="!isProgressWorker" class="mt-1" size="small" @click="modalWorderWithdraw = true">
          withdraw
        </wButton>
      </div>
      <div class="menuWorker">
        <div v-if="isProgressWorker"
          :class="$vuetify.breakpoint.mdAndUp ?
            'd-flex align-center progressWorker' :
            'd-flex align-center progressWorker mt-7 ml-1'">
          <img
            src="Map/farm-worker/map/assets/food_supplement.png"
            alt="food supplement"
          />
          <v-progress-linear
            color="#24B0FF"
            background-color="#3A2720"
            :value="progressPercentagemBlock"
            height="30"
          >
            <countdown :time="timeCountDown" @end="loadData()">
              <template slot-scope="props">
                ~{{ props.hours }} hours, {{ props.minutes }} minutes,
                {{ props.seconds }} seconds.
              </template>
            </countdown>
          </v-progress-linear>
        </div>
        <!-- <div v-else
          :class="$vuetify.breakpoint.mdAndUp ?
            'd-flex align-center justify-center' :
            'd-flex align-center justify-center mt-6'">
          <wButton @click="openModalWorker()">
            Get Worker
          </wButton>
        </div> -->
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

    <worker-withdraw-modal
      v-if="modalWorderWithdraw"
      :open="modalWorderWithdraw"
      @close="modalWorderWithdraw = false"
      @confirm="withdraw"
      :max="infoAccount.amount"
      :isLoading="isLoadingWithdraw"
    ></worker-withdraw-modal>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import * as TRAVISO from "traviso.js";
import wButton from "@/lib/components/ui/Buttons/wButton";
import WorkerModal from "@/lib/components/ui/Modals/WorkerModal";
import WorkerWithdrawModal from "@/lib/components/ui/Modals/WorkerWithdrawModal";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Worker from "@/lib/eth/Worker.js";

export default {
  components: {
    wButton,
    WorkerModal,
    CountdownBlock,
    WorkerWithdrawModal,
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
      modalWorderWithdraw: false,
      isLoadingWorker: false,
      isLoadingWithdraw: false,
      reductionRate: 0,
      minimumBlocks: 0,
      defaultBlocks: 0,
      timeReduction: 0,
      timeCountDown: 0,
      contractWorker: {
        "56": "0xc8CB5b953DC8783bF3dA09B8E783b383e2e90091",
        "97": "0x47991549D3475aCbB46e58ebC1d8769B7f6E14d1",
      },
      startBlocks: 0,
      smcWorker: {},
      infoAccount: {
        amount: 0,
        nextClaim: 0,
      },
      textFirstWorker: `
        We need Workers in Arcadia! Come and join. <br />
        <b>WARNING! It can be addictive!</b> <br />
        Click "Confirm" to get your first worker for free! <br />
      `,
      textWorker: `
      Congratulations! You have completed another activity on the farm.<br />
      Click "Confirm" to get another worker for free!
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

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    timeBlock() {},
  },

  watch: {
    isConnected() {
      this.initData();
      this.$nextTick(() => {
        this.loadData();
      });
    },

    account() {
      if (!this.isConnected) {
        return;
      }
      this.loadData();
    },

    currentBlockNumber() {
      if (!this.isConnected) {
        return 0;
      }
      this.loadData();
    },
  },

  async mounted() {
    window.addEventListener("resize", this.resizePIXE);
    this.initData();
    await this.loadData();
  },

  methods: {
    initData() {
      if (!this.isConnected) {
        return;
      }
      this.smcWorker = new Worker(this.contractWorker[this.networkInfo.id]);
    },
    async loadData() {
      if (!this.isConnected || this.modalWorker) {
        return;
      }

      await this.smcWorker.getContractManager();

      this.infoAccount = await this.smcWorker.infoAccount(this.account);
      this.infoAccount.nextClaim = parseInt(this.infoAccount.nextClaim);
      this.infoAccount.previousClaim = parseInt(this.infoAccount.previousClaim);
      this.infoAccount.amount = parseInt(this.infoAccount.amount);

      this.reductionRate =
        parseInt(await this.smcWorker.reductionRate()) / 10000;
      this.minimumBlocks = parseInt(await this.smcWorker.minimumBlocks());
      this.defaultBlocks = parseInt(await this.smcWorker.defaultBlocks());


      let reduction =
        this.defaultBlocks * (1 - this.reductionRate * this.infoAccount.amount);

      this.timeReduction = this.reductionRate * this.infoAccount.amount * 100;
      if (this.minimumBlocks > reduction) {
        reduction = this.minimumBlocks;
        this.timeReduction =
          100 - (this.minimumBlocks / this.defaultBlocks) * 100;
      }

      this.timeReduction = this.timeReduction.toFixed(0);

      if (this.infoAccount.nextClaim > this.currentBlockNumber) {
        const timeDiff = this.infoAccount.nextClaim - this.currentBlockNumber;
        this.timeCountDown = (timeDiff * 3) * 1000;
        
        this.startBlocks = this.infoAccount.previousClaim;
        this.isProgressWorker = true;
        if (!this.isLoopWork) {
          this.isLoopWork = true;
          this.moveWorker(this.stageWork);
        }
      } else {
        this.isProgressWorker = false;
        this.isLoopWork = false;
      }

      if (this.infoAccount.amount === 0 && this.infoAccount.nextClaim === 0) {
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
        backgroundColor: 0x88a146,
      });

      this.$el.querySelector("#worker").appendChild(this.pixiRoot.view);

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
        minScale: this.$vuetify.breakpoint.sm ? 0.01 : 0.1,
        initialZoomLevel: this.$vuetify.breakpoint.sm ? 0.01 : 0.1,
        engineInstanceReadyCallback: () => {
          if (this.$vuetify.breakpoint.sm) {
            this.engine.centralizeToPoint(210, 170, true);
          }
          {
            this.engine.centralizeToLocation(2, 3, true);
          }

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
      if (this.infoAccount.amount === 0 && this.infoAccount.nextClaim === 0) {
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
        this.textModalWorker = "waiting confirmation from the blockchain...";
      });

      confirmTransaction.on("receipt", () => {
        this.modalWorker = false;
        this.isLoadingWorker = false;
        ToastSnackbar.success("Worker successfully conquered");
        this.$nextTick(() => {
          this.loadData();
        });
      });
    },
    async withdraw(amount) {
      try {
        this.isLoadingWithdraw = true;
        await this.smcWorker.withdraw(amount, this.account);
        this.isLoadingWithdraw = false;
        this.modalWorderWithdraw = false;
        ToastSnackbar.success("Successful withdrawal");
      } catch (error) {
        this.isLoadingWithdraw = false;
      }
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
.menuWorker >>> .v-progress-linear__content {
  font-size: 12px;
}
</style>
