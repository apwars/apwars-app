<template>
  <div class="wars-container">
    <div class="d-flex justify-center">
      <img src="/images/wars.png" height="64" />
    </div>
    <div class="countdown-container mt-1">
      <v-skeleton-loader
        type="image"
        width="100%"
        height="100%"
        v-if="isLoading"
      />
      <template v-else>
        <div class="step-title">{{ stepWar.title }}</div>
        <Countdown
          v-if="stepWar.dateTime"
          :time="stepWar.dateTime"
          hideEnd
          @end="getStepWar()"
        />
      </template>
    </div>
    <div class="rewards-text mt-2">
      Join the battle to receive reWARds. Enlist now and become a true Warrior!
    </div>

    <div class="buttons-container">
      <Button type="wsecondary" icon="swords" text="Go to War" :handleClick="() => $router.push('/war/intro')" />
      <Button
        class="ml-1"
        type="wsecondary"
        icon="chest"
        text="Buy Packs"
        :handleClick="() => $router.push('/packs')"
      />
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
      isLoading: true,
      stepWar: {},
    };
  },
  methods: {
    async fetchStepWar() {
      if (!this.isConnected || !this.account) {
        return {};
      }
      this.isLoading = true;
      try {
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
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
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
.countdown-container {
  height: 102px;
}
.step-title {
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
  color: #ffeebc;
}
.buttons-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
