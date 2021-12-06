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
                        <div class="xp-label"><div class="level">Level 3</div> <div class="value">3,500/10,000</div></div>
                        <div class="xp-meter">xp bar</div>
                    </div>
                    <div class="items-container">
                        
                    </div>
                </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>Courage </v-col>
            <v-col>Energy </v-col>
          </v-row>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url("/images/background/enlistment.png");
  background-size: cover;
}
</style>
