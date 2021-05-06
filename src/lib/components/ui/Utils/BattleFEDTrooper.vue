<template>
  <div>
    <div class="troop" :style="`width: ${imgWidth}`">
      <div class="d-flex">
        <v-img
          :max-width="imgWidth"
          :src="`/images/battle/troops/${info.name}.png`"
        />
      </div>
      <span class="staked">
        Survivors:
        <amount :amount="info.mySurvivor" decimals="2" compact approximate />
      </span>
      <span class="troop-symbol">{{ info.name }}</span>
      <span class="my-troops">
        My dead troops:
        <amount :amount="info.myDead" decimals="2" compact approximate />
      </span>
    </div>

    <v-row class="ma-0">
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center justify-md-start pa-0"
      >
        <div class="global-troops align-self-center">
          Global troops survivors:
          <div>
            QTY:
            <amount
              :amount="info.troopsSurvivors"
              decimals="2"
              compact
              approximate
            />
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center justify-md-start pa-0"
      >
        <div class="global-troops align-self-center">
          Global dead troops:
          <div>
            QTY:
            <amount
              :amount="info.troopsDead"
              decimals="2"
              compact
              approximate
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["info"],
  components: {
    Amount,
  },
  data() {
    return {
      openModal: false,
    };
  },
  computed: {
    imgWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        default:
          return "500px";
      }
    },
  },
};
</script>

<style scoped>
.troop {
  position: relative;
}
.staked {
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
}
.troop-symbol {
  position: absolute;
  top: 50%;
  font-size: 13px;
  font-weight: bold;
  right: 15px;
  transform: translate(0%, -50%);
  color: #ffb800;
}
.my-troops {
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  bottom: -5px;
  left: 295px;
  transform: translate(-50%, -50%);
  color: #ffb800;
  width: 300px;
}
.global-troops {
  font-size: 18px;
  font-weight: bold;
  margin-right: 32px;
  width: 100%;
}
.global-troops > div {
  font-size: 22px;
  color: #ffb800;
}

@media only screen and (max-width: 600px) {
  .troop {
    margin: 0 auto;
  }
  .troop-symbol {
    top: 15%;
    font-size: 11px;
    right: 0px;
  }
  .staked {
    font-size: 14px;
    top: 50%;
    left: 65%;
  }
  .my-troops {
    font-size: 14px;
    left: 2400px;
  }
}
</style>
