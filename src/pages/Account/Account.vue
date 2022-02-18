<template
  ><div class="background">
    <v-container>
      <v-row>
        <v-col><Title>Account</Title></v-col></v-row
      >
      <v-row>
        <v-col> <v-row class="screen-container">
          <v-col cols="12" md="4"><v-select v-model="faction" item-text="label" item-value="value" :items="factionOptions"/>
          <v-text-field v-model="avatar" />
          <v-select v-model="country" item-text="name" item-value="value" :items="countryOptions"/></v-col>
          <img
            :src="
              `/images/country-flags/${country}.svg`
            "
            width="120px"
            :alt="country"
          />
          <v-col cols="12" md="4">
          <img
            class="avatar"
            :src="
              `https://avatar.apwars.farm/?seed=${avatar || account}&avatar=${faction}`
            "
            alt="avatar"
          />
          </v-col></v-row>
        </v-col>
      </v-row>
    </v-container></div
></template>
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
      return [{ label: 'The Corporations', value: 'corp' }, { label: 'The Degenerates', value: 'degen' }];
    },
    countryOptions() {
      return countryOptions;
    }
  },
  data() {
    return {
      avatar: '',
      faction: "corp",
      country: 'br',
    }
  }
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
</style>
