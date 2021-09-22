<template>
  <div>
    <template-modal-papyrus
      :open="open"
      :title="'Worker'"
      @close="$emit('close')"
      @confirm="$emit('confirm')"
      :textConfirm="textConfirm"
      :isLoading="isLoading"
      :disabledConfirm="isLoading"
      :disabledClose="isLoading"
    >
      <v-row dense class="d-flex">
        <v-col cols="12" md="3" class="align-self-center">
          <img
            class="worker-img"
            src="/Map/farm-worker/map/assets/worker.png"
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
            <v-tooltip bottom max-width="400px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="black" dark v-bind="attrs" v-on="on">
                  mdi-information-outline
                </v-icon>
              </template>
              <span>
                In Arcadia, workers are very useful, they will be needed to
                build foundations and to clean the lands. Here, you will get
                your FREE workers and prepare them to be sent to Arcadia or you
                could even sell them in the Black Market. Earning some wGOLD or
                using them in your lands is your choice to make. You can spend
                time producing Workers by overseeing the tasks they have to
                perform. When a worker finishes his job, you withdraw him, one
                more will appear and your next withdrawal time will be
                decreased. If you stop your production, the time will increase.
                What are you waiting for?
              </span>
            </v-tooltip>
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
  props: ["open", "isLoading", "text", "textConfirm"],

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
.worker-img {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .worker-img {
    width: 80px;
    margin: 0 auto;
    display: block;
  }
}
</style>
