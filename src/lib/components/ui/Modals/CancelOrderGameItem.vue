<template>
  <div>
    <v-dialog
      content-class="elevation-0"
      persistent
      :value="open"
      width="556"
      style="box-shadow: none"
    >
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text style="height: 340px">
          <v-row class="d-flex content mt-2 align-center">
            <v-col cols="3">
              <img max-width="60" src="/images/black-market/Raskel.png" />
            </v-col>
            <v-col cols="9">
              <h2 class="ml-2">Raskel - The traveler</h2>
              <p class="ml-2 mt-1" style="font-size: 18px">
                If you cancel this offer I will not receive any fee! Are you
                sure about that? I'm working for nothing!
              </p>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <wButton
              class="mr-1"
              size="small"
              @click="$emit('close')"
              :disabled="isLoading"
            >
              Close
            </wButton>
            <wButton
              :disabled="isLoading"
              class="mr-2"
              size="small"
              @click="$emit('confirm')"
            >
              {{ isLoading ? "Waiting..." : "Confirm" }}
            </wButton>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
export default {
  props: ["open", "isLoading"],

  data() {
    return {
      address: "",
    };
  },
  components: {
    wButton,
  },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url("/images/modal-background.png");
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
  height: 185px;
  color: #201813;
  font-size: 90%;
  display: table-cell;
  vertical-align: middle;
}

.btn {
  cursor: pointer;
  width: 150px;
  float: right;
}
</style>
