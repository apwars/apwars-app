<template>
  <div>
    <div class="bg-war">
      <v-container fluid>
        <v-row class="d-none d-sm-none d-md-flex my-n6">
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the-corporation.png"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="mt-6">
              <h1 class="text-h1 text-wGOLD text-center">Loyalty Program</h1>
              <p class="mt-1">
                The loyalty program is for you who are a diamond hands player
                and always want to buy more game items. <br />
                Rewards are only for those who provide liquidity for a certain
                time to various reward options below and in addition to earning
                rewards you earn loyalty points which can be redeemed for items
                in our loyalty shop.
              </p>
              <div class="d-flex justify-center">
                <wButton class="white--text">
                  got to loyalty shop
                </wButton>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <v-img
              class="mx-auto"
              height="250"
              width="87"
              src="/images/battle/flag-the degenerate.png"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="gradient"></div>
    </div>

    <v-container class="mt-n13" fluid>
      <v-row v-if="isConnected && !isLoading">
        <v-col cols="12">
          <h4 class="text-h4 text-center text-subtitle-welcome-war">
            Provide liquidity and receive rewards!
          </h4>
        </v-col>

        <v-col
          v-for="reward in rewards"
          v-bind:key="reward.requirement"
          cols="12"
          md="4"
          class="align-self-center"
        >
          <div class="rewards-info">
            <h4 class="text-h4 text-wGOLD text-white">
              {{ reward.title }}
            </h4>
            <p class="mt-1 war-description">
              {{ reward.description }}
            </p>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">Requirement:</div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">
                  {{ reward.requirement }}
                </span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Time to earn the reward:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">{{ reward.time }}</span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">Reward:</div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1"
                  >{{ reward.reward }} {{ reward.rewardSymbol }}</span
                >
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Total reward available:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1"
                  >{{ reward.totalRewardAvailable }}
                  {{ reward.rewardSymbol }}</span
                >
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Total reward to distribute:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">
                  {{ reward.totalRewardDistribute }}
                  {{ reward.rewardSymbol }}
                </span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Loyalty points:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">{{ reward.loyaltyPoints }}</span>
              </div>
            </div>

            <div v-if="reward.isDone">
              <div class="py-1 d-flex justify-center">
                <wButton class="white--text">
                  get and renew reward
                </wButton>
              </div>
              <div class="py-1 d-flex justify-center">
                <wButton class="white--text">
                  get reward and remove liquidity
                </wButton>
              </div>
            </div>
            <div v-else-if="reward.isProgress">
              <div class="py-1 d-flex justify-center">
                <countdown-timer
                  :start-time="new Date().getTime() - 8.64e7"
                  :end-time="new Date().getTime() + 2.592e8"
                  show-progress
                ></countdown-timer>
              </div>
            </div>
            <div v-else>
              <div v-if="reward.isBalance" class="py-1 d-flex justify-center">
                <wButton
                  @click="openModalProvider(reward)"
                  class="white--text"
                >
                  Provide liquidity
                </wButton>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" class="d-flex justify-center">
          <h3 class="text-h3">Loading...</h3>
        </v-col>
      </v-row>
    </v-container>

    <add-liquidity-modal
      v-if="modalAddLiquidity"
      :open="modalAddLiquidity"
      @close="modalAddLiquidity = false"
      @confirm="() => {}"
      :min="10"
      :isLoading="isLoadingAddLiquidity"
      @tokenAmountA="getLiquidityMinted"
    ></add-liquidity-modal>

    <remove-liquidity-modal
      v-if="modalRemoveLiquidity"
      :open="modalRemoveLiquidity"
      @close="modalRemoveLiquidity = false"
      @confirm="() => {}"
      :min="10"
      :isLoading="isLoadingAddLiquidity"
    ></remove-liquidity-modal>

    <provide-liquidity-modal
      v-if="modalProvideLiquidity"
      :open="modalProvideLiquidity"
      @close="modalProvideLiquidity = false"
      @confirm="() => {}"
      :min="10"
      :isLoading="isLoadingAddLiquidity"
    ></provide-liquidity-modal>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import CountdownTimer from "@/lib/components/ui/Utils/CountdownTimer";
