<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <Button
              text="Go back to Home"
              icon="arrow-back"
              type="wtertiary"
              no-padding
              :handleClick="backToHome"
            />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <Title
        class="mt-1"
          text="Packs to play"
          subtitle="We try to be transparent, just like Blockchain, here is all the data you need to make your decisions."
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="buttons-container">
          <div class="race-button">
            <Button
              text="Elves"
              :type="selectedRace === 'Elves' ? 'wprimary' : 'wsecondary'"
              :handleClick="() => selectRace('Elves')"
              isBlock
            />
          </div>
          <div class="race-button">
            <Button
              text="Humans"
              :type="selectedRace === 'Humans' ? 'wprimary' : 'wsecondary'"
              :handleClick="() => selectRace('Humans')"
              isBlock
            />
          </div>
          <div class="race-button">
            <Button
              text="Orcs"
              :type="selectedRace === 'Orcs' ? 'wprimary' : 'wsecondary'"
              :handleClick="() => selectRace('Orcs')"
              isBlock
            />
          </div>
          <div class="race-button">
            <Button
              text="Undead"
              :type="selectedRace === 'Undead' ? 'wprimary' : 'wsecondary'"
              :handleClick="() => selectRace('Undead')"
              isBlock
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12" md="10" offset-md="1">
        <PackCard
          class="pack"
          v-for="pack in packs"
          :key="pack.id"
          :pack="pack"
          :theme="theme"
          :handleBuy="buyPack"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import PacksController from "@/controller/PacksController";
import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";

export default {
  components: { Title, PackCard, Button },
  computed: {
    theme() {
      const mappedThemes = {
        'Humans': 'blue-theme',
        'Elves': 'light-green-theme',
        'Orcs': 'green-theme',
        'Undead': 'red-theme',
      }
      return mappedThemes[this.selectedRace];
    }
  },
  data() {
    return {
      selectedRace: null,
      packs: null,
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push('/');
    },
    selectRace(raceId) {
      this.selectedRace = raceId;
      this.getPacks();
    },
    async getPacks() {
      try {
        const controller = new PacksController();
        const fullPackage = `ARMY_${this.selectedRace.toUpperCase()}_FULL_PACK`;
        const refillPackage = `ARMY_${this.selectedRace.toUpperCase()}_REFILL_PACK`;
        let full = await controller.getOne(fullPackage);
        full.title = 'Full Pack';
        const fullUnitsArray = full.content.filter(c => !c.symbol.includes('GameItem'));
        full.units = this.buildPackObject(fullUnitsArray);
        const fullGameItemsArray = full.content.filter(c => c.symbol.includes('GameItem'));
        full.items = this.buildPackObject(fullGameItemsArray);
        let refill = await controller.getOne(refillPackage);
        refill.title = 'Refill Pack';
        const refillUnitsArray = refill.content.filter(c => !c.symbol.includes('GameItem'));
        refill.units = this.buildPackObject(refillUnitsArray);
        const refillGameItemsArray = refill.content.filter(c => c.symbol.includes('GameItem'));
        refill.items = this.buildPackObject(refillGameItemsArray);
        this.packs = [].concat(full, refill);
      } catch (error) {
        console.error('There was an error trying to get packs list, try again later.', error);
      }
    },
    buildPackObject(array) {
      return array.reduce((obj, item) => Object.assign(obj, {[item.symbol]: item.amount}), {});
    },
    async buyPack(packageName) {
      try {
        const controller = new PacksController();
        const purchase = await controller.buyPack(this.account, packageName);
      } catch (error) {
        console.error('Something went wrong while trying to buy this pack', error);
      }
    }
  },
  created() {
    this.setHeader(false);
  },
  mounted() {
    this.selectedRace = 'Elves';
  },
  beforeRouteLeave() {
    this.setHeader(true);
  }
};
</script>
<style lang="scss" scoped>
.pack {
  &:first-child {
    margin-top: 36px;
  }
  &:not(:first-child) {
    margin-top: 120px;
  }
}
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 1024px) {
    justify-content: space-evenly;
  }
}
.race-button {
  flex: 50%;
  padding: 6px;
  @media screen and (min-width: 1024px) {
    flex: 25%;
    justify-content: space-evenly;
  }
}
</style>
