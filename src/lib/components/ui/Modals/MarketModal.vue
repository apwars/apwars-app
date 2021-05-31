<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading"
    :title="titleModal"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <v-row dense>
      <v-col dense cols="3">
        <div class="text-center">
          <v-img
            class="d-flex"
            width="100%"
            :src="nftCollectible.image"
          ></v-img>
        </div>
      </v-col>

      <v-col dense cols="9">
        <div>
          <game-text-h2>{{ nftCollectible.title }}</game-text-h2>
          <div v-if="isBuy" class="mt-3">
            <span>You will pay</span>
            <amount :amount="amountInfo.totalAmount" :decimals="2" />
            wGOLD for this Game Item
          </div>
          <div v-else class="mt-3">
            You will receive
            <amount :amount="amountInfo.amount" :decimals="2" />
            wGOLD for this Game Item
          </div>
          <h5 class="mt-1">
            This transaction has a fee of
            <amount :amount="amountInfo.feeAmount" :decimals="2" />
            wGOLD
          </h5>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Utils/wButton";
import GameTextH2 from "@/lib/components/ui/Utils/GameTextH2";
import GameTextH4 from "@/lib/components/ui/Utils/GameTextH4";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";

import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  props: ["open", "nftCollectible", "amountInfo", "type", "isLoading"],

  components: {
    wButton,
    GameTextH2,
    GameTextH4,
    Amount,
    ModalWood,
  },

  computed: {
    isBuy() {
      return this.type === "buy";
    },
    titleModal() {
      return this.type === "buy"
        ? "Confirm your purchase"
        : "Confirm your sale";
    },
  },
};
</script>
