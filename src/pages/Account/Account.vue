<template>
  <div class="background">
    <v-container>
      <v-row>
        <v-col><Title>Account</Title></v-col></v-row
      >
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <div class="screen-container">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="avatar" label="Name Warrior" />
                    <v-select
                      v-model="faction"
                      item-text="label"
                      item-value="value"
                      :items="factionOptions"
                      label="Faction"
                    />

                    <v-select
                      v-model="country"
                      item-text="name"
                      item-value="value"
                      :items="countryOptions"
                      label="Country"
                    >
                      <template v-slot:append-outer>
                        <img
                          :src="`/images/country-flags/${country}.svg`"
                          width="64px"
                          :alt="country"
                        />
                      </template>
                    </v-select>

                    <div class="radio-label">Is Public?</div>
                    <v-radio-group v-model="isPublic" row>
                      <v-radio label="Yes" :value="true"></v-radio>
                      <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12" md="4">
                    <img
                      class="avatar"
                      :src="
                        `https://avatar.apwars.farm/?seed=${avatar ||
                          account}&avatar=${faction}`
                      "
                      alt="avatar"
                    />
                    <div class="lp-level-container">
                      <div class="level-image">
                        <v-img src="/images/lp-levels/1.png" />
                      </div>
                      <div class="level-text">
                        You are Level 1 on the Loyalty Program
                      </div>
                    </div></v-col
                  ><v-col cols="12" md="4">
                    <v-row>
                      <v-col>
                        <div class="d-flex">
                          <img
                            src="/images/icons/coins/wSCARS.png"
                            width="95px"
                            alt="War SCARS"
                          />
                          <div class="scars-info">
                            <div class="scars">75,000</div>
                            <div class="name">War Scars</div>
                          </div>
                        </div>
                      </v-col></v-row
                    >
                    <v-row>
                      <v-col>
                        <div class="pool-container">
                          <img
                            class="lp-image"
                            src="/images/lp-wgold-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <div class="token-balance">10 wGOLD/</div>
                          <div class="token-balance">10 BUSD/</div>
                        </div>
                      </v-col>
                      <v-col
                        ><div class="pool-container">
                          <img
                            class="lp-image"
                            src="/images/lp-wcourage-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <div>-----------</div>
                        </div></v-col
                      >
                      <v-col
                        ><div class="pool-container">
                          <img
                            class="lp-image"
                            src="/images/lp-wland-busd.png"
                          />
                          <div class="balance">Balance:</div>
                          <div>-----------</div>
                        </div></v-col
                      >
                    </v-row>
                    <v-row>
                  <v-col><LoyaltyMeter /></v-col>
                </v-row>
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
              :handleClick="toggleMode"
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
import { countryOptions } from "@/data/Countrys";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import LoyaltyMeter from "@/lib/components/ui/Account/LoyaltyMeter";

export default {
  components: { Button, Title, LoyaltyMeter },
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
    factionOptions() {
      return [
        { label: "The Corporations", value: "corp" },
        { label: "The Degenerates", value: "degen" },
      ];
    },
    countryOptions() {
      return countryOptions;
    },
  },
  data() {
    return {
      isEditing: false,
      avatar: "",
      faction: "corp",
      country: "br",
      isPublic: true,
    };
  },
  methods: {
    toggleMode() {
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
<style lang="scss" scoped>
.background {
  background-size: cover;
  background-position: top;
  height: 100vh;
  background-image: url("/images/background/post.png");
}

.screen-container {
  padding: 24px;
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
}
.lp-image {
  height: 40px;
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
</style>
