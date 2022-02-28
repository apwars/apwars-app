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
          text="Units Starter Packs"
        />
      </v-col>
    </v-row>
    <v-row no-gutters v-if="isEnlistment">
      <v-col class="d-flex justify-center">
        <Button
          text="Back to War"
          type="wsecondary"
          size="small"
          :handleClick="backToWar"
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
        <template v-if="isLoading">
          <v-skeleton-loader type="image" height="280px" />
          <v-skeleton-loader class="mt-2" type="image" height="280px" />
        </template>
        <PackCard
          class="pack"
          v-for="pack in packs"
          :key="pack.id"
          :pack="pack"
          :theme="theme"
          :handleBuy="buyPack"
          :isLoadingBuy="isLoadingBuy === pack.package"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PacksController from "@/controller/PacksController";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";

export default {
  components: { Title, PackCard, Button },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    theme() {
      const mappedThemes = {
        Humans: "blue-theme",
        Elves: "light-green-theme",
        Orcs: "green-theme",
        Undead: "red-theme",
      };
      return mappedThemes[this.selectedRace];
    },
    isEnlistment() {
      return Boolean(this.$route.query.isEnlistment);
    }
  },
  data() {
    return {
      selectedRace: null,
      packs: null,
      isLoadingBuy: null,
      isLoading: false,
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    backToWar() {
      this.$router.push("/war/intro");
    },
    selectRace(race) {
      if (this.selectedRace === race) {
        return;
      }
      this.selectedRace = race;
      this.getPacks();
    },
    async getPacks() {
      if (!this.selectedRace || !this.isConnected) {
        return
      }
      try {
        this.isLoading = true;
        const controller = new PacksController();
        const fullPackage = `ARMY_${this.selectedRace.toUpperCase()}_FULL_PACK`;
        const refillPackage = `ARMY_${this.selectedRace.toUpperCase()}_REFILL_PACK`;
        let full = await controller.getOne(fullPackage);
        full.title = "Full Pack";
        const fullUnitsArray = full.content.filter(
          (c) => !c.symbol.includes("GameItem")
        );
        full.units = this.buildPackObject(fullUnitsArray);
        const fullGameItemsArray = full.content.filter((c) =>
          c.symbol.includes("GameItem")
        );
        full.items = this.buildPackObject(fullGameItemsArray);
        let refill = await controller.getOne(refillPackage);
        refill.title = "Refill Pack";
        const refillUnitsArray = refill.content.filter(
          (c) => !c.symbol.includes("GameItem")
        );
        refill.units = this.buildPackObject(refillUnitsArray);
        const refillGameItemsArray = refill.content.filter((c) =>
          c.symbol.includes("GameItem")
        );
        refill.items = this.buildPackObject(refillGameItemsArray);
        this.packs = [].concat(full, refill);
      } catch (error) {
        console.error(
          "There was an error trying to get packs list, try again later.",
          error
        );
      } finally {
        this.isLoading = false;
      }
    },
    buildPackObject(array) {
      return array.reduce(
        (obj, item) => Object.assign(obj, { [item.symbol]: item.amount }),
        {}
      );
    },
    async buyPack(packageName) {
      try {
        this.isLoadingBuy = packageName;
        const controller = new PacksController();
        await controller.buyPack(this.account, packageName);
        this.getPacks();
        ToastSnackbar.success("The pack was purchased successfully!");
      } catch (error) {
        const mappedErrors = {
          INVALID_AMOUNT: `We don't have any more from this pack to sell.`,
          INVALID_BALANCE: `You don't have balance to buy this pack.`,
        };
        ToastSnackbar.error(mappedErrors[error.code] || error.message);
        console.error(
          "Something went wrong while trying to buy this pack",
          error
        );
      } finally {
        this.isLoadingBuy = null;
      }
    },
  },
  created() {
    if (this.isConnected && !this.selectedRace) {
      this.selectRace(this.$route.query.race || 'Humans');
    }
  },
  watch: {
    isConnected() {
      this.selectRace(this.$route.query.race || 'Humans');
    },
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
