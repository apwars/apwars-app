<template>
  <div class="background">
    <v-container fluid>
      <v-row>
        <v-col><Title>Account</Title></v-col></v-row
      >
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <div class="screen-container">
                <v-row>
                  <v-col cols="12" md="3">
                    <img
                      class="avatar"
                      :src="
                        `https://apiv2.apwars.farm/v1/users/${account}/avatar?u=${avatarCache}`
                      "
                      alt="avatar"/>
                    <div class="lp-level-container" v-if="isEditing">
                      <div class="level-image">
                        <img class="pool-image" src="/images/wgold.png" />
                        <v-img
                          height="64"
                          :src="
                            `/images/lp-levels/${profile.lpLevels.wGOLD.level}.png`
                          "
                        />
                      </div>
                      <div class="level-text">
                        You are Level {{ profile.lpLevels.wGOLD.level }} on the
                        Loyalty Program
                      </div>
                    </div>
                    <div class="d-flex flex-column align-center" v-else>
                      <div class="medium-text">Exclusive Avatar</div>
                      <Button
                        class="mt-1"
                        type="wsecondary"
                        text="Provide Liquidity"
                      /></div
                  ></v-col>
                  <v-col cols="12" md="5" v-if="isEditing">
                    <v-text-field v-model="profile.name" label="Name Warrior" />
                    <v-select
                      v-model="profile.race"
                      item-text="label"
                      item-value="value"
                      :items="raceOptions"
                      label="Race"
                    />

                    <v-select
                      v-model="profile.country"
                      item-text="name"
                      item-value="value"
                      :items="countryOptions"
                      label="Country"
                    >
                      <template v-slot:append-outer>
                        <img
                          :src="`/images/country-flags/${profile.country}.svg`"
                          width="64px"
                          :alt="profile.country || 'United Nations'"
                        />
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="3" v-else>
                    <div class="display-name">
                      {{ profile.name || truncate(account) }}
                    </div>
                    <div class="d-flex justify-space-between">
                      <div class="d-flex align-center">
                        <img
                          :src="`/images/icons/corp.png`"
                          width="64px"
                          :alt="profileFaction"
                        />
                        <div class="abbr medium-text">
                          {{ profileFaction }}
                        </div>
                      </div>
                      <div class="d-flex align-center ml-1">
                        <img
                          :src="
                            `/images/country-flags/${profile.country ||
                              'un'}.svg`
                          "
                          width="48px"
                          :alt="profileCountry"
                        />
                        <div class="abbr medium-text">
                          {{ profileCountry }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between mt-2">
                      <div class="display-lp">
                        <img class="lp-image" src="/images/lp-wgold-busd.png" />
                        <img
                          :class="[
                            'level-image',
                            profile.lpLevels.wGOLD.level ? '' : 'gray',
                          ]"
                          :src="
                            `/images/lp-levels/${profile.lpLevels.wGOLD.level}.png`
                          "
                        />
                      </div>
                      <div class="display-lp">
                        <img
                          class="lp-image"
                          src="/images/lp-wcourage-busd.png"
                        />
                        <img
                          :class="[
                            'level-image',
                            profile.lpLevels.wCOURAGE.level ? '' : 'gray',
                          ]"
                          :src="
                            `/images/lp-levels/${profile.lpLevels.wCOURAGE.level}.png`
                          "
                        />
                      </div>
                      <div class="display-lp">
                        <img class="lp-image" src="/images/lp-wland-busd.png" />
                        <img
                          :class="[
                            'level-image',
                            profile.lpLevels.wLAND.level ? '' : 'gray',
                          ]"
                          :src="
                            `/images/lp-levels/${profile.lpLevels.wLAND.level}.png`
                          "
                        />
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4" v-if="isEditing">
                    <v-row>
                      <v-col>
                        <div class="d-flex">
                          <img
                            src="/images/icons/coins/wSCARS.png"
                            width="95px"
                            alt="War SCARS"
                          />
                          <div class="scars-info">
                            <div class="scars">
                              <Amount :amount="profile.wSCARS" formatted />
                            </div>
                            <div class="name">War Scars</div>
                          </div>
                        </div>
                      </v-col></v-row
                    >
                    <v-row>
                      <v-col>
                        <div :class="['pool-container', selectedPool === 'wGOLD' ? 'is-selected' : '']" @click="() => selectPool('wGOLD')">
                          <img
                            :class="[
                              'lp-image',
                              profile.lpLevels.wGOLD.averageBUSD ? '' : 'gray',
                            ]"
                            src="/images/lp-wgold-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <template v-if="profile.lpLevels.wGOLD.averageBUSD">
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wGOLD.averageToken"
                                formatted
                                compact
                              />
                              wGOLD/
                            </div>
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wGOLD.averageBUSD"
                                formatted
                                compact
                              />
                              BUSD
                            </div>
                          </template>
                          <div v-else>-----------</div>
                        </div>
                      </v-col>
                      <v-col
                        ><div :class="['pool-container', selectedPool === 'wCOURAGE' ? 'is-selected' : '']" @click="() => selectPool('wCOURAGE')">
                          <img
                            :class="[
                              'lp-image',
                              profile.lpLevels.wCOURAGE.averageBUSD
                                ? ''
                                : 'gray',
                            ]"
                            src="/images/lp-wcourage-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <template
                            v-if="profile.lpLevels.wCOURAGE.averageBUSD"
                          >
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wCOURAGE.averageToken"
                                formatted
                                compact
                              />
                              wGOLD/
                            </div>
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wCOURAGE.averageBUSD"
                                formatted
                                compact
                              />
                              BUSD
                            </div>
                          </template>
                          <div v-else>-----------</div>
                        </div></v-col
                      >
                      <v-col
                        ><div :class="['pool-container', selectedPool === 'wLAND' ? 'is-selected' : '']" @click="() => selectPool('wLAND')">
                          <img
                            :class="[
                              'lp-image',
                              profile.lpLevels.wLAND.averageBUSD ? '' : 'gray',
                            ]"
                            src="/images/lp-wland-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <template v-if="profile.lpLevels.wLAND.averageBUSD">
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wLAND.averageToken"
                                formatted
                                compact
                              />
                              wGOLD/
                            </div>
                            <div class="token-balance">
                              <Amount
                                :amount="profile.lpLevels.wLAND.averageBUSD"
                                formatted
                                compact
                              />
                              BUSD
                            </div>
                          </template>
                          <div v-else>-----------</div>
                        </div></v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col
                        ><LoyaltyMeter
                          :level="profile.lpLevels[selectedPool].level"
                      /></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4" v-else>
                    <div class="big-text">Participate Games</div>
                    <div class="game-row">
                      <img class="game-logo" src="/images/tmj.png" />
                    </div>
                    <div class="game-row">
                      <img class="game-logo" src="/images/wars.png" />
                    </div>
                    <div class="game-row">
                      <img
                        class="game-logo"
                        src="/images/arcadia-expansion.png"
                      />
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="actions-container">
            <Button
              type="wsecondary"
              text="Save"
              v-if="isEditing"
              :handleClick="saveProfile"
            />
            <Button
              type="wsecondary"
              text="Edit"
              v-else
              :handleClick="toggleMode"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import UserController from "@/controller/UserController";
