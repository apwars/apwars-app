<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading"
    :disabledClose="isLoading"
    :title="titleModal"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <v-row dense>
      <v-col dense cols="3">
        <div class="text-center">
          <v-img class="d-flex" width="100%" :src="nftCollectible.image"></v-img>
        </div>
      </v-col>
      <v-col dense cols="9">
        <div>
          <game-text-h2>{{ nftCollectible.title }}</game-text-h2>
          <div v-if="isBuy">
            <h5>
              Net amount:
              <amount :amount="amountInfo.amount" :decimals="2" />
              wGOLD
            </h5>
            <h5>
              Transaction fee:
              <amount :amount="amountInfo.feeAmount" :decimals="2" />
              wGOLD
            </h5>
          </div>
          <div v-if="isBuy" class="mt-1">
            <span>You will pay</span>
            <amount :amount="amountInfo.totalAmount" :decimals="2" />
            wGOLD for this Item
          </div>
          <div v-else>
            You will receive
            <amount :amount="amountInfo.amount" :decimals="2" />
            wGOLD for this Item
          </div>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from '@/lib/components/ui/Utils/Amount';
import wButton from '@/lib/components/ui/Utils/wButton';
import GameTextH2 from '@/lib/components/ui/Utils/GameTextH2';
import GameTextH4 from '@/lib/components/ui/Utils/GameTextH4';
import ModalWood from '@/lib/components/ui/Modals/Templates/Wood';

export default {
  props: ['open', 'nftCollectible', 'amountInfo', 'type', 'isLoading'],

  components: {
    wButton,
    GameTextH2,
    GameTextH4,
    Amount,
    ModalWood,
  },

  computed: {
    isBuy() {
      return this.type === 'buy';
    },
    titleModal() {
      return this.type === 'buy' ? 'Confirm your purchase order' : 'Confirm your sale order';
    },
  },
};
</script>
<style>
.dividing-line {
  background-image: url('/images/battle/line.png');
  transform: rotate(90deg);
  transform-origin: left top 0;
}
.divider-line {
  background-image: url('/images/battle/line.png');
  transform: rotate(90deg);
  transform-origin: left top 0;
  width: 100px;
}
</style>
