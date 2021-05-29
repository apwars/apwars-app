<template>
  <v-dialog content-class="confirmOrder" persistent :value="open" width="650px">
    <v-card v-if="open">
      <v-card-title class="justify-center my-3">
        <h3>Confirm your purchase</h3>
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col dense cols="3">
            <div class="text-center">
              <v-img
                class="d-flex"
                width="100%"
                :src="nftCollectible.nft.image"
              ></v-img>
            </div>
          </v-col>

          <v-col dense cols="9">
            <div>
              <game-text-h2>{{ nftCollectible.nft.title }}</game-text-h2>
              <h4>
                You will pay
                <amount
                  class="align-self-center"
                  :amount="nftCollectible.totalAmount"
                  decimals="2"
                  approximate
                  tooltip
                />
                wGold for this Game Item.
              </h4>
            </div>
            <v-alert class="my-2" outlined type="warning" border="left" dense>
              You do not have wGOLD to execute this order
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <w-button class="mr-2" size="small" @click="$emit('close')">
          Close
        </w-button>
        <w-button v-if="!isApproved" size="small" @click="approve(type)">
          {{ isApprovedLoading ? "Approving..." : "Approve" }}
        </w-button>
        <w-button
          v-else
          size="small"
          @click="$emit('confirm')"
          :disabled="isLoading"
        >
          {{ isLoading ? "Awaiting..." : "Confirm" }}
        </w-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Utils/wButton";
import GameTextH2 from "@/lib/components/ui/Utils/GameTextH2";
import ToastSnackbar from "@/plugins/ToastSnackbar";

import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  props: ["open", "nftCollectible", "type", "isLoading"],

  components: {
    wButton,
    GameTextH2,
    Amount,
  },

  data() {
    return {
      dialog: false,
      isApproved: false,
      isApprovedLoading: false,
      collectibleContract: {},
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    addresses() {
      return this.$store.getters["user/addresses"];
    },
  },

  watch: {
    open() {
      if (this.open) {
        this.initData();
        this.loadData();
      }
    },
  },

  mounted() {
    if (this.open) {
      this.initData();
      this.loadData();
    }
  },

  methods: {
    initData() {
      if (this.open) {
        this.collectibleContract = new Collectibles(
          this.nftCollectible.nft.contractAddress
        );
        this.wGOLDContract = new wGOLD(this.addresses.wGOLD);
      }
    },
    async loadData() {
      this.isApproved = await this.isApprovedContract(this.type);
    },
    close() {
      this.$emit("close");
    },
    async isApprovedContract(type) {
      const listApproved = {
        sell: async () => {
          return await this.collectibleContract.isApprovedForAll(
            this.account,
            this.addresses.marketNFTS
          );
        },
        buy: async () => {
          return await this.wGOLDContract.hasAllowance(
            this.account,
            this.addresses.marketNFTS
          );
        },
      };
      return listApproved[type]();
    },
    approve(type) {
      const listApproved = {
        sell: () => {
          return this.collectibleContract.setApprovalForAll(
            this.addresses.marketNFTS,
            this.account
          );
        },
        buy: () => {
          return this.wGOLDContract.approve(
            this.account,
            this.addresses.marketNFTS
          );
        },
      };
      const confirmTransaction = listApproved[type]();
      this.isApprovedLoading = true;

      confirmTransaction.on("error", (error) => {
        this.isApprovedLoading = false;
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }
        return ToastSnackbar.error(
          "Raskel - The traveler, there was a problem with your access"
        );
      });
      confirmTransaction.on("receipt", async () => {
        this.isApprovedLoading = false;
        this.isApproved = await this.isApprovedContract(type);
        ToastSnackbar.success("Raskel - The traveler, approved your access");
      });

      return;
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
  padding: 15px;
  height: 450px;
}

.v-card__text {
  height: 240px;
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
  .confirmOrder {
    margin: 10px !important;
  }
}
</style>
