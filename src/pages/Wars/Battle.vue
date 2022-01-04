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
      <v-row v-if="isLoadingWar">
        <v-col>
          Loading...
        </v-col>
      </v-row>
      <v-row v-else-if="!war">
        <v-col>
          The war was not found
        </v-col>
      </v-row>
      <template v-else>
        <v-row dense no-gutters>
          <v-col class="battle-header">
            <Title
              :text="war.name"
              subtitle="Battlefield"
              tip="How to play?"
              tipRedirect="https://apwars.farm/docs/war/combat-dynamics"
            />
            <countdown
              :time="countdownTimer"
              :title="countdownTitle"
              titleColor="#FFF"
              hideEnd
            />
            <div class="prizepool">
              <img width="158" src="/images/battle/fed-round-2.png" />
              <div class="prize">
                <div class="brown-info">
                  <img src="/images/wgold.png" width="28" />
                  <div class="prize-text"><Amount :amount="war.prizes.winner.amount" compact formatted/> {{ war.prizes.winner.prize }}</div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col><Versus :corpForce="war.factions[0].power.total" :degenForce="war.factions[1].power.total" :winnerAmount="war.prizes.winner.unlocked" :loserAmount="war.prizes.loser.amount" :burnAmount="isWarFinished ? war.prizes.winner.locked : 0" /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <div ref="board" class="race-board">
              <div class="board-info">
                <div class="d-flex justify-space-between">
                  <div class="enlistment-resume d-flex">
                    <div class="prize-share mr-2">
                      <img
                        class="mirror"
                        src="/images/battle/treasure.png"
                        width="32"
                      />
                      <div class="prize-info">
                        {{ war.percentageConqueredPerSlot }}%
                      </div>
                    </div>
                    <div class="brown-info mr-2">
                      <div class="power-text">
                        <Amount
                          :amount="war.races.find(r => r.name === 'Humans').power.total"
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Humans"
                      :handleClick="() => goToEnlistment(1)"
                    />
                  </div>
                  <div class="enlistment-resume d-flex">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Orcs"
                      :handleClick="() => goToEnlistment(2)"
                    />
                    <div class="brown-info ml-2">
                      <div class="power-text">
                        <Amount
                          :amount="war.races.find(r => r.name === 'Orcs').power.total"
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="prize-share ml-2">
                      <img src="/images/battle/treasure.png" width="32" />
                      <div class="prize-info">
                        {{ war.percentageConqueredPerSlot }}%
                      </div>
                    </div>
                  </div>
                </div>
                <FullBoard
                  :currentUserAddress="account.toLowerCase()"
                  :rows="10"
                  :cols="40"
                  :board="fullBoard"
                  rotate="30deg"
                />
                <div class="d-flex justify-space-between">
                  <div class="enlistment-resume d-flex">
                    <div class="prize-share mr-2">
                      <img
                        class="mirror"
                        src="/images/battle/treasure.png"
                        width="32"
                      />
                      <div class="prize-info">
                        {{ war.percentageConqueredPerSlot }}%
                      </div>
                    </div>
                    <div class="brown-info mr-2">
                      <div class="power-text">
                        <Amount
                          :amount="war.races.find(r => r.name === 'Elves').power.total"
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Elves"
                      :handleClick="() => goToEnlistment(4)"
                    />
                  </div>
                  <div class="enlistment-resume d-flex">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Undeads"
                      :handleClick="() => goToEnlistment(3)"
                    />
                    <div class="brown-info ml-2">
                      <div class="power-text">
                        <Amount
                          :amount="war.races.find(r => r.name === 'Undead').power.total"
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="prize-share ml-2">
                      <img src="/images/battle/treasure.png" width="32" />
                      <div class="prize-info">
                        {{ war.percentageConqueredPerSlot }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import FullBoard from "@/lib/components/ui/War/FullBoard";
import Versus from "@/lib/components/ui/Versus";
import Amount from "@/lib/components/ui/Utils/Amount";
import Countdown from "@/lib/components/ui/Utils/Countdown";

export default {
  components: { Title, Button, Versus, FullBoard, Amount, Countdown },
  computed: {
    ...mapGetters({
      getBoardByRace: "war/getBoardByRace"
    }),
    ...mapState({
      war: state => state.war.war,
      isLoadingWar: state => state.war.isLoading
    }),
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },
    countdownTitle() {
      if (this.war.status === "enlistment") {
        return "Enlistment ends in"
      }
      return "Countdown to collect prizes and wUNITS"
    },
    countdownTimer() {
      if (!this.war) {
        return 0;
      }
      const now = new Date().getTime();
      return Math.ceil(Date.parse(this.war.deadlines.endEnlistment) - now, 0);
    },
    humansBoard() {
      return this.getBoardByRace(1);
    },
    orcsBoard() {
      return this.getBoardByRace(2);
    },
    elvesBoard() {
      return this.getBoardByRace(3);
    },
    undeadsBoard() {
      return this.getBoardByRace(4);
    },
    upperBoard() {
      let b = [];
      for (let i = 0; i < 5; i++) {
        let row = [].concat(this.humansBoard[i], this.orcsBoard[i]);
        b.push(row);
      }
      return b;
    },
    bottomBoard() {
      let b = [];
      for (let i = 0; i < 5; i++) {
        let row = [].concat(this.elvesBoard[i], this.undeadsBoard[i]);
        b.push(row);
      }
      return b;
    },
    fullBoard() {
      return [].concat(this.upperBoard, this.bottomBoard)
    },
    isWarFinished() {
      return this.war.status === 'finished';
    }
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    ...mapActions({
      getFullBoard: "war/getFullBoard",
      getWar: "war/getWar",
    }),
    backToHome() {
      this.$router.push("/");
    },
    goToEnlistment(raceId) {
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${raceId}`
      );
    },
    redirectToDoc() {
      window
        .open("https://apwars.farm/docs/war/combat-dynamics", "_blank")
        .focus();
    },
  },
  watch: {
    isConnected() {
      this.getWar(this.$route.params.contractWar);
    },
    account() {
      this.getWar(this.$route.params.contractWar);
      this.getFullBoard(this.$route.params.contractWar)
    }
  },
  async mounted() {
    this.setHeader(false);
    //this.$refs.board.scrollLeft = this.$refs.board.scrollWidth / 2 - 125;
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
  background-size: cover;
  background-image: url("/images/background/battle.png");
}
.battle-header {
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.big-text {
  font-weight: bold;
  font-size: 40px;
  line-height: 53px;
}
.board-label {
  font-size: 12px;
  font-weight: bold;
}

.war-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  .war-title {
    font-weight: bold;
    font-size: 38px;
    color: white;
    margin-bottom: 4px;
  }
  @media screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
}

.prizepool {
  position: relative;
  display: flex;
  justify-content: center;
  > img {
    user-select: none;
    transform: scaleX(-1);
  }
}
.prize-share {
  display: flex;
  align-items: center;
  .prize-info {
    font-weight: bold;
    margin-left: 4px;
  }
}
.prize {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.brown-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a2720;
  border: 1px solid #ffeebc;
  padding: 4px 12px;
  .prize-text {
    display: block;
    white-space: nowrap;
    margin-left: 4px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.2;
    color: #ffb800;
    user-select: none;
  }
  .power-text {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
  }
}
.race-board {
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.board-info {
  display: inline-block;
  min-height: 0;
  margin: 0 auto;
}
.button-container {
  width: 50%;
}
.mirror {
  transform: scaleX(-1);
}
</style>
