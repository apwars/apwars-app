<template>
  <div class="leaderboard-container">
    <div class="header-container">
      <div class="title-container">
        <img src="/images/icons/leaderboard.png" height="42" />
        <div class="ml-1">Leaderboard</div>
      </div>
      <div class="game-options">
        <div
          :class="['option', selectedGameId === 0 ? 'is-selected' : '']"
          @click="() => selectGame(0)"
        >
          TMJ
        </div>
        <div
          :class="['option', selectedGameId === 1 ? 'is-selected' : '']"
          @click="() => selectGame(1)"
        >
          Wars
        </div>
        <div
          :class="['option', selectedGameId === 2 ? 'is-selected' : '']"
          @click="() => selectGame(2)"
        >
          Arcadia
        </div>
      </div>
    </div>
    <div class="leaderboard my-1">
      <v-skeleton-loader
        type="image"
        width="100%"
        height="32px"
        v-if="isLoading"
      />
      <template v-else-if="leaderBoard.length === 3">
        <img src="/images/game/icon-place-1.png" width="32" />
        <div
          class="address"
          @click="() => openAddress(getAddress(leaderBoard[0]))"
        >
          {{ truncate(getAddress(leaderBoard[0])) }}
          <v-icon class="address-icon" x-small>mdi-open-in-new</v-icon>
        </div>

        <img class="ml-md-2" src="/images/game/icon-place-0.png" width="32" />
        <div
          class="address"
          @click="() => openAddress(getAddress(leaderBoard[1]))"
        >
          {{ truncate(getAddress(leaderBoard[1])) }}
          <v-icon class="address-icon" x-small>mdi-open-in-new</v-icon>
        </div>

        <img class="ml-md-2" src="/images/game/icon-place-2.png" width="32" />
        <div
          class="address"
          @click="() => openAddress(getAddress(leaderBoard[2]))"
        >
          {{ truncate(getAddress(leaderBoard[2])) }}
          <v-icon class="address-icon" x-small>mdi-open-in-new</v-icon>
        </div>
      </template>
    </div>
    <Button
      type="wsecondary"
      text="Full Leaderboard"
      :handleClick="() => $router.push('/leaderboard')"
    />
  </div>
</template>
<script>
import LeaderboardController from "@/controller/LeaderboardController";
import walletTruncate from "@/helpers/walletTruncate";
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  components: { Button },
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
      selectedGameId: null,
      leaderBoard: [],
      isLoading: true,
    };
  },
  methods: {
    selectGame(selectedId) {
      if (!this.isConnected || !this.account) {
        return;
      }
      if (this.selectedGameId === selectedId) {
        return;
      }
      this.selectedGameId = selectedId;
      this.getLeaderBoard();
    },
    async getLeaderBoard() {
      const gameMap = {
        0: this.getTMJ,
        1: this.getWars,
        2: this.getArcadia,
      };
      this.isLoading = true;
      try {
        const leaderboard = await gameMap[this.selectedGameId]();
        this.leaderBoard = leaderboard;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async getTMJ() {
      const controller = new LeaderboardController();
      const tmj = await controller.getWeek("TMJ", 3);
      return tmj;
    },
    async getWars() {
      const controller = new LeaderboardController();
      const wars = await controller.getLeaderboardWar(null, 3);
      return wars;
    },
    async getArcadia() {
      const controller = new LeaderboardController();
      const arcadia = await controller.getArcadia("1", 3);
      return arcadia;
    },
    getAddress(record) {
      return record.account || record.owner;
    },
    truncate(address) {
      return walletTruncate(address);
    },
    openAddress(address) {
      window.open(`https://bscscan.com/address/${address}`, "_blank");
    },
  },
  mounted() {
    this.selectGame(0);
  },
  watch: {
    isConnected() {
      this.selectGame(0);
    },
    account() {
      this.selectGame(0);
    },
  },
};
</script>
<style lang="scss" scoped>
.leaderboard-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #110c09;
  border: 2px solid #ffeebc;
  background-image: url("/images/texture/dark-wood.png");
  background-repeat: repeat;
}
.header-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media  screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.title-container {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  line-height: 1.4;
  color: #ffeebc;
}
.game-options {
  display: flex;
  align-items: flex-start;
}
.leaderboard {
  width: 100%;
  min-height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media  screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.address {
  display: flex;
  align-items: center;
  font-size: 10px;
  line-height: 1.3;
  color: #c4c4c4;
  .address-icon {
    color: #c4c4c4;
    margin-left: 2px;
  }
  &:hover {
    cursor: pointer;
    color: #fff;
    .address-icon {
      color: #fff;
    }
  }
}
.option {
  font-size: 10px;
  line-height: 1.3;
  text-align: center;
  font-weight: bold;
  color: #fff;
  padding: 4px 8px;
  &:hover,
  &.is-selected {
    cursor: pointer;
    border-bottom: 2px solid #ffeebc;
    color: #ffeebc;
  }
}
</style>
