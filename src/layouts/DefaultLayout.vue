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

        <v-dialog v-model="changeNetwork" persistent max-width="350">
          <v-card>
            <v-card-title class="headline">
              <v-alert
                dense
                border="left"
                type="warning"
                outlined
                class="text-change-network"
              >
                Change your network, you need to connect to BSC
                {{ networkConnect }}
                network
              </v-alert>
            </v-card-title>
            <v-card-text>
              <v-container fill-height>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="12">
                    <div class="d-flex justify-center align-center">
                      <div>Awaiting change...</div>
                      <v-progress-circular
                        class="mx-3"
                        :size="26"
                        :width="2"
                        indeterminate
                        color="orange"
                      ></v-progress-circular>
                    </div>
                    <v-img class="text-center" src="/images/metamask.svg" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
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
      changeNetwork: false,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
    networkConnect() {
      if (this.networkInfo.definedNetwork === "56") {
        return "production";
      }
      return "testnet";
    },
  },

  watch: {
    isConnected() {
      this.showModal = !this.isConnected;
      this.watchBlockchain();
    },
    networkInfo() {
      if (
        this.networkInfo.definedNetwork !== "ALL" &&
        this.networkInfo.definedNetwork !== this.networkInfo.id
      ) {
        this.changeNetwork = true;
      }
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

.text-change-network {
  word-break: break-word;
}
</style>
