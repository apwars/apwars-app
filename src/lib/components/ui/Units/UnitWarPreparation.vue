<template>
  <div>
    <div
      class="d-flex justify-center"
      v-bind:class="{ disabled: trooper.disabled }"
    >
      <div class="align-self-center">
        <v-img width="160" :src="`/images/troops/${trooper.name}.png`" />
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
            :amount="trooper.myQty"
            decimals="2"
            compact
            :symbol="trooper.name"
          />
        </div>
        <div class="d-flex mt-1 qty">
          <v-img class="mr-1" max-width="26px" src="/images/wGOLD.png" />
          <amount :amount="trooper.myQty" decimals="2" compact symbol="wGOLD" />
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

        <wButton class="mt-1" @click="arimedesApprove = true">
          Approve Research
        </wButton>
      </div>
    </div>

    <arimedes-modal
      :open="arimedesApprove"
      @confirm="approveContract()"
      @close="arimedesApprove = false"
      :isLoading="isLoadingApprove"
      :text="textArimedesModal"
      :textConfirm="textConfirmArimdesModal"
    ></arimedes-modal>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import ArimedesModal from "@/lib/components/ui/Modals/ArimedesModal";

const ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT =
  "The first page has been successfully signed. <br /> I am waiting for the approval in your precious wallet, for signing the second page of the contract...";
const ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT =
  "To work for you and start your research you need to sign an employment contract, there are only 2 pages to sign. Hurry up, you're wasting our time!";
const ARIMEDES_WAITING_WALLET_APPROVAL =
  "I am waiting for the approval in your precious wallet, for signing the first page of the contract...";
const ARIMEDES_WAITING_FIRST_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can sign the second page of the contract...";
const ARIMEDES_WAITING_SECOND_CONFIRMATION =
  "Thank you for trust me my fellow, I am waiting for the first blockchain confirmation, so you can start your research...";

export default {
  props: ["trooper"],
  components: {
    Amount,
    wButton,
    ArimedesModal,
  },
  data() {
    return {
      arimedesApprove: false,
      isLoadingApprove: false,
      textArimedesModal: ARIMEDES_APPROVE_FIRST_PAGE_CONTRACT,
      textConfirmArimdesModal: "Sign the first page",
      signPageContract: 1,
    };
  },
  methods: {
    async approveContract() {
      if (this.signPageContract === 1) {
        await this.approveFistPage();
      } else if (this.signPageContract === 2) {
        await this.approveSecondPage();
      }
    },
    async approveFistPage() {
      this.isLoadingApprove = true;
      this.textArimedesModal = ARIMEDES_WAITING_WALLET_APPROVAL;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.textArimedesModal = ARIMEDES_WAITING_FIRST_CONFIRMATION;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.textArimedesModal = ARIMEDES_APPROVE_SECOND_PAGE_CONTRACT;
      this.textConfirmArimdesModal = "Sign the second page";
      this.signPageContract = 2;
      this.approveSecondPage();
    },
    async approveSecondPage() {
      this.isLoadingApprove = true;
      this.textArimedesModal = ARIMEDES_WAITING_WALLET_APPROVAL;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.textArimedesModal = ARIMEDES_WAITING_SECOND_CONFIRMATION;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.isLoadingApprove = false;
      this.textConfirmArimdesModal = "Sign the first page";
      this.signPageContract = 1;
      this.arimedesApprove = false;
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
