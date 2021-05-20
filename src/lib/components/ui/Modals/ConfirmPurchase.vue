<template>
  <v-container>
    <v-col
      :style="
        $vuetify.breakpoint.mdAndUp
          ? 'border-color: #966A3C; border-style: solid; border-width: 2px'
          : ''
      "
    >
      <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
        <v-col cols="12" lg="3" md="3" sm="12">
          <div class="text-center">
            <v-img class="ml-2 mr-2" max-width="250" :src="collectibles[0].image"></v-img>
          </div>
        </v-col>
        <v-col cols="12" lg="9" md="9" sm="12">
          <h1>Confirm your purchase</h1>
          <v-row class="d-block">
            <game-text-h-1>{{ collectibles[0].title }}</game-text-h-1>
          </v-row>
        </v-col>
      </div>
      <div
        v-if="this.radios"
        :class="
          $vuetify.breakpoint.mdAndUp ? 'd-flex justify-end mt-2' : 'd-flex justify-center mt-2'
        "
      >
        <approve-cancel class="mx-2" size="small" @click="confirm()">Approve</approve-cancel>
        <approve-cancel class="mx-2" size="small" @click="close">Cancel</approve-cancel>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import wButton from '@/lib/components/ui/Utils/wButton';

export default {
  props: ['open', 'title', 'available', 'label'],

  components: {
    wButton,
  },

  data() {
    return {};
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },
  },


  mounted() {},

  methods: {
    close() {
      this.$emit('close');
    },
    confirm(){},
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url('/images/modal-background.png');
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 15px;
}

.v-card__title {
  color: #765e55;
  font-size: 15x !important;
  font-weight: bold !important;
}

.content {
  color: #201813;
}

.btn {
  cursor: pointer;
  width: 150px;
  float: right;
}

.card-title-modal {
  font-weight: bold !important;
  font-size: 38px !important;
  background: -webkit-linear-gradient(#ff0000, #bd0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stake-modal-input >>> .v-input__control > .v-input__slot fieldset {
  color: #a47a6a !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.stake-modal-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #32211b !important;
}

.stake-modal-input >>> .v-input__append-inner {
  color: #32211b !important;
  font-weight: bold !important;
  font-size: 13px;
}

.stake-modal-input >>> .v-icon {
  color: #32211c !important;
}

.stake-modal-input.v-input--is-disabled {
  opacity: 0.2;
}

.stake-modal-input >>> input {
  color: #32211c;
  font-weight: bold;
}

.stake-modal-input >>> .v-messages__message {
  font-size: 14px;
  color: #32211c;
  font-weight: bold;
}

.skull-flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
