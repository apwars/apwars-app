<template>
  <v-container     
    :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.mobile">
    <div>
      <div
        cols="12"
        lg="6"
        xl="4"
        class="d-flex justify-center">
        <div class="align-self-center">
          <v-img
            :width="$vuetify.breakpoint.mobile ? 100 : 160"
            :src="`/images/war-preparation/game-items/${gameItems.name}.png`"
          />
        </div>
        <div v-if="gameItems" class="ml-1 align-self-start">
          <div class="title">Necessary Resources</div>
          <div class="d-flex qty">
            <v-img class="mr-1" max-width="26px" src="/images/wCOURAGE.png" />
            <amount
              :amount="getTokenAConfig.amount"
              decimals="2"
              symbol="wCOURAGE"
            />
          </div>
          <div class="d-flex mt-1 qty">
            <v-img
              class="mr-1"
              max-width="26px"
              :src="`/images/war-preparation/game-items/non-expendables/${gameItems.name}.png`"
            />
            <amount
              :amount="getTokenBConfig.amount"
              decimals="0"
              formatted
              :symbol="gameItems.title"
            />
          </div>
          <div class="d-flex align-center my-1 qty">
            <img class="mr-1" height="32px" src="/images/icons/hourglass.png" />

            <div class="d-flex flex-column">
              <span class="d-flex align-items-center justify-content-justify">
                <span class="mr-working-time"> Working time:</span>
                <amount
                  :amount="getGeneralConfig.blocks"
                  decimals="0"
                  formatted
                  compact
                />
                <span class="ml-blocks"> blocks </span>
              </span>
              <span><time-block :blocks="getGeneralConfig.blocks"/></span>
            </div>
          </div>
          <hr />
          <div class="d-flex mt-1 qty" v-if="gameItems.image">
            <img
              class="mr-1"
              width="45px"
              height="45px"
              :src="`/images/war-preparation/game-items/conquered/arcane's-book.png`"
            />
            <!-- :src="gameItem.image" -->
            <span>
              Weapon conquered: <br />
              {{ gameItems.title }}
            </span>
          </div>
          <wButton
            v-if="!isApproved"
            class="mt-1"
            :disabled="!getGeneralConfig.isEnabled"
            @click="openModalArimedesApproval()"
          >
            Approve Research
          </wButton>
          <wButton
            v-else-if="combinators.combinatorId === '0'"
            :disabled="!getGeneralConfig.isEnabled"
            @click="openModalArimedesNewResearch"
            class="mt-1"
          >
            New Research
          </wButton>
          <wButton
            v-else-if="combinators.combinatorId !== '0' && isClaim"
            @click="openModalClaim()"
            class="mt-1"
          >
            Claim
          </wButton>
          <div class="mt-1" v-else>
            <span class="qty">Time for claim:</span>
            <countdown-block
              v-if="getGeneralConfig.isEnabled"
              :start-blocks="combinators.startBlock"
              :end-blocks="combinators.endBlock"
              show-progress
              @end="loadCombinators()"
            />
          </div>
        </div>
        <v-skeleton-loader
          v-else
          class="mt-3 mx-1"
          width="200px"
          type="text, paragraph, paragraph, paragraph, button"
        ></v-skeleton-loader>
      </div> 
      
      <dora-noble-modal
        v-if="modalDoraNobleApproval"
        :open="modalDoraNobleApproval"
        @confirm="approveContract"
        @close="modalDoraNobleApproval = false"
        :isLoading="isLoadingApprove"
        :text="textDoraNobleModal"
        :textConfirm="textConfirmArimdesModal">
      </dora-noble-modal>

      <dora-noble-modal
        v-if="modalDoraNobleClaim"
        :open="modalDoraNobleClaim"
        @confirm="claim"
        @close="modalDoraNobleClaim = false"
        :isLoading="isLoadingClaim"
        :text="textClaim"
        :textConfirm="textConfirmClaim"
        :training-icon="infoTraining.image"
      ></dora-noble-modal>

      <dora-noble-modal
        v-if="modalDoraNobleNoBalance"
        :open="modalDoraNobleNoBalance"
        @close="modalDoraNobleNoBalance = false"
        :text="textNoBalance"
        :training-icon="infoTraining.image"
        hideConfirm
      ></dora-noble-modal>

      <combinator-modal
        v-if="modalDoraNobleNewTraining"
        :open="modalDoraNobleNewTraining"
        @confirm="combineTokens"
        @close="modalDoraNobleNewTraining = false"
        :isLoading="isLoadingNewTraining"
        :info="combinatorInfo"
        textConfirm="Training"
        title="Horse Riding Center"
        width="800px"
        height="360px"
      ></combinator-modal>
    </div>
  </v-container>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ArimedesModal from "@/lib/components/ui/Modals/ArimedesModal";
