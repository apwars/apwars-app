<template>
  <div>
    <template-modal-papyrus
      :open="open"
      :title="title"
      @close="$emit('close')"
      @confirm="$emit('confirm')"
      :textConfirm="textConfirm"
      :isLoading="isLoading"
      :disabledConfirm="isLoading"
      :disabledClose="isLoading"
      v-bind:hideConfirm="hideConfirm"
    >
      <v-row dense class="d-flex">
        <v-col cols="12" md="3" class="align-self-center">
          <img
            class="npc-portrait"
            :src="portrait"
          />
        </v-col>
        <v-col cols="12" md="9" class="d-flex align-self-center">
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
            <slot></slot>
          </p>
          <div v-if="illustration" class="align-self-center">
            <img width="60px" height="60px" :src="illustration" />
          </div>
        </v-col>
      </v-row>
    </template-modal-papyrus>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import TemplateModalPapyrus from "@/lib/components/ui/Modals/Templates/TemplateModalPapyrus";

export default {
  props: [
    "open",
    "isLoading",
    "text",
    "textConfirm",
    "illustration",
    "hideConfirm",
    "title",
    "portrait",
  ],

  components: {
    wButton,
    TemplateModalPapyrus,
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.npc-portrait {
  height: 98px;
  width: 98px;
  border-radius: 8px;
}

@media only screen and (max-width: 600px) {
  .npc-img {
    width: 80px;
    margin: 0 auto;
    display: block;
  }
}
</style>
