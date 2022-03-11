<template>
  <div class="background">
    <v-container>
      <v-row no-gutters>
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
      <v-row no-gutters>
        <v-col col="12">
          <Title text="Army" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="buttons-container">
            <div class="race-button">
              <Button
                text="Elves"
                :type="selectedRace === 'ELVES' ? 'wprimary' : 'wsecondary'"
                :handleClick="() => selectRace('ELVES')"
                isBlock
              />
            </div>
            <div class="race-button">
              <Button
                text="Humans"
                :type="selectedRace === 'HUMANS' ? 'wprimary' : 'wsecondary'"
                :handleClick="() => selectRace('HUMANS')"
                isBlock
              />
            </div>
            <div class="race-button">
              <Button
                text="Orcs"
                :type="selectedRace === 'ORCS' ? 'wprimary' : 'wsecondary'"
                :handleClick="() => selectRace('ORCS')"
                isBlock
              />
            </div>
            <div class="race-button">
              <Button
                text="Undead"
                :type="selectedRace === 'UNDEAD' ? 'wprimary' : 'wsecondary'"
                :handleClick="() => selectRace('UNDEAD')"
                isBlock
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="header">
          {{ troopsHeader }}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="troop in troops"
          :key="troop.id"
          cols="6"
        >
          <div class="troop">
            <div class="icon">
              <img :src="`/images/icons/${troop.name}.png`" />
            </div>
            <div class="details">
              <div class="label">Units you have:</div>
              <div>{{ userBalance[troop.name] || 0 }} {{ troop.name }}</div>
            </div>
            <div class="needed-units details">
              <div class="label">Needed units:</div>
              <div>{{ getNeededUnits(userBalance[troop.name]) }} {{ troop.name }}</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row dense class="weapons-container">
        <v-col
          v-for="weapon in weapons"
          :key="weapon.id"
        >
          <div class="game-item">
            <div class="icon">
              <img :src="`/images/icons/${weapon.icon}.png`" />
            </div>
            <div class="details">
              <div>{{ weapon.title }}</div>
              <div>My Qty: {{ userBalance[`GameItem${weapon.id}`] || 0 }}</div>
            </div>
          </div>
        </v-col>
        <v-col cols="auto" class="wgold-info">
          <div class="amount">
            <img src="/images/icons/wgold.png" />
            <div>
              {{ `${userBalance['wGOLD'] || 0} wGOLD` }}
            </div>
          </div>
          <div>Remaining Packs {{ remeaningPacks }}</div>
        </v-col>
        <v-col cols="auto">
          <Button
            class="buy-button"
            size="large"
            text="Buy 7 Refill Pack Humans"
            icon="blue-chest-closed"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import Title from '@/lib/components/ui/Title';
import Button from '@/lib/components/ui/Buttons/Button';
import { getWeapons } from "@/data/Collectibles/Weapons";
import { HUMANS, ORCS, UNDEAD, ELVES } from "@/data/Troops";

export default {
  components: {
    Title,
    Button,
  },

  data() {
    return {
      selectedRace: 'HUMANS',
      weapons: getWeapons(),
      remeaningPacks: 100,
    };
  },

  computed: {
    ...mapState({
      isLoadingBalances: (state) => state.wallet.isLoadingBalances,
    }),

    ...mapGetters('user', [
      'isConnected',
      'account',
    ]),

    ...mapGetters('wallet', [
      'offChainBalance',
    ]),

    userBalance() {
      console.log(this.offChainBalance);
      return this.offChainBalance || {};
    },

    troopsHeader() {
      return {
        'ELVES': 'Elves',
        'HUMANS': 'Humans',
        'ORCS': 'Orcs',
        'UNDEAD': 'Undead',
      }[this.selectedRace];
    },
    
    troops() {
      return {
        'ELVES': ELVES,
        'HUMANS': HUMANS,
        'ORCS': ORCS,
        'UNDEAD': UNDEAD,
      }[this.selectedRace];
    },
  },

  mounted() {
    this.fetchUserBalances();
  },

  watch: {
    isConnected() {
      this.fetchUserBalances();
    },

    account() {
      this.fetchUserBalances();
    },
  },

  methods: {
    ...mapActions({
      fetchBalances: 'wallet/fetchBalances',
    }),

    fetchUserBalances() {
      if (!this.isConnected || !this.account) {
        return;
      }

      this.fetchBalances();
    },

    backToHome() {
      this.$router.push('/');
    },

    selectRace(race) {
      this.selectedRace = race;
    },

    getNeededUnits(units = 0) {
      const neededUnits = 1000 - units;

      return neededUnits < 0
        ? 0
        : neededUnits;
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-image: url("/images/background/blue-mountains.png");
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 1024px) {
    justify-content: space-evenly;
  }
}

.race-button {
  flex: 50%;
  padding: 6px;

  @media screen and (min-width: 1024px) {
    flex: 25%;
    justify-content: space-evenly;
  }
}

.header {
  font-size: 22px;
  font-weight: bold;
}

.troop {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    flex-shrink: 0;
    padding: 4px;
    margin-right: 12px;
    background: url('/images/icons/slot.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 60px;
    height: 60px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .details {
    flex-grow: 1;
    flex-basis: 0;
    font-weight: bold;
    font-size: 18px;

    .label {
      color: #FFEEBC;
    }
  }

  .needed-units {
    margin-left: 24px;
  }
}

.game-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    margin-right: 8px;
    display: flex;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .details {
    font-weight: bold;
  }
}

.buy-button {
  background: #162438 !important;
  color: #FFEEBC;
  border: 1px solid #FFEEBC;

  &:hover {
    border: 1px solid #FFEEBC !important;
  }
}

.weapons-container {
  padding-top: 2.4rem;
  align-items: center;

  .wgold-info {
    margin-left: 40px;
    font-weight: bold;

    .amount {
      display: flex;
      align-items: center;
      font-size: 18px;
    }

    img {
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }

    .remeaning {
      font-size: 12px;
    }
  }
}
</style>
