<template>
  <div class="wars-container">
    <div class="d-flex justify-center">
      <img src="/images/wars.png" height="64" />
    </div>
    <Countdown
      v-if="stepWar.dateTime"
      class="mt-0"
      :time="stepWar.dateTime"
      hideEnd
      @end="getStepWar()"
    />
    <div class="rewards-text mt-2">Join the battle to receive reWARds. Enlist now and become a true Warrior!</div>

    <div class="buttons-container">
      <Button type="wsecondary" icon="swords" size="small" text="Go to War" />
      <Button class="ml-1" type="wsecondary" icon="chest" size="small" text="Buy Packs" />
    </div>
  </div>
</template>
<script>
import WarsController from "@/controller/WarsController";

import Button from "@/lib/components/ui/Buttons/Button";
import Countdown from "@/lib/components/ui/Utils/Countdown";

export default {
  components: { Button, Countdown },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
  },
  data() {
    return {
      stepWar: {},
    };
  },
  methods: {
    async fetchStepWar() {
      if (!this.isConnected || !this.account) {
        return {}
      }
      const controller = new WarsController();
      const lastId = await controller.getLastId();
      const lastWar = await controller.getOne(lastId.id);

      let step = {
        title: "War is coming soon...",
        dateTime: new Date(lastWar.deadlines.startEnlistment).getTime(),
      };

      const dateNow = new Date().getTime();
      if (dateNow > new Date(lastWar.deadlines.endClaimPrize).getTime()) {
        step = {
          title: "War ended!",
          dateTime: 0,
        };
      } else if (
        dateNow > new Date(lastWar.deadlines.endEnlistment).getTime()
      ) {
        step = {
          title: "Collect prizes and wUNITS",
          dateTime: new Date(lastWar.deadlines.endClaimPrize).getTime(),
        };
      } else if (
        dateNow > new Date(lastWar.deadlines.startEnlistment).getTime()
      ) {
        step = {
          title: "Enlistment ends in",
          dateTime: new Date(lastWar.deadlines.endEnlistment).getTime(),
        };
      }
      step.dateTime -= dateNow;

      if (step.dateTime < 0) {
        step.dateTime = 0;
      }

      this.stepWar = step;
    },
  },
  async mounted() {
    await this.fetchStepWar();
  },
  watch: {
    isConnected() {
        this.fetchStepWar();
      },
    account() {
      this.fetchStepWar();
    },
  },
};
</script>
<style lang="scss" scoped>
.rewards-text {
  font-weight: bold;
  font-size: 10px;
  line-height: 1.3;
  text-align: center;
  color: #ffeebc;
}
.buttons-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
