<template>
  <div>
    <div class="btn">
      <v-img class="mx-auto" width="350" src="/images/buttons/btn-wgold.png" />
      <span class="amount-wGOLD">
        <amount :amount="amount" decimals="3" compact />
        <span class="suffix">wGOLD</span>
      </span>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["amount"],

  components: {
    Amount,
  },

  methods: {
    emitClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.btn {
  position: relative;
  margin: 0 auto;
}
.amount-wGOLD {
  position: absolute;
  top: 34px;
  left: 40px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-family: PT Serif;
  font-weight: bold;
}
.suffix {
  background: -webkit-linear-gradient(#f6ff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media only screen and (max-width: 320px) {
  .amount-wGOLD {
    position: absolute;
    font-size: 14px;
    top: 22px;
    left: 26px;
  }
}

@media only screen and (min-width: 320.999px) and (max-width: 375px) {
  .amount-wGOLD {
    position: absolute;
    font-size: 18px;
    top: 28px;
    left: 32px;
  }
}
</style>
