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
            decimals="2"
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
            decimals="2"
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
              blocks</span
            >
            <span><time-block :blocks="getGeneralConfig.blocks"/></span>
          </div>
        </div>
        <hr />
        <div class="d-flex mt-1 qty" v-if="infoWeapon.image">
          <img
            :class="`mr-1 bg-img-tier-${unit.tier}`"
            width="80px"
            height="80px"
            :src="infoWeapon.image"
          />
          <span>
            Produced weapon: <br />
            <amount
              :amount="getGameItemCConfig.amount"
              formatted
              decimals="0"
            />{{ infoWeapon.name }}
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

    <arimedes-modal
      v-if="modalArimedesApproval"
      :open="modalArimedesApproval"
      @confirm="approveContract"
      @close="modalArimedesApproval = false"
      :isLoading="isLoadingApprove"
      :text="textArimedesModal"
      :textConfirm="textConfirmArimdesModal"
    ></arimedes-modal>

    <arimedes-modal
      v-if="modalArimedesClaim"
      :open="modalArimedesClaim"
      @confirm="claim"
      @close="modalArimedesClaim = false"
      :isLoading="isLoadingClaim"
      :text="textClaim"
      :textConfirm="textConfirmClaim"
      :weapon-icon="infoWeapon.image"
    ></arimedes-modal>

    <arimedes-modal
      v-if="modalArimedesNoBalance"
      :open="modalArimedesNoBalance"
      @close="modalArimedesNoBalance = false"
      :text="textNoBalance"
      :weapon-icon="infoWeapon.image"
      hideConfirm
    ></arimedes-modal>

    <new-research-modal
      v-if="modalArimedesNewResearch"
      :open="modalArimedesNewResearch"
      @confirm="combineTokens"
      @close="modalArimedesNewResearch = false"
      :isLoading="isLoadingNewResearch"
      :info="combinatorInfo"
      width="800px"
      height="360px"
    ></new-research-modal>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ArimedesModal from "@/lib/components/ui/Modals/ArimedesModal";
import NewResearchModal from "@/lib/components/ui/Modals/NewResearchModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Convert from "@/lib/helpers/Convert";

import Combinator from "@/lib/eth/Combinator";
import wCOURAGE from "@/lib/eth/wCOURAGE";
import Troops from "@/lib/eth/Troops";

const ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT = "And now sign over here...";
const ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT =
  "I need some wCOURAGE and a wUNIT to research weapons for you.";
const ARIMEDES_APPROVE_ONLY_ONE_PAGE_CONTRACT =
  "I need some wCOURAGE and a wUNIT to research weapons for you.";
const ARIMEDES_WAITING_WALLET_APPROVAL = "Please sign over here...";
const ARIMEDES_WAITING_FIRST_CONFIRMATION =
  "I’m checking if everything is fine...";
const ARIMEDES_WAITING_SECOND_CONFIRMATION =
  "I’m checking if everything is fine...";
const ARIMEDES_CLAIM =
  "Your research is complete, and your weapon is available.";
const ARIMEDES_WAITING_CLAIM_WALLET_APPROVAL = "I need your signature...";
const ARIMEDES_WAITING_CLAIM_CONFIRMATION =
  "Your research is complete, and your weapons are available.";

