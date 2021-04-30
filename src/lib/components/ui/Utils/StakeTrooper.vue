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
          STAKED: <amount :amount="trooper.staked" decimals="3" compact />
        </span>
        <span class="troop-symbol">{{ trooper.name }}</span>
        <span class="my-troops">
          My troops:
          <amount :amount="trooper.myTroops" decimals="3" compact />
        </span>
      </div>

      <v-row class="ma-0">
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center justify-md-start pa-0"
        >
          <div class="global-troops align-self-center">
            Global troops in battle:
            <div>
              QTY:
              <amount :amount="trooper.globalTroops" decimals="3" compact />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-0">
          <div class="stake align-self-center">
            <wButton :actived="false" @click="openModal = true">Stake</wButton>
          </div>
        </v-col>
      </v-row>

      <stake-modal
        :open="openModal"
        title="CAUTION"
        :available="trooper.myTroops"
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
import APWars from "@/lib/eth/APWars";

export default {
  props: ["trooper"],
  components: {
    Amount,
    wButton,
    StakeModal,
  },
  data() {
    return {
      openModal: false,
      isApproved: false,
      APWars: {},
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
  },

  watch: {
    isConnected() {
      this.loadData();
    },
  },

  mounted() {
    this.isConnected && this.loadData();
  },

  methods: {
    async loadData() {
      this.APWars = new APWars(this.addresses.wGOLD);
      this.isApproved = await this.APWars.hasAllowance(
        this.account,
        this.trooper.contractAddress
      );
    },
    async approve() {
      try {
        await this.APWars.approve(this.account, this.trooper.contractAddress);
        this.isApproved = await this.APWars.hasAllowance(
          this.account,
          this.trooper.contractAddress
        );
      } catch (error) {
        console.log(error);
      }
    },
    async confirmStake(amount) {
      try {
        await this.APWars.deposit(this.trooper.contractAddress, amount, this.account);
      } catch(error) {
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
  font-size: 22px;
  font-weight: bold;
  bottom: -5px;
  left: 270px;
  transform: translate(-50%, -50%);
  color: #ffb800;
  width: 250px;
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
    font-size: 14px;
    left: 215px;
  }
}
</style>
