<template>
  <div class="background">
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <Button type="wprimary" text="Corps" class="mr-2" />
          <Button type="wprimary" text="Degens" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="7">
          <v-row>
            <v-col class="d-flex">
              <div class="unit-image">
                <v-img src="/images/troops/wwarrior-toon.png" />
              </div>
              <div class="unit-data">
                <div class="input-name">Edit name</div>
                <div class="class-info">Class: Warrior</div>
                <div class="xp-container mt-2">
                  <div class="xp-label d-flex justify-space-between">
                    <div class="level">Level 3</div>
                    <div class="value">3,500/10,000</div>
                  </div>
                  <Progress
                    :maxScale="10000"
                    :value="3500"
                    color1="#00FFFF"
                    color2="#59BBFC"
                    noText
                  />
                </div>
                <div class="items-container d-flex justify-space-between mt-2">
                  <img src="/images/icons/slot.png" />
                  <img src="/images/icons/slot.png" />
                  <img src="/images/icons/slot.png" />
                  <img src="/images/icons/slot.png" />
                  <img src="/images/icons/slot.png" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex"
              ><div class="text-large mr-2">Courage</div>
              <ForceMeter :maxScale="100" :value="60" color="wgreen"
            /></v-col>
            <v-col class="d-flex"
              ><div class="text-large  mr-2">Energy</div>
              <ForceMeter :maxScale="100" :value="10" color="wyellow" />
            </v-col>
          </v-row>
        </v-col>
        <v-col md="5">
          <v-row>
            <v-col md="4">
              <div class="icon-container">
                <v-img src="/images/icons/sword.png" />
              </div>
            </v-col>
            <v-col md="4">
              <div class="icon-container">
                <v-img src="/images/icons/patent.png" />
              </div>
            </v-col>
            <v-col md="4">
              <div class="icon-container">
                <v-img src="/images/icons/anvil.png" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Button from "@/lib/components/ui/Buttons/Button";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
export default {
  components: {
    Button,
    ForceMeter,
    Progress,
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
  },
  async mounted() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
};
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url("/images/background/enlistment.png");
  background-size: cover;
}
.text-medium {
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
}
.text-big {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
}
.text-large {
  font-weight: bold;
  font-size: 28px;
  line-height: 37px;
}
.unit-image {
  max-width: 240px;
  margin-right: 24px;
}
.unit-data {
  width: 100%;
}
.class-info {
  @extend .text-big;
}
.xp-label {
  @extend .text-medium;
  margin-bottom: 4px;
}
.icon-container {
  width: 100%;
  border-radius: 50%;
  outline: 2px solid #FFEEBC;
}
</style>