export default {
  name: "unit-war-preparation",
  props: ["unit"],
  components: {
    Amount,
    wButton,
    ArimedesModal,
    NewResearchModal,
    TimeBlock,
    CountdownBlock,
  },
  data() {
    return {
      isLoadingUnit: false,
      modalArimedesNoBalance: false,
      modalArimedesClaim: false,
      modalArimedesNewResearch: false,
      modalArimedesApproval: false,
      isLoadingClaim: false,
      isLoadingApprove: false,
      isLoadingNewResearch: false,
      signPage: 0,
      textArimedesModal: "",
      textNoBalance: "",
      textConfirmArimdesModal: "Sign contract",
      combinatorContract: {},
      isApprovedTokenA: false,
      isApprovedTokenB: false,
      tokenA: "",
      tokenB: "",
      tokenAContract: {},
      tokenBContract: {},
      combinatorInfo: {},
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
      getGameItemCConfig: {
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
    combinatorAddress() {
      return this.unit.combinators.warPreparation.combinatorAddress[
        this.networkInfo.id
      ];
    },
    combinatorId() {
      if (this.infoWeapon.idCombinator) {
        return (
          this.unit.combinators.warPreparation.idCombinator[
            this.networkInfo.id
          ] || 0
        );
      }
      return 0;
    },
    infoWeapon() {
      if (this.unit.combinators && this.unit.combinators.warPreparation) {
        return this.unit.combinators.warPreparation;
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
      this.tokenB = this.unit.contractAddress[this.networkInfo.id];
      this.combinatorContract = new Combinator(this.combinatorAddress);
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
        this.combinatorAddress
      );
      this.isApprovedTokenB = await this.tokenBContract.hasAllowance(
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
          ...(await this.combinatorContract.getTokenBConfig(
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
        this.account
      );
    },
    openModalArimedesApproval() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        this.setInitialStateApproveFirstPage();
      } else {
        this.setInitialStateApproveOnlyPage();
      }
      this.modalArimedesApproval = true;
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
      this.textArimedesModal = ARIMEDES_APPROVE_ONLY_ONE_PAGE_CONTRACT;
      this.isLoadingApprove = false;
    },
    async approveOnlyPage() {
      try {
        this.isLoadingApprove = true;
        this.textArimedesModal = ARIMEDES_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.approveOnlyOneContract.approve(
          this.account,
          this.combinatorAddress
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveOnlyPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Arimedes - War Engineer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textArimedesModal = ARIMEDES_WAITING_SECOND_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveOnlyPage();
          this.modalArimedesApproval = false;
          this.isLoadingApprove = false;
          ToastSnackbar.success(
            "Contract successfully signed to Arimedes - War Engineer"
          );
        });
      } catch (error) {
        this.setInitialStateApproveOnlyPage();
        return ToastSnackbar.error(error.toString());
      }
    },
    setInitialStateApproveFirstPage() {
      this.textArimedesModal = ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT;
      this.isLoadingApprove = false;
      this.signPage = 1;
    },
    setInitialStateApproveSecondPage() {
      this.textArimedesModal = ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT;
      this.isLoadingApprove = false;
      this.signPage = 2;
    },
    async approveFirstPage() {
      try {
        this.isLoadingApprove = true;
        this.textArimedesModal = ARIMEDES_WAITING_WALLET_APPROVAL;
        const confirmTransaction = this.tokenAContract.approve(
          this.account,
          this.combinatorAddress
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveFirstPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Arimedes - War Engineer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textArimedesModal = ARIMEDES_WAITING_FIRST_CONFIRMATION;
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
        this.textArimedesModal = ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT;
        const confirmTransaction = this.tokenBContract.approve(
          this.account,
          this.combinatorAddress
        );

        confirmTransaction.on("error", (error) => {
          this.setInitialStateApproveSecondPage();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Arimedes - War Engineer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textArimedesModal = ARIMEDES_WAITING_SECOND_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          this.setInitialStateApproveFirstPage();
          this.modalArimedesApproval = false;
          this.isLoadingApprove = false;
          ToastSnackbar.success(
            "Contract successfully signed to Arimedes - War Engineer"
          );
        });
      } catch (error) {
        this.setInitialStateApproveFirstPage();
        return ToastSnackbar.error(error.toString());
      }
    },
    openModalArimedesNewResearch() {
      if (!this.isBalanceCombinator) {
        const amountTokenA = Convert.fromWei(this.getTokenAConfig.amount, true);
        const amountTokenB = Convert.fromWei(this.getTokenBConfig.amount, true);

        this.textNoBalance = `I see that you do not have the necessary requirements for your training. You must have ${amountTokenA} wCOURAGE and ${amountTokenB} ${this.unit.name}.`;
        return (this.modalArimedesNoBalance = true);
      }

      this.combinatorInfo = {
        ...this.combinatorInfo,
        ...{
          getGeneralConfig: this.getGeneralConfig,
          getTokenAConfig: { ...{ name: "wCOURAGE" }, ...this.getTokenAConfig },
          getTokenBConfig: { ...this.unit, ...this.getTokenBConfig },
          getTokenCConfig: this.getTokenCConfig,
          infoWeapon: this.infoWeapon,
        },
      };
      this.modalArimedesNewResearch = true;

    },
    async combineTokens() {
      try {
        this.isLoadingNewResearch = true;
        await this.combinatorContract.combineTokens(
          this.combinatorId,
          1,
          this.account
        );
        ToastSnackbar.success(
          "New search successfully sent Arimedes - War Engineer"
        );
        this.modalArimedesNewResearch = false;
        this.loadCombinators();
      } catch (error) {
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(error);
      } finally {
        this.isLoadingNewResearch = false;
      }
    },
    openModalClaim() {
      this.textClaim = ARIMEDES_CLAIM;
      this.textConfirmClaim = "Claim";
      this.modalArimedesClaim = true;
      this.isLoadingClaim = false;
    },
    async claim() {
      try {
        this.isLoadingClaim = true;
        const confirmTransaction = this.combinatorContract.claimGameItemFromTokens(
          this.combinatorId,
          this.account
        );

        this.textClaim = ARIMEDES_WAITING_CLAIM_WALLET_APPROVAL;

        confirmTransaction.on("error", (error) => {
          this.openModalClaim();
          if (error.message) {
            return ToastSnackbar.error(error.message);
          }
          return ToastSnackbar.error(
            "An error has occurred while to signing contract to Arimedes - War Engineer"
          );
        });

        confirmTransaction.on("transactionHash", () => {
          this.textClaim = ARIMEDES_WAITING_CLAIM_CONFIRMATION;
        });

        confirmTransaction.on("receipt", () => {
          ToastSnackbar.success(
            "Weapon send successfully Arimedes - War Engineer"
          );
          this.isLoadingClaim = false;
          this.modalArimedesClaim = false;
          this.loadCombinators();
        });
      } catch (error) {
        this.isLoadingClaim = true;
        return ToastSnackbar.error(error);
      }
    },
  },
  async mounted() {
    await this.initData();
    this.loadData();
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
