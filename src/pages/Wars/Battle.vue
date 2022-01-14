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
      <BattleLoading v-if="isLoadingWar" />
      <template v-else-if="war">
        <v-row dense no-gutters>
          <v-col class="battle-header">
            <Title
              :text="war.name"
              subtitle="Battlefield"
              tip="How to play?"
              tipRedirect="https://apwars.farm/docs/war/combat-dynamics"
            />
            <div class="big-text text-center" v-if="!countdownTimer">
              War ended!
            </div>
            <countdown
              v-else
              :time="countdownTimer"
              :title="countdownTitle"
              titleColor="#FFF"
              hideEnd
            />
            <div class="prizepool">
              <img width="158" height="158" src="/images/battle/treasure-fed.webp" />
              <div class="prize">
                <div class="brown-info">
                  <img src="/images/wgold.png" width="28" />
                  <div class="prize-text">
                    <Amount
                      :amount="war.prizes.winner.amount"
                      compact
                      formatted
                    />
                    {{ war.prizes.winner.prize }}
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            ><Versus
              :title="phase === 'finished' ? 'Result' : 'Parcial Result'"
              :phase="phase"
              :corpForce="war.factions[0].power.total"
              :degenForce="war.factions[1].power.total"
              :winnerAmount="war.prizes.winner.unlocked"
              :loserAmount="war.prizes.loser.amount"
              :burnAmount="war.prizes.winner.locked"
          /></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <div ref="board" class="race-board mt-2">
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
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Humans')
                              .monsterPrizeAmount
                          "
                          compact
                          formatted
                        />
                        <div class="prize-description">
                          {{
                            war.races.find((r) => r.name === "Humans")
                              .monsterPrize
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="brown-info mr-2">
                      <div class="power-text">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Humans').power
                              .total
                          "
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="fixed-container">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Humans"
                      :handleClick="() => goToEnlistment(1)"
                      isBlock
                    />
                    </div>
                  </div>
                  <div class="enlistment-resume d-flex">
                    <div class="fixed-container">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Orcs"
                      :handleClick="() => goToEnlistment(2)"
                      isBlock
                    />
                    </div>
                    <div class="brown-info ml-2">
                      <div class="power-text">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Orcs').power.total
                          "
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="prize-share ml-2">
                      <img
                        class="right"
                        src="/images/battle/treasure.png"
                        width="32"
                      />
                      <div class="prize-info">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Orcs')
                              .monsterPrizeAmount
                          "
                          compact
                          formatted
                        />
                        <div class="prize-description">
                          {{
                            war.races.find((r) => r.name === "Orcs")
                              .monsterPrize
                          }}
                        </div>
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
                  @clickFaction="(faction) => handleClickFaction(faction)"
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
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Elves')
                              .monsterPrizeAmount
                          "
                          compact
                          formatted
                        />
                        <div class="prize-description">
                          {{
                            war.races.find((r) => r.name === "Elves")
                              .monsterPrize
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="brown-info mr-2">
                      <div class="power-text">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Elves').power
                              .total
                          "
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="fixed-container">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Elves"
                      :handleClick="() => goToEnlistment(4)"
                      isBlock
                    />
                    </div>
                  </div>
                  <div class="enlistment-resume d-flex">
                    <div class="fixed-container">
                    <Button
                      type="wsecondary"
                      icon="swords"
                      text="Undead"
                      :handleClick="() => goToEnlistment(3)"
                      isBlock
                    />
                    </div>
                    <div class="brown-info ml-2">
                      <div class="power-text">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Undead').power
                              .total
                          "
                          compact
                          formatted
                          symbol="Power Units"
                        />
                      </div>
                    </div>
                    <div class="prize-share ml-2">
                      <img
                        class="right"
                        src="/images/battle/treasure.png"
                        width="32"
                      />
                      <div class="prize-info">
                        <Amount
                          :amount="
                            war.races.find((r) => r.name === 'Undead')
                              .monsterPrizeAmount
                          "
                          compact
                          formatted
                        />
                        <div class="prize-description">
                          {{
                            war.races.find((r) => r.name === "Undead")
                              .monsterPrize
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <template v-if="war.prizesDistributed.length > 0">
          <v-row no-gutters>
            <v-col col="12" md="12">
              <div class="war-prizes">Distributed prizes</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <div class="prizes-container">
                <Reward
                  v-for="(prize, index) in war.prizesDistributed"
                  :key="index"
                  :prize="prize.prize"
                  :type="prize.type"
                  :amount="prize.amount"
                  size="small"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-if="warHasRewards">
          <v-row no-gutters>
            <v-col col="12" md="12">
              <div class="war-prizes">War prizes</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <div class="prizes-container">
                <div
                  class="prize-container text-center"
                  v-for="(prize, index) in warRewards"
                  :key="`warPrize-${index}`"
                >
                  <div class="slot-text">
                    {{prize.raceName}} {{ prize.slot.x }}, {{ prize.slot.y }}
                  </div>
                  <div class="slot-text mb-2">
                    {{ compactWallet(prize.winner) }}
                  </div>
                  <Reward
                    :prize="prize.prize"
                    :type="prize.type"
                    :amount="prize.amount"
                    :label="prize.label"
                    size="small"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-if="isWarOver">
          <v-row no-gutters>
            <v-col col="12" md="12">
              <div class="war-prizes">
                Your prizes ({{ compactWallet(account) }})
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <div class="prizes-container">
                <Reward
                  v-for="(prize, index) in accountPrizes"
                  :key="index"
                  :prize="prize.prize"
                  :type="prize.type"
                  :amount="prize.amount"
                  size="small"
                />
              </div>
            </v-col>
          </v-row>
        </template>
      </template>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import FullBoard from "@/lib/components/ui/War/FullBoard";
import Versus from "@/lib/components/ui/Versus";
import Amount from "@/lib/components/ui/Utils/Amount";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import BattleLoading from "./BattleLoading";
import Reward from "@/lib/components/ui/Reward";

export default {
  components: {
    Title,
    Button,
    Versus,
    FullBoard,
    Amount,
    Countdown,
    BattleLoading,
    Reward,
  },
  computed: {
    ...mapState({
      war: (state) => state.war.war,
      isLoadingWar: (state) => state.war.isLoading,
      fullBoard: (state) => state.war.fullBoard,
      countdownTimer: (state) => state.war.countdown,
      phase: (state) => state.war.phase,
      track: (state) => state.music.track,
      accountPrizes: (state) => state.war.accountPrizes,
    }),
    ...mapGetters({
      getRacePrizes: "war/getRacePrizes",
      playerEnlistment: "war/playerEnlistment",
      warHasRewards: "war/warHasRewards",
      hasPrizes: "war/hasPrizes",
      warRewards: "war/warRewards",
      isWarOver: "war/isWarOver",
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
      if (this.phase === "not-started") {
        return "Starts in";
      } else if (this.phase === "enlistment") {
        return "Enlistment ends in";
      }
      return "Countdown to collect prizes and wUNITS";
    },
    isWarFinished() {
      return this.war.status === "finished";
    },
    humansPrize() {
      return this.getRacePrizes('Humans');
    },
    elvesPrize() {
      return this.getRacePrizes('Elves');
    },
    orcsPrize() {
      return this.getRacePrizes('Orcs');
    },
    undeadPrize() {
      return this.getRacePrizes('Undead');
    },
    playerPrizes() {
      if (!this.playerEnlistment) {
        return [];
      }
      return this.playerEnlistment.rewards;
    },
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
    async fetchData() {
      if (this.account && !this.war && !this.isLoadingWar) {
        await this.getWar(this.$route.params.contractWar);
      }
    },
    compactWallet(wallet) {
      if (wallet === "0x0") {
        return "No winner";
      }
      const end = wallet.length;
      return `${wallet.substring(0, 5)}...${wallet.substring(end - 3, end)}`;
    },
    handleClickFaction(faction) {
      this.$router.push(`/wars/${this.$route.params.contractWar}/enlistment/${faction}/battle`);
    }
  },
  watch: {
    isConnected() {
      this.fetchData();
    },
    account() {
      this.fetchData();
      if (!this.track) {
        this.setupMusic({ musicKey: "WAR", isLoop: true });
      }
    },
  },
  async mounted() {
    this.setHeader(false);
    this.fetchData();
  },
  updated() {
    if (this.$refs.board) {
      this.$refs.board.scrollLeft = this.$refs.board.scrollWidth / 2 - 125;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    if (!to.path.includes("/wars")) {
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
  position: relative;
  display: flex;
  align-items: center;
  > img {
    left: -18px;
    position: absolute;
    z-index: 0;
    &.right {
      left: initial;
      right: -18px;
    }
  }
  .prize-info {
    z-index: 1;
    font-weight: bold;
    margin-left: 4px;
    font-size: 12px;
    text-shadow: 1px 1px 0 #000;
    text-align: center;
    .prize-description {
      font-size: 8px;
    }
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
  justify-content: center;
  align-items: center;
  background-color: #3a2720;
  border: 1px solid #ffeebc;
  padding: 4px 12px;
  width: 132px;
  text-align: center;
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

.prizes-container {
  display: flex;
  width: 100%;
}

.prize-container {
  width: 98px;
}
.war-prizes {
  font-size: 24px;
  font-weight: bold;
  margin-top: 21px;
  margin-bottom: 12px;
}

.race-name {
  font-size: 16px;
  font-weight: bold;
  color: #ffb800;
}

.slot-text {
  font-size: 12px;
  font-weight: bold;
}

.fixed-container {
  width: 124px;
}
</style>
