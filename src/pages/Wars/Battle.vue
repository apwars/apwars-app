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
        <v-col class="d-flex justify-space-between">
          <Title
            text="Battle field"
            subtitle="WAR IV"
            tip="How to play?"
            tipRedirect="https://apwars.farm/docs/war/combat-dynamics"
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
          <v-col class="d-flex justify-end align-center">
            <div class="race-board">
              <div class="board-label d-flex justify-end align-center">
                <Amount
                  :amount="150000000"
                  formatted
                  symbol="PU"
                />
                <div class="prize-share ml-1">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
              </div>
              <Board
                :rows="6"
                :cols="16"
                unitImage="/images/troops/wwarrior.webp"
              />
              <div class="action-container">
                <Button
                  type="wsecondary"
                  text="Enlist for Humans"
                  :handleClick="() => goToEnlistment(1)"
                />
              </div>
            </div>
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <div class="race-board">
              <div class="board-label d-flex justify-end align-center">
                <Amount
                  :amount="150000000"
                  formatted
                  symbol="PU"
                />
                <div class="prize-share ml-1">
                  <img src="/images/battle/treasure.png" width="32" />
                  <div class="prize-info">
                    4%
                  </div>
                </div>
              </div>
              <Board
                :rows="6"
                :cols="16"
                unitImage="/images/troops/warmoured-elf.webp"
              />
              <div class="action-container">
                <Button
                  type="wsecondary"
                  text="Enlist for Elves"
                  :handleClick="() => goToEnlistment(4)"
                />
              </div>
            </div>
          </v-col>
        </v-col>
        <v-col cols="12" md="1" class="big-text d-flex justify-center align-center"
          >VS</v-col
        >
        <v-col md="5">
          <v-col class="d-flex justify-start align-center">
            <div class="race-board">
              <div class="board-label d-flex justify-end align-center">
                <Amount
                  :amount="150000000"
                  formatted
                  symbol="PU"
                />
                <div class="prize-share ml-1">
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
              <div class="action-container">
                
                <Button
                  type="wsecondary"
                  text="Enlist for Orcs"
                  :handleClick="() => goToEnlistment(2)"
                />
              </div>
            </div>
          </v-col>
          <v-col class="d-flex justify-start align-center">
            <div class="race-board">
              <div class="board-label d-flex justify-end align-center">
                <Amount
                  :amount="150000000"
                  formatted
                  symbol="PU"
                />
                <div class="prize-share ml-1">
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
              <div class="action-container">
                <Button
                  type="wsecondary"
                  text="Enlist for Undeads"
                  :handleClick="() => goToEnlistment(3)"
                />
              </div>
            </div>
          </v-col>
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

export default {
  components: { Title, Button, Versus, Board, Amount },
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

.action-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding: 0 16px;
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
  display: block;
  width: 100%;
  @media screen and (min-width: 1025px) {
    width: auto;
  }
}
</style>
