<template>
  <div class="background">
    <v-container class="complete">
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
      <v-row v-if="!war || !nftCheck || isLoadingWar" class="complete">
        <v-col class="complete d-flex flex-column justify-center align-center">
          <div class="prize-pool text-center">Loading War data...</div>
        </v-col>
      </v-row>
      <v-row v-else-if="phase === 'not-started'" class="complete">
        <v-col class="complete d-flex flex-column justify-center align-center">
          <div class="prize-pool">War is coming soon...</div>
          <countdown
              id="countdown"
              :time="countdownTimer"
              hideEnd
            />
        </v-col>
      </v-row>
      <template v-else>
      <v-row dense no-gutters>
        <v-col md="3" class="battle-header">
          <Title text="Choose your race for War" />
        </v-col>
        <v-col md="9" class="d-flex justify-end align-center">
          <div>
            <div class="prize-pool">Battle to claim up to:</div>
            <div class="d-flex justify-center align-center">
              <div class="prize-amount" v-if="war"><Amount
                      :amount="war.prizes.winner.logisticsFunctionPrize.K"
                      compact
                      formatted
                      tooltip
                    /></div>
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
                <Button
                  type="wprimary"
                  text="Enlist now"
                  :handleClick="() => goToEnlistment(4)"
                  :disabled="isEnlistmentDisabled('Elves')"
                  isBlock
                />
                <template v-if="!hasHumanSoldier">
                  <div class="validation mt-1">
                    <img
                      src="/images/icons/human-nft.png"
                      alt="Human Soldier"
                      class="mr-1"
                    />
                    You dont't have the soldier
                  </div>
                  <Button
                    class="mt-1"
                    type="whot"
                    text="Unlock Soldier"
                    :handleClick="goToTMJ"
                    isBlock
                  />
                </template>
                <template v-if="!hasCompleteFormation('Elves')">
                  <div
                    class="validation mt-2"
                  >
                    You don't have a complete formation
                  </div>
                  <Button
                    class="mt-1"
                    type="wprimary"
                    text="Buy Pack"
                    icon="blue-chest-closed"
                    color="#162438"
                    :handleClick="() => goToPacks('Elves')"
                    isBlock
                  />
                </template>
              </div>
            </div>

            <div class="race-container">
              <h2 class="text-center mb-1">Humans</h2>
              <v-img
                class="race-image"
                src="/images/troops/wwizard-portrait.png"
                alt="Humans"
              >
              </v-img>
              <div class="enlist-container">
                <Button
                  type="wprimary"
                  text="Enlist now"
                  :handleClick="() => goToEnlistment(1)"
                  :disabled="isEnlistmentDisabled('Humans')"
                  isBlock
                />
                <template v-if="!hasHumanSoldier">
                  <div class="validation mt-1">
                    <img
                      src="/images/icons/human-nft.png"
                      alt="Human Soldier"
                      class="mr-1"
                    />
                    You dont't have the soldier
                  </div>
                  <Button
                    class="mt-1"
                    type="whot"
                    text="Unlock Soldier"
                    :handleClick="goToTMJ"
                    isBlock
                  />
                </template>
                <template v-if="!hasCompleteFormation('Humans')">
                  <div class="validation mt-2">
                    You don't have a complete formation
                  </div>
                  <Button
                    class="mt-1"
                    type="wprimary"
                    text="Buy Pack"
                    icon="blue-chest-closed"
                    color="#162438"
                    :handleClick="() => goToPacks('Humans')"
                    isBlock
                  />
                </template>
              </div>
            </div>

            <img width="46" src="/images/icons/swords.png" />

            <div class="race-container">
              <h2 class="text-center mb-1">
                Orcs
                <span class="arrow-down"></span>
              </h2>
              <v-img
                class="race-image invert"
                src="/images/troops/wshaman-portrait.png"
                alt="Orcs"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button
                  type="wprimary"
                  text="Enlist now"
                  :handleClick="() => goToEnlistment(2)"
                  :disabled="isEnlistmentDisabled('Orcs')"
                  isBlock
                />
                <template v-if="!hasOrcSoldier">
                  <div class="validation mt-1">
                    <img
                      src="/images/icons/orc-nft.png"
                      alt="Orc Soldier"
                      class="mr-1"
                    />
                    You dont't have the soldier
                  </div>
                  <Button
                    class="mt-1"
                    type="whot"
                    text="Unlock Soldier"
                    :handleClick="goToTMJ"
                    isBlock
                  />
                </template>
                <template v-if="!hasCompleteFormation('Orcs')">
                  <div class="validation mt-2">
                    You don't have a complete formation
                  </div>
                  <Button
                    class="mt-1"
                    type="wprimary"
                    text="Buy Pack"
                    icon="blue-chest-closed"
                    color="#162438"
                    :handleClick="() => goToPacks('Orcs')"
                    isBlock
                  />
                </template>
              </div>
            </div>

            <div ref="raceSelect" class="race-container">
              <h2 class="text-center mb-1">Undead</h2>
              <v-img
                class="race-image invert"
                src="/images/troops/wwitch-portrait.png"
                alt="Undead"
                @click="() => {}"
              >
              </v-img>
              <div class="enlist-container">
                <Button
                  type="wprimary"
                  text="Enlist now"
                  :handleClick="() => goToEnlistment(3)"
                  :disabled="isEnlistmentDisabled('Undead')"
                  isBlock
                />
                <template v-if="!hasOrcSoldier">
                  <div class="validation mt-1">
                    <img
                      src="/images/icons/orc-nft.png"
                      alt="Orc Soldier"
                      class="mr-1"
                    />You dont't have the soldier
                  </div>
                  <Button
                    class="mt-1"
                    type="whot"
                    text="Unlock Soldier"
                    :handleClick="goToTMJ"
                    isBlock
                  />
                </template>
                <template v-if="!hasCompleteFormation('Undead')">
                  <div class="validation mt-2">
                    You don't have a complete formation
                  </div>
                  <Button
                    class="mt-1"
                    type="wprimary"
                    text="Buy Pack"
                    icon="blue-chest-closed"
                    color="#162438"
                    :handleClick="() => goToPacks('Undead')"
                    isBlock
                  />
                </template>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <Button type="wsecondary" text="Skip enlistment and go to War" :handleClick="skipEnlistment" />
        </v-col>
      </v-row>
      </template>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

