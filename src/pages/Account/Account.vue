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
                  <v-col cols="12" lg="3">
                    <img
                      v-if="account"
                      class="avatar"
                      :src="
                        `https://apiv2.apwars.farm/v1/users/${account}/avatar?u=${avatarCache}`
                      "
                      alt="avatar"
                    />
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
                    <div class="text-center medium-text" v-else>
                      Exclusive Avatar
                    </div></v-col
                  >
                  <v-col cols="12" lg="5" v-if="isEditing">
                    <InputText
                      v-model="profile.name"
                      label="Name Warrior"
                      isBlock
                    />
                    <InputSelect
                      class="mt-1"
                      label="Race"
                      v-model="profile.race"
                      :options="raceOptions"
                      isBlock
                    />
                    <InputSelect
                      class="mt-1"
                      label="Country"
                      v-model="profile.country"
                      :options="countryOptions"
                      isBlock
                    />
                  </v-col>
                  <v-col cols="12" lg="3" v-else>
                    <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
                    <div class="display-name" v-else>
                      {{ profile.name || "Waiting badass name" }}
                    </div>
                    <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
                    <div class="d-flex justify-space-between" v-else>
                      <div class="d-flex align-center">
                        <img
                          :src="factionImage"
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

                  <v-col cols="12" lg="4" v-if="isEditing">
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
                        <div
                          :class="[
                            'pool-container',
                            selectedPool === 'wGOLD' ? 'is-selected' : '',
                          ]"
                          @click="() => selectPool('wGOLD')"
                        >
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
                        ><div
                          :class="[
                            'pool-container',
                            selectedPool === 'wCOURAGE' ? 'is-selected' : '',
                          ]"
                          @click="() => selectPool('wCOURAGE')"
                        >
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
                        ><div
                          :class="[
                            'pool-container',
                            selectedPool === 'wLAND' ? 'is-selected' : '',
                          ]"
                          @click="() => selectPool('wLAND')"
                        >
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
                    <v-row no-gutters>
                      <v-col class="d-flex justify-center mt-2"
                        ><Button
                          type="wsecondary"
                          text="Provide Liquidity"
                          size="small"
                          :handleClick="() => provideLiquidity(selectedPool)"
                      /></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" lg="5" v-else>
                    <div class="big-text">Participate Games</div>
                    <v-skeleton-loader
                      v-if="!badges || isLoadingBadges"
                      type="image"
                      width="100%"
                      height="240px"
                    />
                    <template v-else>
                      <TMJBadges
                        class="my-2"
                        v-if="badges"
                        :podiums="badges.tmj"
                      />
                      <WarBadges class="my-2" :victorys="2" :losses="1" />
                      <ArcadiaBadges class="my-2" :lands="2" :villages="5" />
                    </template>
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
            <template v-if="isEditing">
              <Button
                type="wsecondary"
                text="Cancel"
                :handleClick="cancelEdit"
              />
              <Button
                class="ml-2"
                type="wsecondary"
                text="Save"
                :handleClick="saveProfile"
              />
            </template>
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

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import InputText from "@/lib/components/ui/InputText";
import InputSelect from "@/lib/components/ui/InputSelect";
import Amount from "@/lib/components/ui/Utils/Amount";
import LoyaltyMeter from "@/lib/components/ui/Account/LoyaltyMeter";
import TMJBadges from "@/lib/components/ui/Account/TMJBadges";
import WarBadges from "@/lib/components/ui/Account/WarBadges";
import ArcadiaBadges from "@/lib/components/ui/Account/ArcadiaBadges";

export default {
  components: {
    Button,
    Title,
    InputText,
    InputSelect,
    LoyaltyMeter,
    TMJBadges,
    WarBadges,
    ArcadiaBadges,
    Amount,
  },
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
      return countryOptions.map((c) => ({
        ...c,
        label: c.name,
        image: `/images/country-flags/${c.value}.svg`,
      }));
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
    factionImage() {
      const corps = ["humans", "elves"];
      if (!this.profile || !this.profile.race) {
        return "/images/no-faction.png";
      }
      if (corps.includes(this.profile.race)) {
        return "/images/icons/corp.png";
      }
      return "/images/icons/degen.png";
    },
  },
  data() {
    return {
      isEditing: false,
      isLoadingSave: false,
      selectedPool: "wGOLD",
      avatarCache: 1,
      profileCache: null,
      isLoadingBadges: true,
      badges: null,
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
      if (!this.isEditing) {
        this.profileCache = { ...this.profile };
      } else {
        this.profileCache = null;
      }
      this.isEditing = !this.isEditing;
    },
    isNameValid() {
      let isValid = this.profile.name.trim() !== "";
      if (!isValid) {
        ToastSnackbar.error("The name is invalid!");
      }
      return isValid;
    },
    isCountryValid() {
      let isValid = this.profile.country.trim() !== "";
      if (!isValid) {
        ToastSnackbar.error("The country is invalid!");
      }
      return isValid;
    },
    isRaceValid() {
      let isValid = this.profile.race.trim() !== "";
      if (!isValid) {
        ToastSnackbar.error("The race is invalid!");
      }
      return isValid;
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
    async fetchBadges() {
      if (!this.account) {
        return;
      }
      try {
        this.isLoadingBadges = true;
        const controller = new UserController();
        const badges = await controller.getBadges(this.account);
        this.badges = badges;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingBadges = false;
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
    cancelEdit() {
      this.profile.name = this.profileCache.name;
      this.profile.country = this.profileCache.country;
      this.profile.race = this.profileCache.race;
      this.toggleMode();
    },
    selectPool(pool) {
      this.selectedPool = pool;
    },
    provideLiquidity(baseToken) {
      const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
      const tokenMap = {
        wGOLD: "0x7ab6eedd9443e0e98e5ea93667ca5b250b8dda51",
        wCOURAGE: "0x5F51A3ce7f2233777328866F477E86a91CA9DdeC",
        wLAND: "0x2c6107c27a15d2c7f397d88d76257ea42c12f89f",
      };
      this.$router.push(`/add-liquidity/${tokenMap[baseToken]}/${BUSD}`);
    },
  },
  watch: {
    account() {
      this.fetchProfile();
      this.fetchBadges();
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
  margin-bottom: 200px;
}

.pool-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  &:hover,
  &.is-selected {
    outline: 1px solid #ffeebc;
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
