<template>
  <div>
    <div
      class="d-flex justify-center"
      v-bind:class="{ disabled: unit.disabled }"
    >
      <div class="align-self-center">
        <v-img
          :width="$vuetify.breakpoint.mobile ? 100 : 160"
          :src="`/images/troops/${unit.name}.png`"
        />
      </div>
      <div v-if="isLoadingUnit" class="ml-1 align-self-start">
        <div class="title">Necessary Resources</div>
        <div class="d-flex qty">
          <v-img class="mr-1" max-width="26px" src="/images/wcourage.png" />
          <amount
            :amount="getTokenAConfig.amount"
            decimals="0"
            symbol="wCOURAGE"
          />
        </div>
        <div class="d-flex mt-1 qty">
          <v-img
            class="mr-1"
            max-width="26px"
            :src="`/images/icons/${unit.name}.png`"
          />
          <amount
            :amount="getTokenBConfig.amount"
            decimals="0"
            :symbol="unit.name"
          />
        </div>
        <div class="d-flex align-center my-1 qty">
          <img class="mr-1" height="32px" src="/images/icons/hourglass.png" />

          <div class="d-flex flex-column">
            <span>
              Working time:
              <amount
                :amount="getGeneralConfig.blocks"
                decimals="0"
                formatted
              />
              blocks
            </span>
            <span><time-block :blocks="getGeneralConfig.blocks"/></span>
          </div>
        </div>
        <hr />
        <div class="d-flex mt-1 qty" v-if="infoTraining.image">
          <img
            :class="`mr-1 bg-img-tier-${unit.tier}`"
            width="80px"
            height="80px"
            :src="infoTraining.image"
          />
          <span>
            Produced unit: <br />
            <amount :amount="getTokenBConfig.amount" decimals="0" />{{
              infoTraining.name
            }}
          </span>
        </div>

        <wButton
          v-if="!isApproved"
          class="mt-1"
          :disabled="!getGeneralConfig.isEnabled"
          @click="openModalDoraNobleApproval()"
        >
          Approve Training
        </wButton>
        <wButton
          v-else-if="combinators.combinatorId === '0'"
          :disabled="!getGeneralConfig.isEnabled"
          @click="openModalDoraNobleNewTraining"
          class="mt-1"
        >
          New Training
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
      :textConfirm="textConfirmArimdesModal"
    ></dora-noble-modal>

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
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import wButton from "@/lib/components/ui/Buttons/wButton";
import DoraNobleModal from "@/lib/components/ui/Modals/DoraNobleModal";
import CombinatorModal from "@/lib/components/ui/Modals/CombinatorModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Convert from "@/lib/helpers/Convert";

