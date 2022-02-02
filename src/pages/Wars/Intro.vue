<template>
  <div class="background">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <Button
            type="wtertiary"
            icon="arrow-back"
            :handleClick="backToHome"
            text="Back to home"
            noPadding
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col md="3" class="battle-header">
          <Title text="Choose your race for War" />
        </v-col>
        <v-col md="9" class="d-flex justify-end align-center">
          <div>
            <div class="prize-pool">Battle to claim up to:</div>
            <div class="d-flex justify-center align-center">
              <div class="prize-amount">500.000</div>
              <img src="/images/wGOLD.png" height="64" width="64" alt="wGOLD" />
            </div>
          </div>
          <img
            class="invert"
            width="158"
            height="158"
            src="/images/battle/treasure-fed.webp"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div ref="raceSelect" class="race-select">
            <div class="race-container">
              <h2 class="text-center mb-1">Elves</h2>
              <v-img
                class="race-image"
                src="/images/troops/wferal-spirit-portrait.png"
                alt="Elves"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button type="wprimary" text="Enlist now" :handleClick="() => {}" isBlock />
              </div>
            </div>

            <div class="race-container">
              <h2 class="text-center mb-1">Humans</h2>
              <v-img
                class="race-image"
                src="/images/troops/wwizard-portrait.png"
                alt="Humans"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button type="wprimary" text="Enlist now" :handleClick="() => {}" isBlock />
              </div>
            </div>

            <img width="46" src="/images/icons/swords.png" />

            <div class="race-container">
              <h2 class="text-center mb-1">
                Orcs
                <span class="arrow-down"></span>
              </h2>
              <v-img
                class="race-image invert-image"
                src="/images/troops/wshaman-portrait.png"
                alt="Orcs"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button type="wprimary" text="Enlist now" :handleClick="() => {}" isBlock />
              </div>
            </div>

            <div ref="raceSelect" class="race-container">
              <h2 class="text-center mb-1">Undead</h2>
              <v-img
                class="race-image invert-image"
                src="/images/troops/wwitch-portrait.png"
                alt="Undead"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button type="wprimary" text="Enlist now" :handleClick="() => {}" isBlock />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";

export default {
  components: { Title, Button },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
  },
  async mounted() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url("/images/background/red-mountains.png");
  background-size: cover;
  background-position: top;
}
.prize-pool {
  font-weight: bold;
  font-size: 36px;
  line-height: 1.3;
}
.prize-amount {
  font-weight: bold;
  font-size: 56px;
  line-height: 1.3;
  color: #ffb800;
}
.invert {
  transform: scaleX(-1);
}
.race-select {
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  .race-container {
    display: inline-block;
  }
}
.enlist-container {
  margin-top: 16px;
  padding: 0 13%;
}
</style>
