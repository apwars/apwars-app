<template>
  <div>
    <div v-if="!isConnected">Connect wallet</div>
    <div>
      <div class="d-flex">
        <div class="align-self-center">
          <v-img width="160" :src="`/images/troops/${getTrooper.name}.png`" />
        </div>
        <div class="ml-1 align-self-center">
          <div class="stats mt-2">Stats</div>
          <div class="qty">
            My qty:
            <amount :amount="getTrooper.myTroops" decimals="2" compact />
          </div>
          <div class="qty">
            My qty In War:
            <amount :amount="getTrooper.staked" decimals="2" compact />
          </div>
          <div class="qty mb-3">
            Global qty in war:
            <amount :amount="getTrooper.globalTroops" decimals="2" compact />
          </div>
          <div>
            <div v-if="!isbringHome">
              <div v-if="isApproved" class="stake align-self-center">
                <wButton
                  :actived="false"
                  @click="openModal = true"
                  :disabled="isSendingWar || getTrooper.myTroops === '0'"
                >
                  {{ isSendingWar ? "Sending to war..." : "Enlist at war" }}
                </wButton>
              </div>
              <div v-else class="stake align-self-center">
                <wButton
                  class="my-2 my-md-0"
                  :actived="false"
                  @click="approve"
                  :disabled="getTrooper.myTroops === '0' || loadingApproved"
                >
                  {{ loadingApproved ? "Approving..." : "Approve enlistment" }}
                </wButton>
              </div>
            </div>

            <div v-else>
              <div class="stake align-self-center">
                <wButton
                  class="my-2 my-md-0"
                  :actived="false"
                  @click="bringHomeWithdraw"
                  :disabled="getTrooper.staked === '0' || btnBringHomeDisabled"
                >
                  Bring home
                </wButton>
              </div>
            </div>
          </div>
          <div class="d-flex justify-start">
            <v-img
              class="mt-3"
              max-width="80"
              :src="`/images/tier-${getTrooper.tier}.png`"
            />
          </div>
        </div>
      </div>

      <stake-modal
        :open="openModal"
        title="CAUTION"
        :available="getTrooper.myTroops"
        :label="getTrooper.name"
        @confirm="confirmStake"
        @close="openModal = false"
      >
      </stake-modal>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import StakeModal from "@/lib/components/ui/Modals/StakeModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import WarMachine from "@/lib/eth/WarMachine";
import Troops from "@/lib/eth/Troops";

export default {
  props: ["trooper", "contractWar", "bringHome"],
  components: {
    Amount,
    wButton,
    StakeModal,
  },
  data() {
    return {
      openModal: false,
      isApproved: false,
      loadingApproved: false,
      warMachine: {},
      btnBringHomeDisabled: false,
      isSendingWar: false,
      trooperInfo: {
        myTroops: "0",
        globalTroops: "0",
        staked: "0",
        myDead: "0",
      },
    };
  },
  computed: {
    imgWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        default:
          return "500px";
      }
    },
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    getTrooper() {
      return { ...this.trooper, ...this.trooperInfo };
    },
    isbringHome() {
      if (this.bringHome === undefined) {
        return false;
      }
      return true;
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },
    currentBlockNumber() {
      this.loadData();
    },
    account() {
      this.loadData();
    },
    account() {
      this.loadingApproved = false;
      this.btnBringHomeDisabled = false;
      this.isSendingWar = false;
      this.loadData();
    },
  },

  mounted() {
    this.isConnected && this.loadData();
  },

  methods: {
    async loadData() {
      this.warMachine = new WarMachine(this.contractWar, this.networkInfo.id);
      this.ContractTrooper = new Troops(
        this.trooper.contractAddress[this.networkInfo.id]
      );
      this.isApproved = await this.ContractTrooper.hasAllowance(
        this.account,
        this.contractWar
      );
      const getTropper = new Troops(
        this.trooper.contractAddress[this.networkInfo.id]
      );
      this.trooperInfo.myTroops = await getTropper.balanceOf(this.account);
      this.trooperInfo.globalTroops = await getTropper.balanceOf(
        this.contractWar
      );

      if (this.isbringHome) {
        const reportTrooperMy = await this.warMachine.getWarReportMyTrooper(
          this.trooper.team.toString(),
          this.trooper.contractAddress[this.networkInfo.id],
          this.account
        );
        this.trooperInfo.myDead = reportTrooperMy.dead;
        this.trooperInfo.staked = "0";
        if (!reportTrooperMy.isWithdrawn) {
          this.trooperInfo.staked = reportTrooperMy.survivor;
        }
      } else {
        this.trooperInfo.staked = await this.warMachine.getPlayerInfo(
          this.trooper.contractAddress[this.networkInfo.id],
          this.account
        );
      }
    },
    async approve() {
      try {
        this.loadingApproved = true;
        await this.ContractTrooper.approve(this.account, this.contractWar);
        this.isApproved = await this.ContractTrooper.hasAllowance(
          this.account,
          this.contractWar
        );
      } catch (error) {
        this.loadingApproved = false;

        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(error);
      }
    },
    async confirmStake(amount) {
      try {
        const deposit = this.warMachine.deposit(
          this.trooper.contractAddress[this.networkInfo.id],
          amount,
          this.account
        );
        this.openModal = false;
        this.isSendingWar = true;

        deposit.on("error", (error) => {
          this.isSendingWar = false;
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error("Troop sending failed");
        });
        deposit.on("receipt", (receipt) => {
          this.isSendingWar = false;
          ToastSnackbar.successTransaction(
            `Troop sent successfully`,
            receipt.transactionHash
          );
        });
      } catch (error) {
        this.isSendingWar = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(error);
      }
    },
    async bringHomeWithdraw() {
      try {
        const withdraw = this.warMachine.withdraw(
          this.trooper.contractAddress[this.networkInfo.id],
          this.account
        );
        this.btnBringHomeDisabled = true;
        withdraw.on("error", (error) => {
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          this.btnBringHomeDisabled = false;
          return ToastSnackbar.error("Troop sending failed");
        });
        withdraw.on("receipt", (receipt) => {
          ToastSnackbar.successTransaction(
            `Transaction successfully`,
            receipt.transactionHash
          );
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.troop {
  position: relative;
}
.staked {
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
}
.troop-symbol {
  position: absolute;
  top: 50%;
  font-size: 13px;
  font-weight: bold;
  right: 15px;
  transform: translate(0%, -50%);
  color: #ffb800;
}
.my-troops {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  bottom: 0px;
  left: 295px;
  transform: translate(-50%, -50%);
  color: #ffb800;
  width: 300px;
}
.global-troops {
  font-size: 18px;
  font-weight: bold;
  margin-right: 32px;
}
.global-troops > div {
  font-size: 22px;
  color: #ffb800;
}

.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
}

.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 1920px) {
  .qty {
    font-size: 14px;
  }
  .current-price {
    font-size: 14px;
  }
}

@media only screen and (max-width: 600px) {
  .troop {
    margin: 0 auto;
  }
  .troop-symbol {
    top: 15%;
    font-size: 11px;
    right: 0px;
  }
  .staked {
    font-size: 14px;
    top: 50%;
    left: 65%;
  }
  .my-troops {
    font-size: 12px;
    left: 240px;
  }
}
</style>
