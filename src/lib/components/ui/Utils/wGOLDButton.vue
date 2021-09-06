<template>
  <div>
    <div :class="getSize">
      <v-img
        class="mx-auto"
        :width="getWidth"
        src="/images/buttons/btn-wgold.png"
      />
      <span class="amount-wGOLD">
        <span class="text-body-2" v-if="amount==='0'">The FED is collecting fees</span>
        <span v-else class="d-flex align-items-center justify-content-center">
          <amount :amount="amount" decimals="2"          
            tooltip />
          <span class="suffix ml-1">wGOLD</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["amount", "size"],

  components: {
    Amount,
  },

  computed: {
    getSize() {
      switch (this.size) {
        case "small":
          return "btn btn-small";
        default:
          return "btn btn-medium";
      }
    },
    getWidth() {
      switch (this.size) {
        case "small":
          return "280";
        default:
          return "350";
      }
    },
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

.btn.btn-medium {
  width: 350px;
}

.btn.btn-small {
  width: 280px;
}

.btn.btn-medium .amount-wGOLD {
  font-size: 24px;
}

.btn.btn-small .amount-wGOLD {
  font-size: 20px;
}

.amount-wGOLD {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 61%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-family: PT Serif;
  font-weight: bold;
}
.suffix {
  background: -webkit-linear-gradient(#f6ff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media only screen and (max-width: 320px) {
  .btn.btn-small .amount-wGOLD {
    font-size: 14px;
  }

  .btn.btn-medium .amount-wGOLD {
    font-size: 13px;
  }
}

@media only screen and (min-width: 320.999px) and (max-width: 375px) {
  .btn.btn-medium .amount-wGOLD {
    font-size: 18px;
  }

  .btn.btn-medium .amount-wGOLD {
    font-size: 16px;
  }
}
</style>
