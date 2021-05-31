<template>
  <v-dialog content-class="wood" persistent :value="open" width="650px">
    <v-card v-if="open">
      <v-card-title class="my-2">
        <h3>{{ title }}</h3>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <w-button class="mr-1" size="small" @click="$emit('close')">
          Close
        </w-button>
        <w-button
          size="small"
          @click="$emit('confirm')"
          :disabled="disabledConfirm"
        >
          {{ isLoading ? "Waiting..." : "Confirm" }}
        </w-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import wButton from "@/lib/components/ui/Utils/wButton";

export default {
  props: ["open", "title", "isLoading", "disabledConfirm"],
  components: {
    wButton,
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url("/images/battle/modal.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 15px;
  height: 450px;
}

.v-card__text {
  height: 250px;
}

@media only screen and (max-width: 650px) {
  .theme--dark.v-card {
    background-color: #000 !important;
    background-image: url("/images/battle/bg-wars.png");
    background-repeat: repeat;
    padding: 15px 0px;
    height: auto !important;
  }

  .v-card__text {
    height: auto !important;
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
