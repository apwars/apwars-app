<template>
  <div class="background">
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <div class="unit-image"></div>
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
                <div class="items-container"></div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex"
              ><div class="text-large mr-2">Courage</div>
              <ForceMeter :maxScale="100" :value="60" color="wyellow"
            /></v-col>
            <v-col class="d-flex"
              ><div class="text-large  mr-2">Energy</div>
              <ForceMeter :maxScale="100" :value="10" color="wgreen" />
            </v-col>
          </v-row>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
export default {
  components: {
    ForceMeter,
    Progress,
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
.text-large {
  font-weight: bold;
  font-size: 28px;
  line-height: 37px;
}
.xp-label {
  @extend .text-medium;
  margin-bottom: 4px;
}
</style>
