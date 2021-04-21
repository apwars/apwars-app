<template>
  <div>
    <div class="d-flex" v-bind:class="{ disabled: info.disabled }">
      <div class="align-self-center">
        <v-img width="160" :src="`/images/troops/${info.name}.png`" />
      </div>
      <div class="ml-1 align-self-center">
        <div class="stats mt-6">Stats</div>
        <div class="qty mb-3">
          QTY:
          <amount :amount="info.qty" decimals="2" compact />
        </div>
        <div class="current-price">Current Price:</div>
        <div class="d-flex justify-start">
          <v-img
            class="btn mr-1 align-self-center"
            src="/images/wgold.png"
            width="38"
            height="38"
          />
          <div class="price-wgold align-self-center">
            <amount :amount="info.priceWGOLD" decimals="3" compact /> wGOLD
          </div>
        </div>
        <div class="d-flex justify-start">
          <v-img
            class="mt-3"
            max-width="80"
            :src="`/images/tier-${info.tier}.png`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["info"],
  components: {
    Amount,
  },
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

@media only screen and (max-width: 375px) {
  .current-price {
    font-size: 14px;
  }
}
</style>
