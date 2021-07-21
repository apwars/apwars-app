<template>
  <div>
    <div
      class="d-flex justify-center"
      v-bind:class="{ disabled: unit.disabled }"
    >
      <div class="align-self-center">
        <v-img width="160" :src="`/images/troops/${unit.name}.png`" />
      </div>
      <div class="ml-1 align-self-center">
        <div class="title mt-6">Necessary Resources</div>
        <div class="d-flex  mt-1 qty">
          <v-img
            class="mr-1"
            max-width="26px"
            src="/images/icons/battle-shield.png"
          />
          <amount
            :amount="unit.myQty"
            decimals="2"
            compact
            :symbol="unit.name"
          />
        </div>
        <div class="d-flex mt-1 qty">
          <v-img class="mr-1" max-width="26px" src="/images/wGOLD.png" />
          <amount :amount="unit.myQty" decimals="2" compact symbol="wGOLD" />
        </div>
        <div class="d-flex my-1 qty">
          <v-img
            class="mr-1"
            max-width="26px"
            src="/images/icons/hourglass.png"
          />
          <span>9600 blocks - Working time</span>
        </div>
        <hr />
        <div class="d-flex mt-1 qty">
          <img class="mr-1" src="/images/icons/battle-shield.png" />
          <span
            >Weapon conquered: <br />
            Gold shield</span
          >
        </div>

        <wButton
          v-if="!isApproved"
          class="mt-1"
          @click="openModalArimedesApproval()"
        >
          Approve Research
        </wButton>
        <wButton v-else @click="modalArimedesNewResearch = true" class="mt-1">
          New Research
        </wButton>
      </div>
    </div>

    <arimedes-modal
      :open="modalArimedesApproval"
      @confirm="approveContract()"
      @close="modalArimedesApproval = false"
      :isLoading="isLoadingApprove"
      :text="textArimedesModal"
      :textConfirm="textConfirmArimdesModal"
    ></arimedes-modal>

    <new-research-modal
      :open="modalArimedesNewResearch"
      @confirm="combineTokens()"
      @close="modalArimedesNewResearch = false"
      :isLoading="isLoadingNewResearch"
      :info="combinatorInfo"
    ></new-research-modal>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
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
  "To work for you and start your research you need to sign an employment contract, there are only 2 pages to sign. Hurry up, you're wasting your time!";
const ARIMEDES_APPROVE_ONLY_ONE_PAGE_CONTRACT =
  "To work for you and start your research you need to sign an employment contract, there are only 1 page to sign. Hurry up, you're wasting your time!";
const ARIMEDES_WAITING_WALLET_APPROVAL =
  "I am waiting for the approval in your precious wallet, for signing the contract...";
const ARIMEDES_WAITING_FIRST_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can sign the second page of the contract...";
const ARIMEDES_WAITING_SECOND_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can start your research...";

export default {
  props: ["unit"],
  components: {
    Amount,
    wButton,
    ArimedesModal,
    NewResearchModal,
  },
  data() {
    return {
      modalArimedesNewResearch: false,
      modalArimedesApproval: false,
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
      combinatorInfo: {
        tokenA: {
          amount: "10000000000000000000000",
          name: "wGOLD",
        },
        tokenB: {
          amount: "1000000000000000000000",
          name: "wWarrior",
        },
      },
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
      if(this.unit.combinators){
        return this.unit.combinators.warPreparation || 0;
      }
      return 0;
      
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
      console.log(this.addresses.combinatorManager);
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
      const timeBlock = this.combinatorContract.getGeneralConfig(
        this.account,
        this.account,
        this.combinatorId
      );
      console.log(timeBlock);
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
        return ToastSnackbar.error(error.toString());
      } finally {
        this.isLoadingNewResearch = false;
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
