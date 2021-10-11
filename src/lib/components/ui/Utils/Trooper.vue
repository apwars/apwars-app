<template>
  <div>
    <div class="d-flex justify-center" v-bind:class="{ disabled: info.disabled }">
      <div class="align-self-center">
        <v-img width="160" :src="`/images/troops/${info.name}.png`" />
      </div>
      <div class="ml-1 align-self-center">
        <div :class="$vuetify.breakpoint.mobile ? 'stats mt-2' : 'stats mt-6'">Stats</div>
        <div class="qty">
          Global qty:
          <amount :amount="info.globalQty" decimals="2" compact />
        </div>
        <div class="qty mb-3">
          My qty:
          <amount :amount="info.myQty" decimals="2" compact />
        </div>
        <div class="current-price">Current Price:</div>
        <div class="d-flex justify-start">
          <img
            class="btn mr-1 align-self-center"
            src="/images/wgold.png"
            width="38"
            height="38"
          />
          <div class="price-wgold align-self-center">
            <amount :amount="info.pricewGOLD" decimals="2" compact /> wGOLD
          </div>
        </div>

        <div v-if="$vuetify.breakpoint.mobile"
          class="d-flex flex-column justify-center mt-2">
          <v-img
            class="mb-1"
            max-width="86"
            max-height="50"
            :src="`/images/tier-${info.tier}.png`"
          />
          <a
            :href="`${redirectTo}=${info.contractAddress[this.networkInfo.id]}`">
            <wButton
              style="color: #fff"
              width="70px" height="40">
              <div class="d-flex justify-center">
                <img
                  src="/images/buttons/btn-icon-buy.svg"
                  class="mr-1 align-self-center"
                  height="12"
                />
                <div class="align-self-center">Buy</div>
              </div>
            </wButton>
          </a>
        </div>

        <div v-else
          class="d-flex justify-center mt-3">
          <v-img
            class="mr-1"
            max-width="80"
            max-height="40"
            :src="`/images/tier-${info.tier}.png`"
          />
          <a :href="`${redirectTo}=${info.contractAddress[this.networkInfo.id]}`">
            <wButton
              style="margin-top: -2px; color: #fff"
              width="50px" height="40">
              <div class="d-flex justify-center">
                <img
                  src="/images/buttons/btn-icon-buy.svg"
                  class="mr-1 align-self-center"
                  height="12"
                />
                <div class="align-self-center">Buy</div>
              </div>
            </wButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";

export default {
  props: ["info"],
  components: {
    Amount,
    wButton,
  },

  data() {
    return {
      redirectTo: "https://exchange.apwars.farm/#/swap?showFarms=true&outputCurrency",
    }
  },

  computed: {
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
  }
};
</script>

<style scoped>
.stats {
  font-weight: bold;
  font-size: 28px;
}
.qty {
  color: #ffb800;
  font-weight: bold;
  font-size: 16px;
}
.globalQty {
  color: #f6ff00;
  font-weight: bold;
  font-size: 16px;
}
.qty >>> span,
.globalQty >>> span {
  color: #fff;
}
.current-price {
  font-weight: bold;
  font-size: 18px;
}
.price-wgold {
  font-weight: bold;
  font-size: 16px;
  color: #f6ff00;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(100%);
}

@media only screen and (max-width: 600px) {
  .qty, .globalQty {
    font-size: 14px;
  }
  .current-price {
    font-size: 14px;
  }
}

a {
  text-decoration: none;
}
</style>
