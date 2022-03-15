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
      <v-row v-if="!account || isLoadingBalances">
        <v-col cols="12">
          <v-skeleton-loader type="image" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="image" height="60px" />
        </v-col>
      </v-row>
      <template v-else>
        <v-row dense>
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
                <div>{{ getNeededUnits(troop.name) }} {{ troop.name }}</div>
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
                <div>Qty: {{ userBalance[`GameItem${weapon.id}`] || 0 }}</div>
              </div>
            </div>
          </v-col>
          <v-col
            v-if="neededPacks > 0"  
            cols="auto"
            class="wgold-info"
          >
            <template>
              <div class="amount">
                <img src="/images/icons/wgold.png" />
                <div>
                  <Amount :amount="packsPrice" formatted/> wGOLD
                </div>
              </div>
              <div >Remaining Packs {{ remainingPacks }}</div>
            </template>
          </v-col>
          <v-col cols="auto">
            <v-skeleton-loader
              v-if="loadingPack"
              v-bind="attrs"
              type="image"
              :width="240"
              height="40"
            />
            <Button
              v-else-if="neededPacks > 0 && hasAnyTroops"
              class="buy-button"
              size="large"
              :text="`Buy ${neededPacks} ${raceName} Refill Packs`"
              icon="blue-chest-closed"
              :isLoading="buyingPacks"
              :handleClick="buyRefilPacks"
            />
            <Button
              v-else-if="neededPacks > 0 && !hasAnyTroops"
              class="buy-button"
              size="large"
              :text="`Buy ${raceName} Full Pack`"
              icon="blue-chest-closed"
              :isLoading="buyingPacks"
              :handleClick="buyFullPackPack"
            />
            <Button
              v-else
              class="buy-button"
              size="large"
              text="You are ready for war"
              icon="swords"
              :handleClick="() => $router.push('/war/intro')"
            />
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import ToastSnackbar from "@/plugins/ToastSnackbar";
import PacksController from "@/controller/PacksController";
import { getWeapons } from "@/data/Collectibles/Weapons";
import { HUMANS, ORCS, UNDEAD, ELVES } from "@/data/Troops";
import { SQUADRONS } from "@/data/Squadrons";

import Title from '@/lib/components/ui/Title';
import Button from '@/lib/components/ui/Buttons/Button';
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: {
    Title,
    Button,
    Amount,
  },

  data() {
    return {
      selectedRace: this.$route.query.race || 'HUMANS',
      weapons: getWeapons(),
      buyingPacks: false,
      loadingPack: false,
      loadedPack: null,
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

    remainingPacks() {
      return this.loadedPack ? this.loadedPack.remainingAmount : 0;
    },

    squadronAmounts() {
      return SQUADRONS[this.selectedRace];
    },

    userBalance() {
      return this.offChainBalance || {};
    },

    raceName() {
      return {
        'ELVES': 'Elves',
        'HUMANS': 'Humans',
        'ORCS': 'Orcs',
        'UNDEAD': 'Undeads',
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

    hasAnyTroops() {
      return this.troops.reduce((curr, troop) => {
        return curr + (this.userBalance[troop.name] || 0);
      }, 0) > 0;
    },

    neededPacks() {
      if (!this.loadedPack) {
        return 0;
      }

      const packMapping = this.loadedPack.content.reduce((curr, next) => {
        return {
          ...curr,
          [next.symbol]: next.amount,
        }
      }, {});

      const neededPacks = this.troops.map((troop) => {
        const { name } = troop;

        return Math.ceil(this.getNeededUnits(name) / packMapping[name]);
      });

      return Math.max(...neededPacks);
    },

    packsPrice() {
      return this.hasAnyTroops
        ? this.loadedPack.price.amount * this.neededPacks
        : this.loadedPack.price.amount;
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
    
    selectedRace() {
      this.fetchPack();
    },
  },

  methods: {
    ...mapActions({
      fetchBalances: 'wallet/fetchBalances',
    }),

    async fetchPack() {
      try {
        if (!this.isConnected || !this.account) {
          return;
        }

        this.loadingPack = true;

        const controller = new PacksController();

        const refillPackage = this.hasAnyTroops
          ? `ARMY_${this.selectedRace}_REFILL_PACK`
          : `ARMY_${this.selectedRace}_FULL_PACK`;

        this.loadedPack = await controller.getOne(refillPackage);
      } finally {
        this.loadingPack = false;
      }
    },

    async fetchUserBalances() {
      if (!this.isConnected || !this.account) {
        return;
      }

      await this.fetchBalances();
      void this.fetchPack();
    },

    backToHome() {
      this.$router.push('/');
    },

    selectRace(race) {
      this.selectedRace = race;
    },

    getNeededUnits(unitType) {
      const units = this.userBalance[unitType] || 0;
      const neededUnits = this.squadronAmounts[unitType] - units;

      return neededUnits < 0
        ? 0
        : neededUnits;
    },

    async buyRefilPacks() {
      try {
        this.buyingPacks = true;

        const controller = new PacksController();
        const packageName = `ARMY_${this.selectedRace}_REFILL_PACK`;

        await controller.buyPack(this.account, packageName, this.neededPacks);

        ToastSnackbar.success('The packs were purchased successfully!');

        void this.fetchUserBalances();
      } catch (error) {
        const mappedErrors = {
          INVALID_AMOUNT: `We don't have any more from this pack to sell.`,
          INVALID_BALANCE: `You don't have balance to buy this pack.`,
        };

        ToastSnackbar.error(mappedErrors[error.code] || error.message);
      } finally {
        this.buyingPacks = false;
      }
    },

    async buyFullPackPack() {
      try {
        this.buyingPacks = true;

        const controller = new PacksController();
        const packageName = `ARMY_${this.selectedRace}_FULL_PACK`;

        await controller.buyPack(this.account, packageName);

        ToastSnackbar.success('The pack was purchased successfully!');

        void this.fetchUserBalances();
      } catch (error) {
        const mappedErrors = {
          INVALID_AMOUNT: `We don't have any more from this pack to sell.`,
          INVALID_BALANCE: `You don't have balance to buy this pack.`,
        };

        ToastSnackbar.error(mappedErrors[error.code] || error.message);
      } finally {
        this.buyingPacks = false;
      }
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
    font-size: 14px;
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
  padding-top: 1.2rem;
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

    .remaining {
      font-size: 12px;
    }
  }
}
</style>
