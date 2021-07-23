<template>
  <v-dialog
    content-class="wood elevation-0"
    persistent
    :value="open"
    :width="getWidth"
  >
    <v-card v-if="open">
      <v-card-title class="my-2">
        <h3>{{ title }}</h3>
      </v-card-title>

      <v-card-text :style="`height: ${getHeight}`">
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <w-button
          class="mr-1"
          @click="$emit('close')"
          :disabled="disabledClose"
        >
          {{ getTextClose }}
        </w-button>
        <w-button @click="$emit('confirm')" :disabled="disabledConfirm">
          {{ isLoading ? "Waiting..." : this.getTextConfirm }}
        </w-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";

export default {
  props: [
    "open",
    "title",
    "isLoading",
    "disabledConfirm",
    "disabledClose",
    "width",
    "height",
    "textClose",
    "textConfirm",
  ],
  components: {
    wButton,
  },
  computed: {
    getWidth() {
      if (
        this.width !== null &&
        this.width !== undefined &&
        this.width !== ""
      ) {
        return this.width;
      }
      return "650px";
    },
    getHeight() {
      if (
        this.height !== null &&
        this.height !== undefined &&
        this.height !== ""
      ) {
        return this.height;
      }
      return "250px";
    },
    getTextClose() {
      if (this.textClose === undefined || this.textClose === null) {
        return "Close";
      }
      return this.textClose;
    },
    getTextConfirm() {
      if (this.textConfirm === undefined || this.textConfirm === null) {
        return "Confirm";
      }
      return this.textConfirm;
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url("/images/battle/modal.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 10px 25px;
}

.v-card__actions {
  padding-bottom: 35px !important;
}

@media only screen and (max-width: 650px) {
  .theme--dark.v-card {
    background-color: #000 !important;
    background-image: url("/images/battle/bg-wars.png");
    background-repeat: repeat;
    padding: 30px 0px;
  }

  .v-card__title {
    padding: 0px 25px !important;
    justify-content: center;
    word-break: initial !important;
  }

  .v-card__text {
    height: auto !important;
  }

  .v-card__actions {
    padding-bottom: 5px !important;
  }
}
</style>

<style>
@media only screen and (max-width: 650px) {
  .wood {
    margin: 5px !important;
    border: 2px solid #ffb800;
  }
}
</style>
