<template>
  <div class="guardian-panel">
    <v-row justify="center">
      <v-expansion-panels>
        <v-expansion-panel class="py-2">
          <v-expansion-panel-header @click="openPanel = !openPanel">
            <div slot="actions">
              <v-btn class="mx-0 mx-md-3" outlined>
                {{ openPanel ? "Close" : "Open" }}
                <v-icon right>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </div>

            <div class="d-flex">
              <div class="ml-0 ml-md-2">
                <img
                  :src="guardian.portrait"
                  :width="$vuetify.breakpoint.mdAndUp ? '120px' : '60px'"
                  :alt="guardian.name"
                />
                <div class="text-h6 text-md-h5 font-weight-bold">
                  {{ guardian.name }}
                </div>
                <p v-if="$vuetify.breakpoint.mdAndUp" class="mt-3 mr-0 mr-md-9">
                  {{ guardian.description }}
                </p>
              </div>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mt-3 ml-0 ml-md-8 ml-lg-16">
              <div
                v-for="item in guardian.addressApprove"
                v-bind:key="item.name"
                class="mt-6 mt-md-2"
              >
                <v-row dense class="d-flex justify-center align-center"> 
                  <v-col cols="2" md="1">
                    <img
                      :src="item.image"
                      width="60px"
                    />
                  </v-col>
                  <v-col cols="8" md="7">
                    <div class="ml-3">
                      <div class="text-h6 text-md-h5 font-weight-bold">
                        {{ item.name }}
                      </div>
                      <p>
                        {{ item.description }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6" md="2">
                    <div
                      v-if="item.isApproved === true"
                      class="text-right font-weight-bold green--text"
                    >
                      Granted
                    </div>
                    <div
                      v-if="item.isApproved === false"
                      class="text-right font-weight-bold red--text"
                    >
                      Not Granted
                    </div>
                  </v-col>
                  <v-col cols="6" md="2">
                    <wButton
                      v-if="item.isApproved === undefined"
                      disabled="true"
                    >
                      <div class="d-flex justify-center">
                        <div class="ml-1 align-self-center">waiting...</div>
                      </div>
                    </wButton>

                    <wButton
                      v-else-if="item.isApproved === false"
                      @click="approved(item, true)"
                    >
                      <div class="d-flex justify-center">
                        <v-icon color="green darken-2">
                          mdi-check
                        </v-icon>
                        <div class="ml-1 align-self-center">Grant</div>
                      </div>
                    </wButton>

                    <wButton v-else @click="approved(item, false)">
                      <div class="d-flex justify-center">
                        <v-icon color="red darken-2">
                          mdi-close
                        </v-icon>
                        <div class="ml-1 align-self-center">Revoke</div>
                      </div>
                    </wButton>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Collectibles from "@/lib/eth/Collectibles";
import ERC20 from "@/lib/eth/ERC20";
import ToastSnackbar from "@/plugins/ToastSnackbar";

export default {
  props: ["guardian"],

  components: {
    GameText,
    wButton,
  },

  data() {
    return {
      openPanel: false,
    };
  },

  computed: {
    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      this.checkAllApproval();
    },
    checkAllApproval() {
      Promise.all(
        this.guardian.addressApprove.map(async (item) => {
          if (item.type === "erc1155") {
            return this.ERC1155Approval(item);
          }
          if (item.type === "erc20") {
            return this.ERC20Approval(item);
          }
          return;
        })
      );
    },
    async ERC1155Approval(item) {
      const smc = new Collectibles(item.address);
      const approved = await smc.isApprovedForAll(
        this.account,
        this.guardian.address.erc1155
      );
      item.isApproved = approved;
      this.$forceUpdate();
      return approved;
    },
    async ERC20Approval(item) {
      const smc = new ERC20(item.address);
      const approved = await smc.hasAllowance(
        this.account,
        this.guardian.address.erc20
      );
      item.isApproved = approved;
      this.$forceUpdate();
      return approved;
    },
    approved(item, approve) {
      if (item.type === "erc1155") {
        this.ERC1155Approve(item, approve);
      }
      if (item.type === "erc20") {
        this.ERC20Approve(item, approve);
      }
    },
    ERC1155Approve(item, approve) {
      const isApproved = item.isApproved;
      item.isApproved = undefined;
      this.$forceUpdate();

      const smc = new Collectibles(item.address);

      const confirmTransaction = smc.setApprovalForAll(
        this.guardian.address.erc1155,
        this.account,
        approve
      );

      confirmTransaction.on("error", (error) => {
        item.isApproved = isApproved;
        this.$forceUpdate();
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }

        return ToastSnackbar.error("An error has occurred");
      });

      confirmTransaction.on("receipt", () => {
        item.isApproved = !isApproved;
        this.$forceUpdate();
        return ToastSnackbar.success("Successfully granted access");
      });

      return;
    },
    async ERC20Approve(item, approve) {
      const isApproved = item.isApproved;
      item.isApproved = undefined;
      this.$forceUpdate();

      const smc = new ERC20(item.address);

      let confirmTransaction;

      if (approve) {
        confirmTransaction = smc.approve(this.account, this.guardian.address.erc20);
      } else {
        const allowance = await smc.allowance(
          this.account,
          this.guardian.address.erc20
        );
        confirmTransaction = smc.decreaseAllowance(
          this.account,
          this.guardian.address.erc20,
          allowance
        );
      }

      confirmTransaction.on("error", (error) => {
        item.isApproved = isApproved;
        this.$forceUpdate();
        if (error.message) {
          return ToastSnackbar.error(error.message);
        }

        return ToastSnackbar.error("An error has occurred");
      });

      confirmTransaction.on("receipt", () => {
        item.isApproved = !isApproved;
        this.$forceUpdate();
        return ToastSnackbar.success("Successfully granted access");
      });

      return;
    },
  },
};
</script>

<style scoped>
.guardian-panel >>> .v-expansion-panel {
  background-color: #181a1b !important;
}
</style>