import AddLiquidityModal from "@/lib/components/ui/Modals/AddLiquidityModal";
import RemoveLiquidityModal from "@/lib/components/ui/Modals/RemoveLiquidityModal";
import ProvideLiquidityModal from "@/lib/components/ui/Modals/ProvideLiquidityModal";
import PancakePair from "@/lib/eth/PancakePair.js";
import Convert from "@/lib/helpers/Convert";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    CountdownTimer,
    AddLiquidityModal,
    RemoveLiquidityModal,
    ProvideLiquidityModal,
  },

  data() {
    return {
      isLoading: true,
      isLoadingAddLiquidity: false,
      modalAddLiquidity: false,
      modalRemoveLiquidity: false,
      modalProvideLiquidity: false,
      rewards: [
        {
          title: "Conquer more lands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti praesentium nihil quod",
          requirement: "100 wLAND in wLAND/BUSD LP",
          time: "7 days",
          reward: 10,
          tokenAmountA: 100,
          tokenAmountB: 150,
          rewardSymbol: "wLAND",
          totalRewardDistribute: 5000,
          totalRewardAvailable: 3000,
          loyaltyPoints: 1000,
          isBalance: true,
          isProgress: false,
          lp: "0xdc8eeba7e6baa2742d0751944f9ff161b7c8f88f",
        },
        {
          title: "Be a great explorer",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti praesentium nihil quod",
          requirement: "5000 wGOLD in wGOLD/BUSD LP",
          time: "3 days",
          reward: 100,
          tokenAmountA: 100,
          tokenAmountB: 150,
          rewardSymbol: "Workers",
          totalRewardDistribute: 20000,
          totalRewardAvailable: 17570,
          loyaltyPoints: 100,
          isBalance: true,
          isProgress: false,
          lp: "0xdc8eeba7e6baa2742d0751944f9ff161b7c8f88f",
        },
        {
          title: "Battle strategy",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti praesentium nihil quod",
          requirement: "20000 wGRUNT in wGRUNT/wGOLD LP",
          time: "10 days",
          reward: 1,
          tokenAmountA: 100,
          tokenAmountB: 150,
          rewardSymbol: "The Elixir (10%) (Spendable)",
          totalRewardDistribute: 100,
          totalRewardAvailable: 78,
          loyaltyPoints: 2000,
          balance: 100,
          isBalance: true,
          isProgress: true,
          lp: "0xdc8eeba7e6baa2742d0751944f9ff161b7c8f88f",
        },
        {
          title: "Conquer more lands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti praesentium nihil quod",
          requirement: "10 wLAND in wLAND/BUSD LP",
          time: "7 days",
          reward: 10,
          tokenAmountA: 100,
          tokenAmountB: 150,
          rewardSymbol: "wLAND",
          totalRewardDistribute: 5000,
          totalRewardAvailable: 3000,
          loyaltyPoints: 1000,
          isBalance: true,
          isProgress: false,
          lp: "0xdc8eeba7e6baa2742d0751944f9ff161b7c8f88f",
          isDone: true,
        },
      ],
    };
  },

  computed: {
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

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }
      this.isLoading = false;
    },

    async openModalProvider(liquidity) {
      const LP = new PancakePair(liquidity.lp);
      const tokenAmountA = Convert.toWei(liquidity.tokenAmountA);
      const tokenAmountB = Convert.toWei(liquidity.tokenAmountB);
      console.log('tokenAmountA', tokenAmountA);
      console.log('tokenAmountB', tokenAmountB);
      const value = await LP.getLiquidityMinted(tokenAmountA, tokenAmountB);
      console.log('value', value);
      this.modalProvideLiquidity = true;




    }
  },
};
</script>

<style scoped>
.bg-war {
  background-image: url("/images/battle/bg-war.jpg");
  background-size: cover;
}
.text-subtitle-welcome-war {
  color: #bea38d;
}

.gradient {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(17 17 17) 100%);
}

.war-battle {
  margin-top: -130px !important;
}

.isLoading {
  opacity: 0;
}
.loading {
  display: none;
}

.rewards-info {
  background-image: url("/images/battle/bg-wars.png");
  background-repeat: repeat;
  border: 3px solid #966a3c;
  border-radius: 20px;
  padding: 25px;
}

@media only screen and (max-width: 600px) {
  .gradient {
    display: none;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
