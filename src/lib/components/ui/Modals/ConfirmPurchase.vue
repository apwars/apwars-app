<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>
        <v-col class="d-flex justify-center align-center">
          <v-img
            contain
            src="/images/battle/modal.png"
            max-width="600"
            class="align-center justify-center"
          >
            <v-col :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
              <v-col cols="12" lg="4" md="4" sm="12">
                <div class="text-center">
                  <v-img class="" max-width="250" :src="nftCollectible.image"></v-img>
                </div>
              </v-col>
              <v-col cols="12" lg="9" md="9" sm="12">
                <h2>Confirm your purchase</h2>
                <game-text-h-1>{{ nftCollectible.title }}</game-text-h-1>
                <h4>
                  You will pay {{ amount }}
                  wGold for this nft.
                </h4>
                <h5>This transaction has a fee of {{ fee }} ({{ percent }})</h5>

                <div class="d-flex ml-n6 mt-6">
                  <approve-cancel class="mx-2" size="small">Cancel</approve-cancel>

                  <approve-cancel class="mx-2" size="small">Approve</approve-cancel>
                </div>
              </v-col>
            </v-col>
          </v-img>
        </v-col>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Utils/wButton';

export default {
  props: ['open', 'title', 'available', 'label'],

  components: {
    wButton,
  },

  data() {
    return {
      dialog: false,
      fee: 0,
      percent: 0,
      amount: 0,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },
    nftCollectible() {
      const nft = getCollectibles().find(
        collectible => collectible.id.toString() === this.nftId.toString()
      );
      return nft !== undefined ? nft : { status: 'Notfound' };
    },
  },

  mounted() {},

  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {},
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
