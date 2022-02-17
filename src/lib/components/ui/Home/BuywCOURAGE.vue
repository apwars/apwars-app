<template>
  <div>
    <div v-if="!isLoading" class="courage-container">
      <v-row no-gutters>
        <v-col>
          <div class="d-flex align-center justify-center">
            <img
              class="mr-1"
              width="32px"
              height="28px"
              src="/images/icons/chest.png"
              alt="chest"
            />
            <game-text header="h4" class="text-center">
              wCOURAGE Packs
            </game-text>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-center align-center">
          <div class="d-flex justify-center align-center">
            <div class="token-image">
              <v-img src="/images/wcourage.png" alt="wCOURAGE" />
              <div class="discount">
                <div>20%</div>
                <div>OFF</div>
              </div>
            </div>

            <div class="d-flex flex-column justify-center align-center">
              <div class="qty">
                <Amount :amount="packwCOURAGE.content[0].amount" formatted symbol="wCOURAGE" /> 
              </div>
              <div class="price">
                <span class="d-flex align-center"
                  >Price:
                  <span class="d-flex align-center ml-1"
                    ><v-img
                      src="/images/wgold.png"
                      height="18px"
                      width="18px"
                      alt="wGOLD"
                    />
                    <Amount :amount="packwCOURAGE.price.amount" formatted symbol="wGOLD" /> 
                  </span></span>
              </div>
              <div>
                <wButton
                  @click="buyPack"
                  class="mt-1"
                  size="small"
                  :disabled="isLoadingBuy || packwCOURAGE.remainingAmount <= 0"
                >
                  Buy this pack
                </wButton>
                <div class="qty-info">
                  <template v-if="packwCOURAGE.remainingAmount > 0"
                    >{{ packwCOURAGE.amount - packwCOURAGE.soldAmount }} /
                    {{ packwCOURAGE.amount }}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
<script>
import PacksController from "@/controller/PacksController";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { GameText, wButton, Amount },
  data() {
    return {
      packwCOURAGE: {},
      isLoading: true,
      isLoadingBuy: false,
    };
  },
  methods: {
    async getPackwCOURAGE() {
      const controller = new PacksController();
      let items = await controller.getByType("CELEBRATION_FESTIVAL");
      this.packwCOURAGE = items.find(
        (item) => item.package === "CELEBRATION_FESTIVAL_COURAGE"
      );
    },
    async buyPack() {
      try {
        const packageName = "CELEBRATION_FESTIVAL_COURAGE";
        this.isLoadingBuy = true;
        const controller = new PacksController();
        await controller.buyPack(this.account, packageName);
        ToastSnackbar.success("The pack was purchased successfully!");
      } catch (error) {
        const mappedErrors = {
          INVALID_AMOUNT: `We don't have any more from this pack to sell.`,
          INVALID_BALANCE: `You don't have balance to buy this pack.`,
        };
        ToastSnackbar.error(mappedErrors[error.code] || error.message);
        console.error(
          "Something went wrong while trying to buy this pack",
          error
        );
      } finally {
        this.isLoadingBuy = false;
      }
    },
  },
  async created() {
    await this.getPackwCOURAGE();
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.courage-container {
  width: 80%;
}
.token-image {
  width: 96px;
  position: relative;
  margin-right: 16px;
}
.qty {
  font-size: 21px;
  font-weight: bold;
  text-align: center;
}
.price {
  font-size: 14px;
  text-align: center;
}
.discount {
  position: absolute;
  top: 0;
  right: 0;
  background-color: chartreuse;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.qty-info,
.qty-balance {
  height: 13px;
  font-weight: bold;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  width: 100%;
  color: #11d300;
  margin-top: 2px;
}
</style>
