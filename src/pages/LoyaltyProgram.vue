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
          v-bind:key="reward.id"
          cols="12"
          md="6"
          lg="4"
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
              <div class="font-weight-bold mr-1">Liquidity Pool:</div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">
                  {{ reward.symbolLp }}
                </span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">Requirement:</div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">
                  <amount
                    :amount="reward.getLpConfig.baseAmount"
                    decimals="0"
                  />
                  {{ reward.symbolTokenBase }}
                </span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Time to earn the reward:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">
                  <time-block
                    only-time
                    :blocks="reward.getGeneralConfig.blocks"
                  />
                </span>
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
                  >{{ reward.getRewardConfig.available }}
                  {{ reward.rewardSymbol }}</span
                >
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Loyalty points:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">{{ reward.getGeneralConfig.points }}</span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Renewal Fee:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">0.5%</span>
              </div>
            </div>

            <div class="my-1 d-flex align-center">
              <div class="font-weight-bold mr-1">
                Non-renewal fee:
              </div>
              <div class="primary--text d-flex align-center">
                <span class="mr-1">1%</span>
              </div>
            </div>

            <div v-if="reward.isDone">
              <div class="py-1 flex-column flex-sm-row d-flex justify-center">
                <wButton
                  size="small"
                  class="white--text mr-3"
                  @click="openRenewReward(reward)"
                >
                  Renew reward
                </wButton>
                <wButton
                  size="small"
                  class="white--text"
                  @click="openWithdrawLiquidity(reward)"
                >
                  withdraw liquidity
                </wButton>
              </div>
            </div>
            <div v-else-if="reward.isProgress">
              <div class="py-1 d-flex justify-center">
                <countdown-block
                  :start-blocks="reward.loyalties.startBlock"
                  :end-blocks="reward.loyalties.endBlock"
                  show-progress
                  @end="loadData()"
                ></countdown-block>
              </div>
            </div>
            <div v-else>
              <div v-if="reward.isBalance" class="py-1 d-flex justify-center">
                <wButton @click="openModalProvider(reward)" class="white--text">
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

    <withdraw-liquidity-modal
      v-if="modalWithdrawLiquidity"
      :open="modalWithdrawLiquidity"
      @close="modalWithdrawLiquidity = false"
      @confirm="withdrawLiquidity"
      :isLoading="isLoadingWithdrawLiquidity"
      :infoLP="infoLP"
    ></withdraw-liquidity-modal>

    <renew-reward-modal
      v-if="modalRenewReward"
      :open="modalRenewReward"
      @close="modalRenewReward = false"
      @confirm="renewReward"
      :isLoading="isLoadingRenewReward"
      :infoLP="infoLP"
    ></renew-reward-modal>

    <provide-liquidity-modal
      v-if="modalProvideLiquidity"
      :open="modalProvideLiquidity"
      @close="modalProvideLiquidity = false"
      @confirm="startLoyaltyProgram"
      :min="5"
      :isLoading="isLoadingProvideLiquidity"
      :infoLP="infoLP"
    ></provide-liquidity-modal>
  </div>
</template>

<script>
import wGOLDButton from "@/lib/components/ui/Utils/wGOLDButton";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import AddLiquidityModal from "@/lib/components/ui/Modals/AddLiquidityModal";
import WithdrawLiquidityModal from "@/lib/components/ui/Modals/WithdrawLiquidityModal";
import RenewRewardModal from "@/lib/components/ui/Modals/RenewRewardModal";
import ProvideLiquidityModal from "@/lib/components/ui/Modals/ProvideLiquidityModal";
import PancakePair from "@/lib/eth/PancakePair.js";
import Convert from "@/lib/helpers/Convert";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import LoyaltyProgram from "@/lib/eth/LoyaltyProgram";
import ERC20 from "@/lib/eth/ERC20";
import Collectibles from "@/lib/eth/Collectibles";

