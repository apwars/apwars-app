<template>
  <div>
    <v-dialog
      content-class="elevation-0"
      persistent
      :value="open"
      width="556"
      style="box-shadow: none"
    >
      <v-card style="height: 340px">
        <v-card-title>Raskel - The traveler</v-card-title>
        <v-card-text class="d-flex mt-2" v-if="$vuetify.breakpoint.mdAndUp">
          <div class="d-flex align-self-center">
            <img style="width: 150px; height: 150px" src="/images/black-market/Raskel.png" />
            <p class="ml-2 mt-1 align-self-center content">
              {{text}}
            </p>
          </div>
        </v-card-text>
        <v-card-text class="d-flex mt-2" v-else>
          <div class="d-flex align-self-center">
            <img style="width: 50px; height: 50px" src="/images/black-market/Raskel.png" />
            <p class="ml-2 align-self-center content">
              {{text}}
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="mt-n1">
          <v-spacer></v-spacer>
          <div class="d-flex justify-end" v-if="!hideOk">
            <wButton @click="$emit('close')">
              Back
            </wButton>
            <wButton :disabled="isLoading" class="mr-2" @click="$emit('confirm')">
              {{ isLoading ? 'Waiting...' : 'Ok' }}
            </wButton>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
export default {
  props: ['open', 'hideOk', 'isLoading', 'text'],

  components: {
    wButton,
  },

  methods: {
    close() {
      this.$emit('close');
    },
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
  font-size: 90%;
}
</style>
