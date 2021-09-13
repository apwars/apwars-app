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
            :src="`/images/nfts/${gameItems.id}.png`"
          />
        </div>
        <div v-if="gameItems" class="ml-1 align-self-start">
          <div class="title">Necessary Resources</div>
          <div class="d-flex qty">
            <v-img class="mr-1" max-width="26px" :src="gameItems.combinators.warPreparation.necessaryResources.tokenA" />
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
              :src="gameItems.combinators.warPreparation.necessaryResources.tokenB"
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
              :src="gameItems.combinators.rewardIcon"
            />
            <!-- :src="gameItem.image" -->
            <span>
              Item conquered: <br />
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
      
      <arimedes-modal
        v-if="modalArimedesApproval"
        :open="modalArimedesApproval"
        @confirm="approveContract"
        @close="modalArimedesApproval = false"
        :isLoading="isLoadingApprove"
        :text="textArimedesModal"
        :textConfirm="textConfirmArimdesModal">
      </arimedes-modal>

      <arimedes-modal
        v-if="modalArimedesClaim"
        :open="modalArimedesClaim"
        @confirm="claim"
        @close="modalArimedesClaim = false"
        :isLoading="isLoadingClaim"
        :text="textClaim"
        :textConfirm="textConfirmClaim"
        :weaponIcon="gameItems.image"
      ></arimedes-modal>

      <arimedes-modal
        v-if="modalArimedesNoBalance"
        :open="modalArimedesNoBalance"
        @close="modalArimedesNoBalance = false"
        :text="textNoBalance"
        :weaponIcon="gameItems.image"
        hideConfirm
      ></arimedes-modal>

      <combinator-modal
        v-if="modalArimedesNewResearch"
        :open="modalArimedesNewResearch"
        @confirm="combineTokens"
        @close="modalArimedesNewResearch = false"
        :isLoading="isLoadingNewResearch"
        :info="combinatorInfo"
        textConfirm="Forge"
        title="War Preparation"
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
import CombinatorModal from "@/lib/components/ui/Modals/CombinatorModal";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import Convert from "@/lib/helpers/Convert";


import Combinator from "@/lib/eth/Combinator";
import wCOURAGE from "@/lib/eth/wCOURAGE";
import Collectibles from "@/lib/eth/Collectibles";

const ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT =
  "And now sign over here..";
const ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT =
  "I will need two signatures from you to begin the research... This is the first";
const ARIMEDES_APPROVE_ONLY_ONE_PAGE_CONTRACT =
  "Please sign over here...";
const ARIMEDES_WAITING_WALLET_APPROVAL =
  "Please sign over here...";
const ARIMEDES_WAITING_FIRST_CONFIRMATION =
  "I am checking if everything is fine..";
const ARIMEDES_WAITING_SECOND_CONFIRMATION =
  "I am checking if everything is fine..";
const ARIMEDES_CLAIM =
  "Your research has been completed, and your magical items available.";
const ARIMEDES_WAITING_CLAIM_WALLET_APPROVAL = "I need your signature...";
const ARIMEDES_WAITING_CLAIM_CONFIRMATION =
  "Your research has been completed, and your weapons are available.";

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
    CombinatorModal,
  },

  data() {
    return {
      modalArimedesNoBalance: false,
      modalArimedesClaim: false,
      modalArimedesNewResearch: false,
      isLoadingNewResearch: false,
      modalArimedesApproval: false,
      isApprovedTokenA: false,
      isApprovedTokenB: false,
      isLoadingClaim: false,
      tokenA: "",
      tokenB: "",
      textConfirmArimdesModal: "SIGN CONTRACT",
      combinators: {
        combinatorId: "0",
      },
      combinatorContract: {},
      combinatorInfo: {
        personage: {
          image: "/images/weapon-research/arimedes.png",
          description:
            "Let's sign a research agreement. You will pay me wCOURAGE and burn 1 Magical Item, and they I will return with newly created Magical Items.",
        },
      },
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
        !this.getGeneralConfig.isEnabled) {
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
        this.textArimedesModal = DORANOBLE_WAITING_WALLET_APPROVAL;
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

    openModalArimedesApproval() {
      if (!this.isApprovedTokenA && !this.isApprovedTokenB) {
        this.setInitialStateApproveFirstPage();
      } else {
        this.setInitialStateApproveOnlyPage();
      }
      this.modalArimedesApproval = true;
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
        const confirmTransaction = this.tokenBContract.setApprovalForAll(
          this.combinatorAddress,
          this.account
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
        ...this.combinatorInfo,
        ...{
          getGeneralConfig: this.getGeneralConfig,
          getTokenAConfig: { ...this.getTokenAConfig },
          getTokenBConfig: { ...this.gameItems, ...this.getTokenBConfig },
          getTokenCConfig: this.getGameItemCConfig,
          infoTraining: this.infoTraining,
          rewardIcon: this.gameItems.combinators.rewardIcon,
          combinatorData: this.gameItems.combinators.warPreparation.necessaryResources
        },
      };
      this.combinatorInfo.textCheckbox = `I understand that I will pay ${Convert.fromWei(
        this.getTokenAConfig.amount,
        true
      )} and burn 1 Magical Item for this research.`;
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
          "New combinator successfully sent Arimedes - War Engineer"
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
            "Magical Items send successfully Arimedes - War Engineer"
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