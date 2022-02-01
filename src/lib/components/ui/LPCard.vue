<template>
  <div>
    <div class="card-loyalty-program">
      <div class="d-flex justify-center card-loyalty-program-icon">
        <img :src="lp.image" width="50px" :alt="lp.symbol" />
      </div>

      <div class="mt-2">
        <div class="text-center font-weight-bold">Liquidity Pool:</div>
        <h5 class="text-center text-h5 font-weight-bold">{{ lp.symbol }}</h5>
        <div class="text-center font-weight-bold mt-1">Balance:</div>
        <div class="d-flex align-end justify-center">
          <div>
            <img :src="lp.image" width="50px" :alt="lp.symbol" />
          </div>
          <div class="d-flex flex-column align-end ml-1 font-weight-bold">
            <h5 class="text-h5 font-weight-bold">
              <amount
                :amount="lp.balanceLP.amount"
                tooltip
                approximate
                decimals="8"
              />
            </h5>
            <div class="text-caption mt-n1">LP Token</div>
          </div>
        </div>
        <div class="card-loyalty-program-line my-1 mx-4"></div>
        <div class="d-flex justify-center">
          <div class="font-weight-bold mr-2">
            Your rewards <br />
            per hour:
          </div>
          <div class="d-flex align-center">
            <div class="mx-1">
              <img
                src="/images/icons/coins/wSCARS.png"
                width="36px"
                alt="wSCARS"
              />
            </div>
            <div class="d-flex flex-column align-end">
              <h5 class="text-h5 font-weight-bold">
                <amount
                  :amount="lp.accountDistributionPerHour"
                  formatted
                  tooltip
                  approximate
                  decimals="2"
                />
              </h5>
              <div class="text-caption mt-n1">wSCARS</div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-center my-3">
          <Button
            :handleClick="() => handleProvideLiquidity(lp)"
            type="wsecondary"
          >
            <img
              class="mr-1"
              src="/images/pancakeswap.png"
              width="32px"
              alt="pancakeswap"
            />
            {{
              hasSoldier ? "Provide Liquidity" : "You don’t have the soldier"
            }}
          </Button>
        </div>

        <div class="d-flex flex-column justify-center">
          <div class="card-loyalty-program-line"></div>
          <img
            class="mx-auto my-n2"
            src="/images/icons/wooden-chest.png"
            width="96px"
            alt="wooden chest"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-center align-center mt-3">
      Total rewards per hour:
      <img
        class="mx-1"
        src="/images/icons/coins/wSCARS.png"
        width="25px"
        alt="wSCARS"
      />
      <amount
        :amount="lp.totalDistributionPerHour"
        formatted
        tooltip
        approximate
        symbol="wSCARS"
        decimals="2"
      />
    </div>
  </div>
</template>
<script>
import Button from "@/lib/components/ui/Buttons/Button";
import Reward from "@/lib/components/ui/Reward";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Button, Reward, Amount },
  props: {
    lp: {
      type: Object,
      default: null,
    },
    hasSoldier: {
      type: Boolean,
      default: false,
    },
    handleProvideLiquidity: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      tiers: [1, 2, 3, 4],
    };
  },
  methods: {
    getTierUnits(tier) {
      return this.raceUnits.filter((u) => u.tier === tier);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-background {
  background-image: url("/images/background/blue-mountains.png");
  background-size: cover;
  background-position: top;
}
.card-loyalty-program {
  background-color: #0d0600;
  border: 2px solid #ffeebc;
  .card-loyalty-program-icon {
    padding: 12px;
    background-color: #002032;
    width: 80px;
    border: 2px solid #ffeebc;
    margin: 0px auto;
    margin-top: -2px;
    border-radius: 0px 0px 10px 10px;
  }
  .card-loyalty-program-line {
    background-color: #ffeebc;
    height: 2px;
    width: auto;
  }
}
</style>
