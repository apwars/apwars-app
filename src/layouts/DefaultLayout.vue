<template>
  <v-layout class="fill-height">
    <app-header />
    <v-main>
      <div class="mb-3">
        <router-view :key="$route.fullPath"></router-view>

        <v-dialog v-model="showModal" persistent max-width="300">
          <v-card>
            <v-card-title class="headline">
              Connect to Metamask
            </v-card-title>
            <v-card-text>
              <v-container fill-height>
                <v-row class="justify-center align-center">
                  <v-col cols="12">
                    <v-img class="text-center" src="/images/metamask.svg" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="connectToMetaMask">
                Connect
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
    <app-footer />
  </v-layout>
</template>

<script>
import AppHeader from "@/lib/components/ui/App/AppHeader";
import AppFooter from "@/lib/components/ui/App/AppFooter";

export default {
  components: {
    AppHeader,
    AppFooter,
  },

  data() {
    return {
      showModal: true,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  watch: {
    isConnected() {
      this.showModal = !this.isConnected;
      this.watchBlockchain();
    },
  },

  mounted() {
    this.watchBlockchain();
  },

  methods: {
    connectToMetaMask() {
      if (!this.isConnected) {
        this.$store.dispatch("user/connectToMetaMask");
      }
    },

    async watchBlockchain() {
      if (!this.isConnected) {
        return;
      }

      web3.eth.clearSubscriptions();
      await this.updateCurrentBlock();
      web3.eth.subscribe("newBlockHeaders", () => {
        this.updateCurrentBlock();
      });
    },

    async updateCurrentBlock() {
      const blockNumber = await web3.eth.getBlockNumber();
      this.$store.dispatch("user/updateCurrentBlockNumber", { blockNumber });
    },
  },
};
</script>

<style lang="scss">
.app-bar-full {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 0;
  }
}

.text-wGOLD {
  background-image: url("/images/gold-background.png");
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: normal !important;
}
</style>
