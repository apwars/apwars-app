<template>
  <div>
    <template-modal-papyrus
      :open="open"
      :title="'Lilith - The transporter'"
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
          <img class="lilith-img" src="/images/black-market/Lilith.png" />
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
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import TemplateModalPapyrus from "@/lib/components/ui/Modals/Templates/TemplateModalPapyrus";

export default {
  props: ["open", "isLoading", "text", "textClose"],

  components: {
    wButton,
    TemplateModalPapyrus,
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
