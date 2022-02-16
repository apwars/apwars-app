<template>
  <div class="courage-container">
    <v-row no-gutters>
        <v-col>
      <game-text header="h3" class="text-center">
        wCOURAGE Packs
      </game-text>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="d-flex justify-center align-center">
        <div class="d-flex justify-center align-center">
          <div class="token-image">
            <v-img src="/images/wcourage.png" alt="wCOURAGE" />
            <div class="discount">
              <div>20%</div>
              <div>OFF</div>
            </div>
          </div>

          <div class="d-flex flex-column justify-center align-center">
            <div class="qty">
              5,000 wCOURAGE
            </div>
            <div class="price">
              <span class="d-flex align-center">Price: <span class="d-flex align-center ml-1"><v-img src="/images/wgold.png" height="18px" width="18px" alt="wGOLD" /> 1000 wGOLD</span></span>
            </div>
            <div>
              <wButton @click="() => {}" class="mt-1" size="small">
                Buy this pack
              </wButton>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import wButton from "@/lib/components/ui/Buttons/wButton";

export default {
  components: { GameText, wButton },
};
</script>
<style lang="scss" scoped>
.courage-container {
  width: 80%;
}
.token-image {
  width: 96px;
  position: relative;
  margin-right: 16px;
}
.qty {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.price {
  font-size: 14px;
  text-align: center;
}
.discount {
  position: absolute;
  top: 0;
  right: 0;
  background-color: chartreuse;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
