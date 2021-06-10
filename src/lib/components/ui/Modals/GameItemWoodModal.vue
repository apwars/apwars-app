<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm"
    :disabledClose="isLoading"
    :title="title"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <v-row dense>
      <v-col dense cols="3">
        <div class="text-center">
          <v-img class="d-flex" width="100%" :src="imageUrl"></v-img>
          <small class="remaining">Your Amount: {{ amount }}</small>
        </div>
      </v-col>
      <v-col dense cols="9">
        <div>
          <game-text header="h4">{{ gameItemTitle }}</game-text>
          <slot></slot>

          <div class="mt-2" v-if="isLoading">
            <v-progress-circular
              :size="24"
              :width="2"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <span class="ml-1" v-if="waitingStage === 1">Waiting for the wallet approval...</span>
            <span class="ml-1" v-if="waitingStage === 2"
              >Waiting for the first blockchain confirmation...</span
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import GameText from '@/lib/components/ui/Utils/GameText';
import ModalWood from '@/lib/components/ui/Modals/Templates/Wood';

export default {
  props: [
    'open',
    'waitingStage',
    'title',
    'imageUrl',
    'gameItemTitle',
    'isLoading',
    'disabledConfirm',
    'amount',
  ],

  components: {
    GameText,
    ModalWood,
  },
};
</script>
<style scoped>
.remaining {
  color: #f6ff00;
}
</style>
