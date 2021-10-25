<template>
  <v-container v-if="isConnected">
    <v-row v-if="isLoading">
      <v-col cols="12">
        <h3 class="text-h3 my-6 text-center">Loading...</h3>
      </v-col>
    </v-row>
    <v-row v-else-if="!troop">
      Troop not found!
    </v-row>
    <template v-else>
      <v-row>
        <v-col>
          <game-title>
            <h3>Enlist {{ troop.name }} to war</h3>
            <p class="subtitle">
              Here is the place to enlist your units and enhance their power
              with weapons to slain enemies at war.
            </p>
          </game-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <game-title>
            <h4>Quantity</h4>
            <p class="subtitle">
              The power of an army is defined by attack and defense points, the
              more you enlist the greater.
            </p>
          </game-title>

          <div class="troop-container">
            <div class="troop-image">
              <v-img
                width="175"
                :src="`/images/troops/${troop.name}.png`"
                :alt="troop.name"
              />
            </div>
            <div class="troop-info">
              <div class="troop-name"></div>
              <div class="troop-status">
                <v-img
                  width="27"
                  height="27"
                  class="mr-2"
                  src="/images/icons/attack.png"
                  alt="Attack points"
                />
                {{ troop.strength }}
              </div>
              <div class="troop-status">
                <v-img
                  width="27"
                  height="27"
                  class="mr-2"
                  src="/images/icons/defense.png"
                  alt="Defense points"
                />
                {{ troop.defense }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col v-if="availableWeapons.length > 0">
          <game-title>
            <h4>Weapons</h4>
            <p class="subtitle">
              Weapons enhance your unit strenght points, those are the
              availables weapons for this unit.
            </p>
            <div
              class="weapon-container"
              v-for="weapon in availableWeapons"
              :key="weapon.id"
            >
              <div class="weapon-image mr-1">
                <v-img
                  :src="weapon.image"
                  :alt="weapon.title"
                  height="90"
                  width="54"
                />
              </div>
              <div class="weapon-info">
                <div class="weapon-title ">
                  {{ weapon.title }}
                </div>
                <div class="subtitle mb-2">
                  {{ weapon.effectDescription }}
                </div>
                <v-currency-field
                  color="secondary"
                  class="stake-modal-input my-n1"
                  outlined
                  label="Amount"
                  :hint="`Available: ${myAvailable}`"
                  persistent-hint
                  v-bind="currencyConfig"
                  v-model="weapon.amount"
                  dense
                >
                  <template v-slot:append>
                    <div class="d-flex">
                      <span class="mr-1 align-self-center">{{ label }}</span>
                      <v-btn
                        class="align-self-center"
                        rounded
                        small
                        @click="maxAvailable"
                      >
                        MAX
                      </v-btn>
                    </div>
                  </template>
                </v-currency-field>
              </div>
            </div>
          </game-title>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { getCollectibleById } from "@/data/Collectibles";
import { getTroop } from "@/data/Troops";
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
export default {
  components: {
    GameTitle,
  },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    availableWeapons() {
      if (!this.troop.availableWeapons) {
        return [];
      }
      return this.troop.availableWeapons.map((w) => ({ ...getCollectibleById(w), amount: 0 }));
    },
  },
  data() {
    return {
      isLoading: false,
      troop: null,
    };
  },
  methods: {
    backToWar() {
      return this.$router.push(
        `/wars/${this.$route.params.contractWar}/enlistment`
      );
    },
    loadUnit() {
      this.isLoading = true;
      this.troop = getTroop(
        this.$route.params.nameOrAddress,
        this.networkInfo.id
      );
      this.isLoading = false;
    },
  },
  mounted() {
    this.loadUnit();
  },
};
</script>
<style lang="scss" scoped>
.subtitle {
  font-size: 12px;
  font-style: italic;
}
.weapon-container {
  display: flex;
}
.weapon-title {
  font-size: 16px;
  font-weight: 800;
}
.troop-container {
  display: flex;
}
.troop-status {
  display: flex;
}
</style>
