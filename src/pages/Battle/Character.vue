<template>
  <div class="background">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <Title text="Soldier" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <Button type="wprimary" text="Corps" class="mr-2" />
          <Button type="wprimary" text="Degens" />
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12" md="7">
          <v-row>
            <v-col class="d-flex flex-column flex-md-row">
              <div class="unit-image">
                <v-img src="/images/troops/wwarrior-toon.png" />
              </div>
              <div class="unit-data">
                <v-text-field placeholder="Edit name">
                  <v-icon slot="append" color="white">
                    mdi-pencil-outline
                  </v-icon>
                </v-text-field>
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
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="5">
          <v-row>
            <v-col cols="4">
              <div class="icon-container mb-2">
                <v-img src="/images/icons/sword.png" />
              </div>
              <div class="force-group">
                <div class="text-center mr-1">
                  <PowerBar :maxScale="4" :value="2" />
                  <img class="mt-1" height="12" src="/images/icons/axe.png" />
                </div>
                <div class="text-center mr-1">
                  <PowerBar :maxScale="4" :value="1" />
                  <img class="mt-1" height="14" src="/images/icons/lightning.png" />
                </div>
                <div class="text-center mr-1">
                  <PowerBar :maxScale="4" :value="1" />
                  <img class="mt-1" height="14" src="/images/icons/fist.png" />
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="icon-container mb-2">
                <v-img src="/images/icons/patent.png" />
              </div>
              <Button text="Unlock" type="wsecondary" isBlock />
            </v-col>
            <v-col cols="4">
              <div class="icon-container mb-2">
                <v-img src="/images/icons/anvil.png" />
              </div>
              <Button text="Unlock" type="wsecondary" isBlock />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <div class="d-flex">
            <div class="stat-container text-medium">Strenght</div>
            <ForceMeter type="flat" :maxScale="5" :value="1" />
            <div class="text-medium ml-2">1/5</div>
          </div>
          <div class="d-flex">
            <div class="stat-container text-medium">Speed</div>
            <ForceMeter type="flat" :maxScale="5" :value="1" />
            <div class="text-medium ml-2">1/5</div>
          </div>
          <div class="d-flex">
            <div class="stat-container text-medium">HP</div>
            <ForceMeter type="flat" :maxScale="50" :value="20" />
            <div class="text-medium ml-2">20/50</div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex"
          ><div class="mr-2">
            <div class="status-description">
              <div class="label text-large">Courage</div>
              <Button class="mt-1" size="small" type="wsecondary" isBlock
                ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                Recharge</Button
              >
            </div>
          </div>
          <div>
            <ForceMeter :maxScale="100" :value="60" color="wgreen" />
            <div class="d-flex justify-end">
              60/100
            </div>
          </div></v-col
        >
        <v-col cols="12" md="4" class="d-flex"
          ><div class="mr-2">
            <div class="status-description">
              <div class="label text-large">Energy</div>
              <Button class="mt-1" size="small" type="wsecondary" isBlock
                ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                Recharge</Button
              >
            </div>
          </div>
          <div>
            <ForceMeter :maxScale="100" :value="10" color="wyellow" />
            <div class="d-flex justify-end">
              10/100
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="divider"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <div class="stat-value text-large">Statistics</div>
        </v-col>
        <v-col>
          <div class="stat-value text-medium">Plays</div>
        </v-col>
        <v-col><div class="stat-value text-medium">Record Time</div> </v-col>
        <v-col><div class="stat-value text-medium">Record Score</div> </v-col>
        <v-col><div class="stat-value text-medium">Record Points</div> </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Button from "@/lib/components/ui/Buttons/Button";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
import Title from "@/lib/components/ui/Title";
import PowerBar from "@/lib/components/ui/PowerBar";

export default {
  components: {
    Button,
    ForceMeter,
    Progress,
    Title,
    PowerBar
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
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin-right: 24px;
    max-width: 240px;
  }
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
  outline: 2px solid #ffeebc;
}
.divider {
  width: 100%;
  outline: 2px solid #ffeebc;
  border-radius: 50%;
}
.stat-value {
  height: 38px;
  display: flex;
  align-items: center;
}
.btn-icon {
  color: inherit;
  margin-right: 2px;
}
.stat-container {
  width: 88px;
}
.force-group {
  display: flex;
  justify-content: center;
}
</style>