import Combinator from "@/lib/eth/Combinator";
import wCOURAGE from "@/lib/eth/wCOURAGE";
import Troops from "@/lib/eth/Troops";

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
  props: ["unit"],
  components: {
    Amount,
    wButton,
    DoraNobleModal,
    CombinatorModal,
    TimeBlock,
    CountdownBlock,
  },
  data() {
    return {
      isLoadingUnit: false,
      modalDoraNobleNoBalance: false,
      modalDoraNobleClaim: false,
      modalDoraNobleNewTraining: false,
      modalDoraNobleApproval: false,
      isLoadingClaim: false,
      isLoadingApprove: false,
      isLoadingNewTraining: false,
      signPage: 0,
      textNoBalance: "",
      textDoraNobleModal: "",
      textConfirmArimdesModal: "Sign contract",
      combinatorContract: {},
      isApprovedTokenA: false,
      isApprovedTokenB: false,
      tokenA: "",
      tokenB: "",
      tokenAContract: {},
      tokenBContract: {},
      combinatorInfo: {
        personage: {
          image: "/images/training-center/dora-noble.png",
          description:
            "Let's sign up for a horseback training course. You'll pay me in wCOURAGE to work with your army, and they'll come back riding horses.",
        },
      },
      combinators: {
        combinatorId: "0",
      },
      getGeneralConfig: {},
      getTokenAConfig: {
        amount: "0",
        burningRate: "0",
        feeRate: "0",
        tokenAddress: "",
      },
      getTokenBConfig: {
        amount: "0",
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
      claimPercentage: 0,
      isClaim: false,
    };
  },
  computed: {
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
    combinatorId() {
      if (this.infoTraining.idCombinator) {
        return (
          this.unit.combinators.trainingCenter.idCombinator[
            this.networkInfo.id
          ] || 0
        );
      }
      return 0;
    },
    infoTraining() {
      if (this.unit.combinators && this.unit.combinators.trainingCenter) {
        return this.unit.combinators.trainingCenter;
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
      if (balanceTokenA > amountTokenA && balanceTokenB > amountTokenB) {
        return true;
      }

      return false;
    },
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
  async mounted() {
    await this.initData();
    this.loadData();
  },
  methods: {
    async initData() {
      this.tokenA = this.addresses.wCOURAGE;
      this.tokenB = this.unit.contractAddress[this.networkInfo.id];
      this.combinatorContract = new Combinator(this.addresses.combinator);
      await this.combinatorContract.getContractManager();
      this.tokenAContract = new wCOURAGE(this.tokenA);
      this.tokenBContract = new Troops(this.tokenB);
    },
    async loadData() {
      if (
        this.getGeneralConfig.isEnabled !== undefined &&
        !this.getGeneralConfig.isEnabled
      ) {
        return;
      }

      this.isApprovedTokenA = await this.tokenAContract.hasAllowance(
        this.account,
        this.addresses.combinator
      );
      this.isApprovedTokenB = await this.tokenBContract.hasAllowance(
        this.account,
        this.addresses.combinator
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
          ...(await this.combinatorContract.getTokenBConfig(
            this.account,
            this.tokenB,
            this.combinatorId
          )),
        };
        this.getTokenCConfig = {
          ...this.getTokenCConfig,
          ...(await this.combinatorContract.getTokenCConfig(
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
        this.account
      );
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
    setInitialStateApproveOnlyPage() {
      this.textDoraNobleModal = DORANOBLE_APPROVE_ONLY_ONE_PAGE_CONTRACT;
      this.isLoadingApprove = false;
    },
    async approveOnlyPage() {
      try {
        this.isLoadingApprove = true;
        this.textDoraNobleModal = DORANOBLE_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.approveOnlyOneContract.approve(
          this.account,
          this.addresses.combinator
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveOnlyPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Dora Noble - The Horse Trainer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textDoraNobleModal = DORANOBLE_WAITING_SECOND_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveOnlyPage();
          this.modalDoraNobleApproval = false;
          this.isLoadingApprove = false;
          ToastSnackbar.success(
            "Contract successfully signed to Dora Noble - The Horse Trainer"
          );
        });
      } catch (error) {
        this.setInitialStateApproveOnlyPage();
        return ToastSnackbar.error(error.toString());
      }
    },
    setInitialStateApproveFirstPage() {
      this.textDoraNobleModal = DORANOBLE_APPROVE_FIRST_PAGE_CONTRACT;
      this.isLoadingApprove = false;
      this.signPage = 1;
    },
    setInitialStateApproveSecondPage() {
      this.textDoraNobleModal = DORANOBLE_APPROVE_SECOND_PAGE_CONTRACT;
      this.isLoadingApprove = false;
      this.signPage = 2;
    },
    async approveFirstPage() {
      try {
        this.isLoadingApprove = true;
        this.textDoraNobleModal = DORANOBLE_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.tokenAContract.approve(
          this.account,
          this.addresses.combinator
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveFirstPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Dora Noble - The Horse Trainer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textDoraNobleModal = DORANOBLE_WAITING_FIRST_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.approveSecondPage();
        });
      } catch (error) {
        this.setInitialStateApproveFirstPage();
        return ToastSnackbar.error(error.toString());
      }
    },
    async approveSecondPage() {
      try {
        this.textDoraNobleModal = DORANOBLE_APPROVE_SECOND_PAGE_CONTRACT;
        const confirmTransaction = this.tokenBContract.approve(
          this.account,
          this.addresses.combinator
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveSecondPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Dora Noble - The Horse Trainer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textDoraNobleModal = DORANOBLE_WAITING_SECOND_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveFirstPage();
          this.modalDoraNobleApproval = false;
          this.isLoadingApprove = false;
          ToastSnackbar.success(
            "Contract successfully signed to Dora Noble - The Horse Trainer"
          );
        });
      } catch (error) {
        this.setInitialStateApproveFirstPage();
        return ToastSnackbar.error(error.toString());
      }
    },
    openModalDoraNobleNewTraining() {
      if (!this.isBalanceCombinator) {
        const amountTokenA = Convert.fromWei(this.getTokenAConfig.amount, true);
        const amountTokenB = Convert.fromWei(this.getTokenBConfig.amount, true);

        this.textNoBalance = `I see that you do not have the necessary requirements for your training. You must have ${amountTokenA} wCOURAGE and ${amountTokenB} ${this.unit.name}.`;
        return (this.modalDoraNobleNoBalance = true);
      }
      this.modalDoraNobleNewTraining = true;
      this.combinatorInfo = {
        ...this.combinatorInfo,
        ...{
          getGeneralConfig: this.getGeneralConfig,
          getTokenAConfig: { ...{ name: "wCOURAGE" }, ...this.getTokenAConfig },
          getTokenBConfig: { ...this.unit, ...this.getTokenBConfig },
          getTokenCConfig: this.getTokenCConfig,
          infoTraining: this.infoTraining,
        },
      };
      this.combinatorInfo.textCheckbox = `I understand that I will pay ${Convert.fromWei(
        this.getTokenAConfig.amount,
        true
      )} wCOURAGE to this training and my army will be replaced.`;
    },
    async combineTokens() {
      try {
        this.isLoadingNewTraining = true;
        await this.combinatorContract.combineTokens(
          this.combinatorId,
          1,
          this.account
        );
        ToastSnackbar.success(
          "New training successfully sent Dora Noble - The Horse Trainer"
        );
        this.modalDoraNobleNewTraining = false;
        this.loadCombinators();
      } catch (error) {
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(error);
      } finally {
        this.isLoadingNewTraining = false;
      }
    },
    openModalClaim() {
      this.textClaim = DORANOBLE_CLAIM;
      this.textConfirmClaim = "Claim";
      this.modalDoraNobleClaim = true;
      this.isLoadingClaim = false;
    },
    async claim() {
      try {
        this.isLoadingClaim = true;
        const confirmTransaction = this.combinatorContract.claimTokenFromTokens(
          this.combinatorId,
          this.account
        );

        this.textClaim = DORANOBLE_WAITING_CLAIM_WALLET_APPROVAL;

        confirmTransaction.on("error", (error) => {
          this.openModalClaim();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Dora Noble - The Horse Trainer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textClaim = DORANOBLE_WAITING_CLAIM_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          ToastSnackbar.success(
            "wUNIT send successfully Dora Noble - The Horse Trainer"
          );
          this.isLoadingClaim = false;
          this.modalDoraNobleClaim = false;
          this.loadCombinators();
        });
      } catch (error) {
        this.isLoadingClaim = true;
        return ToastSnackbar.error(error);
      }
    },
  },
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
.price-wCOURAGE {
  font-weight: bold;
  font-size: 16px;
  color: #f6ff00;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

.bg-img-tier-2 {
  background-color: #d7b796;
  border-radius: 3px;
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
