<template>
  <div class="background">
    <v-container>
      <v-row>
        <v-col><Versus /></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col>
            <div class="board-label d-flex justify-end">
              <Amount
                :amount="150000000"
                formatted
                symbol="total Humans power enlisted"
              />
            </div>
            <Board
              :rows="5"
              :cols="20"
              unitImage="/images/troops/wwarrior.webp"
            />
          </v-col>
          <v-col>
            <div class="board-label d-flex justify-end">
              <Amount
                :amount="150000000"
                formatted
                symbol="total Elvens power enlisted"
              />
            </div>
            <Board
              :rows="5"
              :cols="20"
              unitImage="/images/troops/warmoured-elf.webp"
            />
          </v-col>
        </v-col>
        <v-col class="big-text d-flex justify-center align-center">VS</v-col>
        <v-col>
          <v-col>
            <div class="board-label d-flex justify-end">
              <Amount
                :amount="150000000"
                formatted
                symbol="total Orcs power enlisted"
              />
            </div>
            <Board
              :rows="5"
              :cols="20"
              unitImage="/images/troops/wgrunt.webp"
              invertUnitDirection
            />
          </v-col>
          <v-col>
            <div class="board-label d-flex justify-end">
              <Amount
                :amount="150000000"
                formatted
                symbol="total Undeads power enlisted"
              />
            </div>
            <Board
              :rows="5"
              :cols="20"
              unitImage="/images/troops/wskeleton-warrior.webp"
              invertUnitDirection
            />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import Board from "@/lib/components/ui/War/Board";
import Versus from "@/lib/components/ui/Versus";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  components: { Versus, Board, Amount },
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
  background-size: cover;
  background-image: url("/images/background/battle.png");
}
.big-text {
  font-weight: bold;
  font-size: 40px;
  line-height: 53px;
}
.board-label {
  font-size: 12px;
  font-weight: bold;
}
</style>
