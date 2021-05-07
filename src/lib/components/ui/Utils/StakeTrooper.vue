<template>
  <div>
    <div v-if="!isConnected">Connect wallet</div>
    <div>
      <div class="troop" :style="`width: ${imgWidth}`">
        <div class="d-flex">
          <v-img
            :max-width="imgWidth"
            :src="`/images/battle/troops/${trooper.name}.png`"
          />
        </div>
        <span class="staked">
          In War:
          <amount :amount="trooper.staked" decimals="2" compact approximate />
        </span>
        <span class="troop-symbol">{{ trooper.name }}</span>
        <span class="my-troops">
          At home:
          <amount :amount="trooper.myTroops" decimals="2" compact approximate />
          <span v-if="trooper.backHome">
            / Dead:
            <amount :amount="trooper.myDead" decimals="2" compact approximate />
          </span>
        </span>
      </div>

      <v-row class="ma-0">
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center justify-md-start pa-0"
        >
          <div class="global-troops align-self-center">
            Global troops in war:
            <div>
              QTY:
              <amount
                :amount="trooper.globalTroops"
                decimals="2"
                compact
                approximate
              />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-0">
          <div v-if="!trooper.backHome">
            <div v-if="isApproved" class="stake align-self-center">
              <wButton
                :actived="false"
                @click="openModal = true"
                :disabled="isSendingWar || trooper.myTroops === '0'"
              >
                {{ isSendingWar ? "Sending to war..." : "Enlist at war" }}
              </wButton>
            </div>
            <div v-else class="stake align-self-center">
              <wButton
                :actived="false"
                @click="approve"
                :disabled="trooper.myTroops === '0' || loadingApproved"
              >
                {{ loadingApproved ? "Approving..." : "Approve enlistment" }}
              </wButton>
            </div>
          </div>

          <div v-else>
            <div class="stake align-self-center">
              <wButton
                :actived="false"
                @click="backHome"
                :disabled="trooper.staked === '0' || btnHomeDisabled"
              >
                Bring home
              </wButton>
            </div>
          </div>
        </v-col>
      </v-row>

      <stake-modal
        :open="openModal"
        title="CAUTION"
        :available="trooper.myTroops"
        :label="trooper.name"
        @confirm="confirmStake"
        @close="openModal = false"
      >
      </stake-modal>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Utils/wButton";
import StakeModal from "@/lib/components/ui/Modals/StakeModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import WarMachine from "@/lib/eth/WarMachine";
import Troops from "@/lib/eth/Troops";

export default {
  props: ["trooper", "contractWar"],
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
      btnHomeDisabled: false,
      isSendingWar: false,
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
    account() {
      return this.$store.getters["user/account"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },
    account() {
      this.loadingApproved = false;
      this.btnHomeDisabled = false;
      this.isSendingWar = false;
      this.loadData();
    },
  },

  mounted() {
    this.isConnected && this.loadData();
  },

  methods: {
    async loadData() {
      this.warMachine = new WarMachine(this.contractWar);
      this.ContractTrooper = new Troops(
        this.trooper.contractAddress[this.networkInfo.id]
      );
      this.isApproved = await this.ContractTrooper.hasAllowance(
        this.account,
        this.contractWar
      );
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
    async backHome() {
      try {
        // back home
        const withdraw = this.warMachine.withdraw(
          this.trooper.contractAddress[this.networkInfo.id],
          this.account
        );
        this.btnHomeDisabled = true;
        withdraw.on("error", (error) => {
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          this.btnHomeDisabled = false;
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
    left: 215px;
  }
}
</style>