import NewResearchModal from "@/lib/components/ui/Modals/NewResearchModal";
import DoraNobleModal from "@/lib/components/ui/Modals/DoraNobleModal";
import CombinatorModal from "@/lib/components/ui/Modals/CombinatorModal";
/* import ToastSnackbar from "@/plugins/ToastSnackbar"; */


import Combinator from "@/lib/eth/Combinator";
import wCOURAGE from "@/lib/eth/wCOURAGE";
import Collectibles from "@/lib/eth/Collectibles";

const DORANOBLE_APPROVE_SECOND_PAGE_CONTRACT =
  "I need some wCOURAGE and a wUNIT and I can transform a walker into a rider.";
const DORANOBLE_APPROVE_FIRST_PAGE_CONTRACT =
  "I need some wCOURAGE and a wUNIT and I can transform a walker into a rider.";
const DORANOBLE_APPROVE_ONLY_ONE_PAGE_CONTRACT =
  "I need some wUNIT and I can transform a walker into a rider.";
const DORANOBLE_WAITING_WALLET_APPROVAL =
  "I need you to brand horses with your mark. Here, pick up this cattle marker.";
const DORANOBLE_WAITING_FIRST_CONFIRMATION =
  "I am checking if is everything right...";
const DORANOBLE_WAITING_SECOND_CONFIRMATION =
  "Please, now go mark those horses with your own signature.";
const DORANOBLE_CLAIM =
  "Your training is complete, and your Stables Unit is available.";
const DORANOBLE_WAITING_CLAIM_WALLET_APPROVAL = "I need your signature...";
const DORANOBLE_WAITING_CLAIM_CONFIRMATION =
  "Thank you for trusting me my friend, I'm waiting for the first blockchain to send your wUNIT.";