import { countryOptions } from "@/data/Countrys";
import walletTruncate from "@/helpers/walletTruncate";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import LoyaltyMeter from "@/lib/components/ui/Account/LoyaltyMeter";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Button, Title, LoyaltyMeter, Amount },
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
    raceOptions() {
      return [
        { label: "Humans", value: "humans" },
        { label: "Orcs", value: "orcs" },
      ];
    },
    countryOptions() {
      return countryOptions;
    },
    profileCountry() {
      if (!this.profile.country) {
        return "Unset";
      }
      return (
        this.countryOptions.find((c) => c.value === this.profile.country)
          .name || "Unset"
      );
    },
    profileFaction() {
      const corps = ["humans", "elves"];
      if (corps.includes(this.profile.race)) {
        return "Corps";
      } else {
        return "Degens";
      }
    },
  },
  data() {
    return {
      isEditing: false,
      isLoadingSave: false,
      selectedPool: "wGOLD",
      avatarCache: 1,
      profile: {
        name: "",
        country: "un",
        race: "",
        wSCARS: 0,
        lpLevels: {
          wGOLD: {
            level: 0,
          },
          wCOURAGE: {
            level: 0,
          },
          wLAND: {
            level: 0,
          },
        },
      },
    };
  },
  methods: {
    toggleMode() {
      this.isEditing = !this.isEditing;
    },
    truncate(text) {
      return walletTruncate(text);
    },
    isNameValid() {
      return this.profile.name.trim() !== "";
    },
    isCountryValid() {
      return this.profile.country.trim() !== "";
    },
    isRaceValid() {
      return this.profile.race.trim() !== "";
    },
    validateProfile() {
      return this.isNameValid() && this.isCountryValid() && this.isRaceValid();
    },
    async fetchProfile() {
      if (!this.account) {
        return;
      }
      try {
        this.isLoading = true;
        const controller = new UserController();
        const profile = await controller.getProfile(this.account);
        this.profile = profile;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async saveProfile() {
      if (this.validateProfile()) {
        try {
          this.isLoadingSave = true;
          const controller = new UserController();
          await controller.updateProfile(this.account, this.profile);
          this.avatarCache = this.avatarCache + 1;
          this.toggleMode();
          ToastSnackbar.success("Your profile was updated successfully.");
        } catch (error) {
          ToastSnackbar.error(
            "Something went wrong while trying to save your profile."
          );
          console.error(error);
        }
      }
      this.isLoadingSave = false;
    },
    selectPool(pool) {
      this.selectedPool = pool;
    }
  },
  watch: {
    account() {
      this.fetchProfile();
    },
  },
};
</script>
<style lang="scss" scoped>
.background {
  background-size: cover;
  background-position: top;
  background-image: url("/images/background/post.png");
}

.screen-container {
  padding: 24px;
  min-height: 440px;
  background: linear-gradient(0deg, #181a1b, #181a1b), #3a2720;
  border: 2px solid #ffeebc;
  box-sizing: border-box;
}

.avatar {
  height: 260px;
  width: 260px;
}

.highlight-color {
  color: #ffeebc;
}

.gray {
  filter: grayscale(1);
}

.lp-level-container {
  display: flex;
  align-items: center;
  max-width: 260px;
  .level-image {
    width: 64px;
  }
  .level-text {
    @extend .highlight-color;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.3;
  }
}

.radio-label {
  display: block;
  width: 100%;
}

.scars-info {
  margin-left: 12px;
  .scars {
    font-weight: bold;
    font-size: 58px;
    line-height: 1.2;
    color: #ffffff;
  }
  .name {
    font-weight: bold;
    font-size: 18px;
    line-height: 1.4;
    color: #ffffff;
  }
}
.actions-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.pool-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  &:hover, &.is-selected {
    outline: 1px solid #FFEEBC;
    cursor: pointer;
  }
}
.lp-image {
  height: 40px;
  width: 62px;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.balance {
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
}
.token-balance {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
}
.big-text {
  font-weight: bold;
  font-size: 28px;
  line-height: 1.6;
  color: #ffffff;
}
.medium-text {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
}
.game-row {
  margin-bottom: 12px;
}
.game-logo {
  height: 64px;
}
.level-image {
  position: relative;
  height: 64px;
}
.display-name {
  @extend .big-text;
}
.pool-image {
  height: 32px;
  width: 32px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.abbr {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 190px;
  margin-left: 4px;
}
</style>
