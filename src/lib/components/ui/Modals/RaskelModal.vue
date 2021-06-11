<template>
  <div>
    <template-modal-papyrus
      :open="open"
      :title="'Raskel - The traveler'"
      @close="$emit('close')"
      @confirm="$emit('confirm')"
      textConfirm="Ok"
      :textClose="textClose"
      :isLoading="isLoading"
      :disabledConfirm="isLoading"
      :disabledClose="isLoading"
    >
      <v-row dense class="d-flex">
        <v-col cols="12" md="3" class="align-self-center">
          <img class="lilith-img" src="/images/black-market/Raskel.png" />
        </v-col>
        <v-col cols="12" md="9" class="align-self-center">
          <p class="ml-2 mt-1 align-self-center content">
            <v-progress-circular
              class="mr-1"
              v-if="isLoading"
              :size="24"
              :width="2"
              indeterminate
              color="secondary"
            ></v-progress-circular>
            <span v-html="text"></span>
          </p>
        </v-col>
      </v-row>
    </template-modal-papyrus>

    <!-- <v-dialog
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
              <v-progress-circular
                  v-if="isLoading"
                  :size="24"
                  :width="2"
                  indeterminate
                  color="secondary"
                ></v-progress-circular>
              {{text}}
            </p>
          </div>
        </v-card-text>
        <v-card-text class="d-flex mt-2" v-else>
          <div class="d-flex align-self-center">
            <img style="width: 50px; height: 50px" src="/images/black-market/Raskel.png" />
            <p class="ml-2 align-self-center content">
              <v-progress-circular
                v-if="isLoading"
                :size="24"
                :width="2"
                indeterminate
                color="secondary"
              ></v-progress-circular>
              {{text}}
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="mt-n1">
          <v-spacer></v-spacer>
          <div class="d-flex justify-end">
            <wButton :disabled="isLoading" @click="$emit('close')">
              Back
            </wButton>
            <wButton :disabled="isLoading" class="ml-1" @click="$emit('confirm')">
              {{ isLoading ? 'Waiting...' : 'Ok' }}
            </wButton>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
import TemplateModalPapyrus from "@/lib/components/ui/Modals/Templates/TemplateModalPapyrus";

export default {
  props: ['open', 'isLoading', 'text'],

  components: {
    wButton,
    TemplateModalPapyrus,
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.lilith-img {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .lilith-img {
    width: 80px;
    margin: 0 auto;
    display: block;
  }
}
</style>