export default {

  name: "game-items-combinators",
  props: ["gameItems"],
  components: {
    Amount,
    wButton,
    ArimedesModal,
    NewResearchModal,
    TimeBlock,
    CountdownBlock,
    DoraNobleModal,
    CombinatorModal,
  },

  data() {
    return {
      modalDoraNobleNoBalance: false,
      modalDoraNobleClaim: false,
      modalDoraNobleNewTraining: false,
      modalDoraNobleApproval: false,
      isApprovedTokenA: false,
      isApprovedTokenB: false,
      tokenA: "",
      tokenB: "",
      combinators: {
        combinatorId: "0",
      },
      combinatorContract: {},
      
      tokenAContract: {},
      tokenBContract: {},
      getGeneralConfig: {},
      getTokenAConfig: {
        amount: "0",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      },
      getTokenBConfig: {
        amount: "1000",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      },
      getTokenCConfig: {
        amount: "0",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      },
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
    isApproved() {
      return this.isApprovedTokenA && this.isApprovedTokenB;
    },
    approveOnlyOneContract() {
      if (this.isApprovedTokenA && !this.isApprovedTokenB) {
        return this.tokenBContract;
      }
      if (!this.isApprovedTokenA && this.isApprovedTokenB) {
        return this.tokenAContract;
      }
      return {};
    },

    combinatorAddress() {
      return this.gameItems.combinators.warPreparation.combinatorAddress[this.networkInfo.id];
    },

    combinatorId() {
      if (this.infoTraining.idCombinator) {
        return (
          this.gameItems.combinators.warPreparation.idCombinator[
            this.networkInfo.id
          ] || 0
        );
      }
      return 0;
    },

    infoTraining() {
      if (this.gameItems.combinators && this.gameItems.combinators.warPreparation) {
        return this.gameItems.combinators.warPreparation;
      }
      return {};
    },

    isBalanceCombinator() {
      if (!this.getTokenAConfig.balance || !this.getTokenBConfig.balance) {
        return false;
      }
      const amountTokenA = Convert.fromWei(this.getTokenAConfig.amount, true);
      const balanceTokenA = Convert.fromWei(this.getTokenAConfig.balance, true);
      const amountTokenB = Convert.fromWei(this.getTokenBConfig.amount, true);
      const balanceTokenB = Convert.fromWei(this.getTokenBConfig.balance, true);
      if (balanceTokenA >= amountTokenA && balanceTokenB >= amountTokenB) {
        return true;
      }

      return false;
    },
  },

  async mounted() {
    await this.initData();
    await this.loadData();
  },

  watch: {
    isConnected() {
      this.initData();
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    },
  },

  methods: {
    async initData() {
      this.tokenA = this.addresses.wCOURAGE;
      this.tokenB = this.addresses.collectibles
      this.combinatorContract = new Combinator(this.combinatorAddress);
      await this.combinatorContract.getContractManager();
      this.tokenAContract = new wCOURAGE(this.tokenA);
      this.tokenBContract = new Collectibles(this.tokenB);
    },
    
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      if (this.getGeneralConfig.isEnabled !== undefined &&
        !this.getGeneralConfig.isEnabled) {;
        return;
      }
      
      this.isApprovedTokenA = await this.tokenAContract.hasAllowance(
        this.account,
        this.combinatorAddress
      );
      
      this.isApprovedTokenB = await this.tokenBContract.isApprovedForAll(
        this.account,
        this.combinatorAddress
      );
      
      this.getGeneralConfig = await this.combinatorContract.getGeneralConfig(
        this.account,
        this.account,
        this.combinatorId
      );
      
      if (this.getGeneralConfig.isEnabled) {
        this.getTokenAConfig = {
          ...this.getTokenAConfig,
          ...(await this.combinatorContract.getTokenAConfig(
            this.account,
            this.tokenA,
            this.combinatorId
          )),
        };
        this.getTokenBConfig = {
          ...this.getTokenBConfig,
          ...(await this.combinatorContract.getGameItemBConfig(
            this.account,
            this.tokenB,
            this.combinatorId
          )),
        };
        this.getGameItemCConfig = {
          ...this.getGameItemCConfig,
          ...(await this.combinatorContract.getGameItemCConfig(
            this.account,
            this.account,
            this.combinatorId
          )),
        };
        await this.loadCombinators();
        await this.getBalance();
      }
      this.isLoadingUnit = true;
    },

    async loadCombinators() {
      this.combinators = await this.combinatorContract.combinators(
        this.combinatorId,
        this.account
      );

      this.combinators.endBlock =
        parseInt(this.combinators.startBlock) +
        parseInt(this.getGeneralConfig.blocks);

      this.isClaim = false;
      if (this.currentBlockNumber >= this.combinators.endBlock) {
        this.isClaim = true;
      }
    },

    async getBalance() {
      this.getTokenAConfig.balance = await this.tokenAContract.balanceOf(
        this.account
      );
      this.getTokenBConfig.balance = await this.tokenBContract.balanceOf(
        this.account,
        this.gameItems.id
      );
    },

    async approveContract() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        if (this.signPage === 1) {
          await this.approveFirstPage();
        } else {
          await this.approveSecondPage();
        }
      } else {
        await this.approveOnlyPage();
      }
    },
    setInitialStateApproveOnlyPage() {
      this.textDoraNobleModal = DORANOBLE_APPROVE_ONLY_ONE_PAGE_CONTRACT;
      this.isLoadingApprove = false;
    },

    setInitialStateApproveFirstPage() {
      this.textDoraNobleModal = DORANOBLE_APPROVE_FIRST_PAGE_CONTRACT;
      this.isLoadingApprove = false;
      this.signPage = 1;
    },

    openModalDoraNobleApproval() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        this.setInitialStateApproveFirstPage();
      } else {
        this.setInitialStateApproveOnlyPage();
      }
      this.modalDoraNobleApproval = true;
    },
    async approveContract() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        if (this.signPage === 1) {
          await this.approveFirstPage();
        } else {
          await this.approveSecondPage();
        }
      } else {
        await this.approveOnlyPage();
      }
    },

    openModalArimedesApproval() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        this.setInitialStateApproveFirstPage();
      } else {
        this.setInitialStateApproveOnlyPage();
      }
      this.modalArimedesApproval = true;
    },

    openModalArimedesNewResearch() {
      this.modalArimedesNewResearch = true;
      this.combinatorInfo = {
        getGeneralConfig: this.getGeneralConfig,
        getTokenAConfig: this.getTokenAConfig,
        getTokenBConfig: this.getTokenBConfig,
        gameitem: this.gameitem,
        infoItem: this.infoItem,
      };
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
}
.globalQty {
  color: #f6ff00;
  font-weight: bold;
  font-size: 16px;
}
.qty >>> span,
.globalQty >>> span {
  color: #fff;
}
.current-price {
  font-weight: bold;
  font-size: 18px;
}
.price-wgold {
  font-weight: bold;
  font-size: 16px;
  color: #f6ff00;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 600px) {
  .qty,
  .globalQty {
    font-size: 14px;
  }
  .current-price {
    font-size: 14px;
  }
}
</style>