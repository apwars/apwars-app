<template
  ><div class="background">
    <v-container>
      <v-row>
        <v-col><Title>Account</Title></v-col></v-row
      >
      <v-row>
        <v-col>
          <v-row class="screen-container">
            <v-col cols="12" md="4"
              ><v-select
                v-model="faction"
                item-text="label"
                item-value="value"
                :items="factionOptions"
              />
              <v-text-field v-model="avatar" />

              <v-select
                v-model="country"
                item-text="name"
                item-value="value"
                :items="countryOptions"
              >
                <template v-slot:append-outer>
                  <img
                    :src="`/images/country-flags/${country}.svg`"
                    width="64px"
                    :alt="country"
                  />
                </template>
              </v-select>
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
                You are Level 1 on the Loyalty Program
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
                <v-col>wCOURAGE</v-col>
                <v-col>wGOLD</v-col>
                <v-col>wLAND</v-col>
              </v-row>
            </v-col></v-row
          >
        </v-col>
      </v-row>
    </v-container>
  </div></template
>
<script>
import { countryOptions } from "@/data/Countrys";
import Title from "@/lib/components/ui/Title";

export default {
  components: { Title },
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
      avatar: "",
      faction: "corp",
      country: "br",
      isPublic: true,
    };
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
  @extend .highlight-color;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.3;
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
</style>
