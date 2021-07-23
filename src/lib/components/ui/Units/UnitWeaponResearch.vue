<template>
  <div>
    <div
      class="d-flex justify-center"
      v-bind:class="{ disabled: unit.disabled }"
    >
      <div class="align-self-center">
        <v-img :width="$vuetify.breakpoint.mobile ? 100 : 160" :src="`/images/troops/${unit.name}.png`" />
      </div>
      <div v-if="isLoadingUnit" class="ml-1 align-self-start">
        <div class="title">Necessary Resources</div>
        <div class="d-flex qty">
          <v-img class="mr-1" max-width="26px" src="/images/wGOLD.png" />
          <amount
            :amount="getTokenAConfig.amount"
            decimals="2"
            compact
            symbol="wGOLD"
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
            compact
            :symbol="unit.name"
          />
        </div>
        <div class="d-flex align-center my-1 qty">
          <img
            class="mr-1"
            height="32px"
            src="/images/icons/hourglass.png"
          />

          <div class="d-flex flex-column">
            <span>
              Working time:
              <amount
                :amount="getGeneralConfig.blocks"
                decimals="0"
                formatted
                compact
              />
              blocks</span
            >
            <span><time-block :blocks="getGeneralConfig.blocks"/></span>
          </div>
        </div>
        <hr />
        <div class="d-flex mt-1 qty" v-if="infoWeapon.image">
          <img
            class="mr-1"
            width="45px"
            height="45px"
            :src="infoWeapon.image"
          />
          <span>
            Weapon conquered: <br />
            {{ infoWeapon.name }}
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
          v-else-if="combinators.combinatorId !== '0' && isClaim === true"
          @click="openModalClaim()"
          class="mt-1"
        >
          Claim
        </wButton>
        <div class="mt-1" v-else>
          <span class="qty">Time for claim:</span>
          <v-progress-linear
            color="teal"
            buffer-value="0"
            :value="claimPercentage"
            stream
            height="5"
          ></v-progress-linear>
          <time-block :blocks="isClaim" countdown />
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
      weapon-icon
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
import wButton from "@/lib/components/ui/Buttons/wButton";
import ArimedesModal from "@/lib/components/ui/Modals/ArimedesModal";
import NewResearchModal from "@/lib/components/ui/Modals/NewResearchModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import Combinator from "@/lib/eth/Combinator";
import wGOLD from "@/lib/eth/wGOLD";
import Troops from "@/lib/eth/Troops";

const ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT =
  "The first page has been successfully signed. <br /> I am waiting for the approval in your precious wallet, for signing the second page of the contract...";
const ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT =
  "I can put your troops to work to create weapons if I get paid enought. If you want this I will need your blood print from your two best fingers. Hurry up, you are wasting our time!";
const ARIMEDES_APPROVE_ONLY_ONE_PAGE_CONTRACT =
  "To work for you and start your research you need to sign an employment contract, there are only 1 page to sign. Hurry up, you're wasting your time!";
const ARIMEDES_WAITING_WALLET_APPROVAL =
  "Keep pressing over here on this first page.";
const ARIMEDES_WAITING_FIRST_CONFIRMATION =
  "Keep pressing over here on this second page.";
const ARIMEDES_WAITING_SECOND_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can start your research...";

export default {
  props: ["unit"],
  components: {
    Amount,
    wButton,
    ArimedesModal,
    NewResearchModal,
    TimeBlock,
  },
  data() {
    return {
      isLoadingUnit: false,
      modalArimedesClaim: false,
      modalArimedesNewResearch: false,
      modalArimedesApproval: false,
      isLoadingClaim: false,
      isLoadingApprove: false,
      isLoadingNewResearch: false,
      signPage: 0,
      textArimedesModal: "",
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
      if (this.unit.combinators && this.unit.combinators.warPreparation) {
        return this.unit.combinators.warPreparation.idCombinator || 0;
      }
      return 0;
    },
    infoWeapon() {
      if (this.unit.combinators && this.unit.combinators.warPreparation) {
        return this.unit.combinators.warPreparation;
      }
      return {};
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
    initData() {
      this.tokenA = this.addresses.wGOLD;
      this.tokenB = this.unit.contractAddress[this.networkInfo.id];
      this.combinatorContract = new Combinator(
        this.addresses.combinator,
        this.addresses.combinatorManager
      );
      this.tokenAContract = new wGOLD(this.tokenA);
      this.tokenBContract = new Troops(this.tokenB);
    },
    async loadData() {
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
        this.combinators = await this.combinatorContract.combinators(
          this.combinatorId,
          this.account
        );

        const blockClaim =
          parseInt(this.combinators.startBlock) +
          parseInt(this.getGeneralConfig.blocks);

        if (this.currentBlockNumber > blockClaim) {
          this.isClaim = true;
        } else {
          this.isClaim = blockClaim - this.currentBlockNumber;
          this.claimPercentage =
            100 - parseInt((this.isClaim / this.getGeneralConfig.blocks) * 100);
        }

        this.getTokenAConfig = await this.combinatorContract.getTokenAConfig(
          this.account,
          this.tokenA,
          this.combinatorId
        );
        this.getTokenBConfig = await this.combinatorContract.getTokenBConfig(
          this.account,
          this.tokenB,
          this.combinatorId
        );
      }
      this.isLoadingUnit = true;
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
          this.addresses.combinator
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
          this.addresses.combinator
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
          this.addresses.combinator
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
      this.modalArimedesNewResearch = true;
      this.combinatorInfo = {
        getGeneralConfig: this.getGeneralConfig,
        getTokenAConfig: this.getTokenAConfig,
        getTokenBConfig: this.getTokenBConfig,
        unit: this.unit,
        infoWeapon: this.infoWeapon,
      };
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
      } catch (error) {
        return ToastSnackbar.error(error);
      } finally {
        this.isLoadingNewResearch = false;
      }
    },
    openModalClaim() {
      this.textClaim = "Your search has been completed, and yours is available";
      this.textConfirmClaim = "Finish research";
      this.modalArimedesClaim = true;
    },
    async claim() {
      try {
        this.isLoadingClaim = true;
        const confirmTransaction = this.combinatorContract.claimGameItemFromTokens(
          this.combinatorId,
          this.account
        );

        this.textConfirmClaim = ARIMEDES_WAITING_WALLET_APPROVAL;

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
          this.textConfirmClaim = "I'm sending your weapon....";
        });

        confirmTransaction.on("receipt", () => {
          ToastSnackbar.success(
            "Weapon send successfully Arimedes - War Engineer"
          );
          this.isLoadingClaim = false;
          this.modalArimedesClaim = false;
        });
      } catch (error) {
        this.isLoadingClaim = true;
        return ToastSnackbar.error(error);
      }
    },
  },
  mounted() {
    this.initData();
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
