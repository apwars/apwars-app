<template>
  <div class="background">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <Button
            type="wtertiary"
            text="Back to home"
            :handleClick="backToHome"
            noPadding
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col class="battle-header">
          <Title
            text="WAR IV"
            subtitle="Battle field"
            tip="How to play?"
            tipRedirect="https://apwars.farm/docs/war/combat-dynamics"
          />
          <countdown
              :time="countdownTimer"
              title="Time to claim units and prize"
              hideEnd
            />
          <div class="prizepool">
            <img width="180" src="/images/battle/fed-round-2.png" />
            <div class="prize">
              <img src="/images/wgold.png" width="32" />
              <div class="prize-text">800k wGOLD</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col><Versus /></v-col>
      </v-row>
      <v-row>
        <v-col md="5">
          <div class="race-board">
            <div class="board-info">
              <div class="board-label d-flex justify-start align-center mr-3">
                <div class="prize-share mr-2">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
                <Amount :amount="150000000" compact formatted symbol="Humans Power Units" />
              </div>
              <Board
                :rows="6"
                :cols="16"
                unitImage="/images/troops/wwarrior.webp"
              />
              <div class="d-flex justify-end mt-1 mr-2">
                <Button
                  type="wprimary"
                  text="Enlist Humans"
                  :handleClick="() => goToEnlistment(1)"
                />
              </div>
            </div>
          </div>

          <div class="race-board mt-6">
            <div class="board-info">
              <div class="board-label d-flex justify-start align-center mr-3">
                <div class="prize-share mr-2">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
                <Amount :amount="150000000" compact formatted symbol="Elves Power Units" />
              </div>
              <Board
                :rows="6"
                :cols="16"
                unitImage="/images/troops/warmoured-elf.webp"
              />
              <div class="d-flex justify-end mt-1 mr-2">
                <Button
                  type="wprimary"
                  text="Enlist Elves"
                  :handleClick="() => goToEnlistment(4)"
                />
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="1"
          class="big-text d-flex justify-center align-center"
          >VS</v-col
        >
        <v-col md="5">
          <div class="race-board">
            <div class="board-info">
              <div class="board-label d-flex justify-end align-center mr-3">
                <Amount :amount="150000000" compact formatted symbol="Orcs Power Units" />
                <div class="prize-share ml-2">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
                </div>
                <Board
                  :rows="6"
                  :cols="16"
                  unitImage="/images/troops/wgrunt.webp"
                  invertUnitDirection
                />
                <div class="d-flex justify-start mt-1">
                  <Button
                    type="wprimary"
                    text="Enlist Orcs"
                    :handleClick="() => goToEnlistment(2)"
                  />
                </div>
              </div>
          </div>

          <div class="race-board mt-6">
            <div class="board-info">
              <div class="board-label d-flex justify-end align-center mr-3">
                <Amount :amount="150000000" compact formatted symbol="Undeads Power Units" />
                <div class="prize-share ml-2">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
              </div>

              <Board
                :rows="6"
                :cols="16"
                unitImage="/images/troops/wskeleton-warrior.webp"
                invertUnitDirection
              />

              <div class="d-flex justify-start mt-1">
                <Button
                  type="wprimary"
                  text="Enlist Undeads"
                  :handleClick="() => goToEnlistment(3)"
                />
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
import Board from "@/lib/components/ui/War/Board";
import Versus from "@/lib/components/ui/Versus";
import Amount from "@/lib/components/ui/Utils/Amount";
import Countdown from "@/lib/components/ui/Utils/Countdown";

export default {
  components: { Title, Button, Versus, Board, Amount, Countdown },
  computed: {
    countdownTimer() {
      return 1637711108;
    }
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    goToEnlistment(raceId) {
      this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment/${raceId}`
      );
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

.prizepool {
  position: relative;
  display: flex;
  justify-content: center;
  > img {
    user-select: none;
  }
  .prize {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
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
.race-board {
  width: 100%;
  overflow-x: auto;
  display: flex;
}
.board-info {
  display: inline-block;
  min-height: 0;
  margin: 0 auto;
}
</style>