export default {
  components: {
    wGOLDButton,
    Amount,
    wButton,
    CountdownBlock,
    AddLiquidityModal,
    WithdrawLiquidityModal,
    RenewRewardModal,
    ProvideLiquidityModal,
    TimeBlock,
  },

  data() {
    return {
      isLoading: true,
      isLoadingAddLiquidity: false,
      isLoadingProvideLiquidity: false,
      isLoadingRenewReward: false,
      isLoadingWithdrawLiquidity: false,
      infoLP: {},
      modalAddLiquidity: false,
      modalWithdrawLiquidity: false,
      modalProvideLiquidity: false,
      modalRenewReward: false,
      rewards: [
        {
          id: 1,
          title: "Conquer more lands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corrupti praesentium nihil quod",
          symbolLp: "wGOLD/wCOURAGE",
          symbolTokenBase: "wCOURAGE",
          symbolTokenSide: "wGOLD",
          rewardSymbol: "Simple Shield",
          isBalance: true,
          isProgress: false,
          isDone: false,
        },
      ],
      loyaltyProgram: {},
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
    async isConnected() {
      await this.initData();
      await this.loadData();
    },

    account() {
      if (this.isLoading) {
        return;
      }
      this.loadData();
    },

    currentBlockNumber() {
      if (this.isLoading) {
        return;
      }
      this.loadData();
    },
  },

  async mounted() {
    await this.initData();
    await this.loadData();
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    async initData() {
      if (!this.isConnected) {
        return;
      }
      this.loyaltyProgram = new LoyaltyProgram(this.addresses.loyaltyProgram);
      await this.loyaltyProgram.getContractManager();
      return;
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      for (let indexOfItem in this.rewards) {
        let reward = this.rewards[indexOfItem];
        const getGeneralConfig = await this.loyaltyProgram.getGeneralConfig(
          this.account,
          this.account,
          reward.id
        );
        let getRewardConfig = await this.loyaltyProgram.getRewardConfig(
          this.account,
          this.account,
          reward.id
        );

        if (getRewardConfig.isCollectibles) {
          getRewardConfig.available = await new Collectibles(
            getRewardConfig.rewardAddress
          ).balanceOf(this.account, getRewardConfig.collectibleId);
        } else {
          getRewardConfig.available = await new ERC20(
            getRewardConfig.rewardAddress
          ).balanceOf(this.account);
        }

        const getLpConfig = await this.loyaltyProgram.getLpConfig(
          this.account,
          this.account,
          reward.id
        );
        const loyalties = await this.loyaltyProgram.getLoyalties(
          reward.id,
          this.account
        );

        if (
          loyalties.loyaltyId !== "0" &&
          this.currentBlockNumber > parseInt(loyalties.endBlock)
        ) {
          reward.isDone = true;
          reward.isProgress = false;
        } else if (loyalties.loyaltyId !== "0") {
          reward.isProgress = true;
          reward.isDone = false;
        } else {
          reward.isProgress = false;
          reward.isDone = false;
        }

        reward = {
          ...reward,
          ...{ loyalties: loyalties },
          ...{ getGeneralConfig: getGeneralConfig },
          ...{ getRewardConfig: getRewardConfig },
          ...{ getLpConfig: getLpConfig },
        };
        this.$set(this.rewards, indexOfItem, reward);
      }

      this.isLoading = false;
    },

    async openModalProvider(reward) {
      this.infoLP = {};
      this.modalProvideLiquidity = true;
      this.isLoadingProvideLiquidity = true;
      const LP = new PancakePair(reward.getLpConfig.lpToken);
      const baseAmount = reward.getLpConfig.baseAmount;
      const sideAmount = await LP.getCalculateToken(
        baseAmount,
        reward.getLpConfig.baseToken
      );

      const value = await LP.getLiquidityMinted(baseAmount, sideAmount);

      this.infoLP = {
        ...reward,
        ...{
          baseAmount: Convert.fromWei(baseAmount),
          sideAmount: Convert.fromWei(sideAmount),
          lpAmount: value,
        },
      };
      this.isLoadingProvideLiquidity = false;
    },

    async startLoyaltyProgram() {
      this.isLoadingProvideLiquidity = true;
      const confirmTransaction = this.loyaltyProgram.startLoyaltyProgram(
        this.infoLP.id,
        this.account
      );

      confirmTransaction.on("error", (error) => {
        this.isLoadingProvideLiquidity = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while to provide liquidity"
        );
      });

      confirmTransaction.on("receipt", async () => {
        await this.loadData();
        this.isLoadingProvideLiquidity = false;
        this.modalProvideLiquidity = false;
        this.infoLP = {};
        ToastSnackbar.success("Provide liquidity successfully");
      });
    },

    async openWithdrawLiquidity(reward) {
      this.infoLP = {};
      this.modalWithdrawLiquidity = true;
      this.isLoadingWithdrawLiquidity = true;

      const balanceLP = await this.loyaltyProgram.getBalanceLp(
        reward.id,
        this.account
      );
      this.infoLP = { ...reward, ...{ balanceLP: balanceLP } };
      this.isLoadingWithdrawLiquidity = false;
    },

    async withdrawLiquidity(id) {
      try {
        this.isLoadingWithdrawLiquidity = true;
        await this.loyaltyProgram.withdraw(id, this.account);
        await this.loadData();
        ToastSnackbar.success("Withdraw liquidity successfully");
        this.modalWithdrawLiquidity = false;
        this.isLoadingWithdrawLiquidity = false;
      } catch (error) {
        ToastSnackbar.error(error.toString());
      }
    },

    async openRenewReward(reward) {
      this.infoLP = {};
      this.modalRenewReward = true;
      this.isLoadingRenewReward = true;

      const balanceLP = await this.loyaltyProgram.getBalanceLp(
        reward.id,
        this.account
      );
      this.infoLP = { ...reward, ...{ balanceLP: balanceLP } };
      this.isLoadingRenewReward = false;
    },

    async renewReward(id) {
      try {
        this.isLoadingRenewReward = true;
        await this.loyaltyProgram.withdrawAndRenew(id, this.account);
        await this.loadData();
        ToastSnackbar.success("Renew reward successfully");
        this.modalRenewReward = false;
        this.isLoadingRenewReward = false;
      } catch (error) {
        ToastSnackbar.error(error.toString());
      }
    },
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