import SoldierController from "@/controller/SoldierController";

import { NFT } from "@/data/NFTs";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import Amount from "@/lib/components/ui/Utils/Amount";
import Countdown from "@/lib/components/ui/Utils/Countdown";

export default {
  components: { Title, Button, Amount, Countdown },
  computed: {
    ...mapState({
      isLoadingWar: (state) => state.war.isLoading,
      completeFormations: (state) => state.war.completeFormations,
      war: (state) => state.war.war,
      phase: (state) => state.war.phase,
      countdownTimer: (state) => state.war.countdown,
    }),
    ...mapGetters({
      introWar: "war/introWar"
    }),
    account() {
      return this.$store.getters["user/account"];
    },
  },
  data() {
    return {
      nftCheck: null,
      hasHumanSoldier: false,
      hasOrcSoldier: false,
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      getWar: "war/getWar",
      setupMusic: "music/setupMusic",
      clearMusic: "music/clearMusic",
    }),
    backToHome() {
      this.$router.push("/");
    },
    goToTMJ() {
      this.$router.push("/the-monstrous-journey");
    },
    goToPacks(race) {
      this.$router.push({ path: "/packs", query: { race, isEnlistment: true } });
    },
    goToEnlistment(raceId) {
      this.$router.push({ path: `/war/enlistment/${raceId}`});
    },
    skipEnlistment() {
      this.$router.push('/war');
    },
    async checkSoldier() {
      const controller = new SoldierController();
      try {
        await controller.getNFTByType(this.account, NFT.HUMAN);
        this.hasHumanSoldier = true;
      } catch (error) {
        this.hasOrcSoldier = false;
      }
      try {
        await controller.getNFTByType(this.account, NFT.ORC);
        this.hasOrcSoldier = true;
      } catch (error) {
        this.hasOrcSoldier = false;
      }
      this.nftCheck = true;
    },
    async fetchData() {
      if (this.account && !this.isLoadingWar) {
        await this.getWar();
        await this.checkSoldier();
        if (!this.introWar) {
          this.$router.push('/war');
        }
      }
    },
    hasCompleteFormation(race) {
      return this.completeFormations[race];
    },
    isEnlistmentDisabled(race) {
      const hasSoldier =
        race === "Humans" || race === "Elves"
          ? this.hasHumanSoldier
          : this.hasOrcSoldier;
      return !this.hasCompleteFormation(race) || !hasSoldier;
    },
  },
  watch: {
    account() {
      this.fetchData();
      if (!this.track) {
        this.setupMusic({ musicKey: "WAR", isLoop: true });
      }
    },
  },
  async mounted() {
    this.setHeader(false);
    await this.fetchData(); 
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    if (!to.path.includes("/war")) {
      this.clearMusic();
    }
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
  min-height: 260px;
}

.validation {
  width: 100%;
  border: 2px dashed #ffb800;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffb800;
}

.complete {
  height: 100%;
}
</style>
