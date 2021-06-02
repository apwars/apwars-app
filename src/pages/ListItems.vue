<template>
  <div>
    <div class="bg-library">
      <v-container>
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <v-row class="d-flex">
            <v-col cols="12" md="6" class="align-self-center">
              <h1 class="text-h1 text-wGOLD ">Game Items</h1>

              <p class="description-library">
                Here you will find all the items in the game, it is essential to know them all to
                assemble the best strategy!
              </p>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end">
              <img src="/images/black-market/book.png" alt="book" />
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row dense class="d-flex">
            <v-col cols="6" class="align-self-center">
              <h1 class="h1-library">Game Items</h1>
            </v-col>
            <v-col cols="6" class="align-center">
              <img
                class="img-library"
                src="/images/black-market/book.png"
                alt="book"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <p class="description-library">
                Here you will find all the items in the game, it is essential to know them all to
                assemble the best strategy!
              </p>
            </v-col>
          </v-row>
        </div>
        <v-row class="d-flex">
          <v-col cols="12" md="12" lg="6" class="d-flex">
            <wButton size="small" @click="select = 'game-items'" :actived="select === 'game-items'">
              Game Items
            </wButton>
            <wButton
              class="ml-3"
              size="small"
              @click="select = 'legendary'"
              :actived="select === 'legendary'"
            >
              Collectibles
            </wButton>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row dense v-if="isLegendary">
        <v-col
          v-for="collectible in collectibles"
          :key="collectible.id"
          cols="12"
          md="4"
          :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''"
        >
          <nft-item :collectible="collectible" />
          <div>
            <game-text>{{ collectible.title }}</game-text>
            <p style="font-size: 12px" v-html="collectible.description" />
          </div>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-col
          v-for="gameItem in gameItems"
          :key="gameItem.id"
          cols="12"
          md="4"
          :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''"
        >
          <nft-item :collectible="gameItem" />
          <div>
            <game-text>{{ gameItem.title }}</game-text>
            <p style="font-size: 12px" v-html="gameItem.description" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NftItem from '@/lib/components/ui/NFTItem';
import GameTitle from '@/lib/components/ui/Utils/GameTitle';
import wButton from '@/lib/components/ui/Buttons/wButton';

import { getLegendaryRelics } from '@/data/Collectibles/LegendaryRelics';
import { getCollectibles } from '@/data/Collectibles';
import GameText from '@/lib/components/ui/Utils/GameText';

export default {
  components: {
    NftItem,
    GameTitle,
    GameText,
    wButton,
  },

  data() {
    return {
      loading: true,
      gameItems: [],
      collectibles: [],
      select: 'game-items',
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    },

    isLegendary() {
      return this.select === 'game-items' ? true : false;
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    page() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToMyCollection() {
      this.$router.push('/collection');
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      this.loading = true;

      try {
        this.collectibles = getCollectibles().filter(collectible => !collectible.isGift);
        this.gameItems = getLegendaryRelics();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style>
.bg-library {
  background-image: url('/images/black-market/Library.png');
  background-size: cover;
}

.img-library {
  width: 70%;
}

.h1-library {
  background: linear-gradient(180deg, #f6ff00 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 78px;
  line-height: 101px;
}
.description-library {
  font-family: PT Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
}

@media only screen and (max-width: 600px) {
  .description-library {
    font-size: 13px;
    line-height: 16px;
  }
  .h1-library {
    font-size: 32px;
    line-height: 36px;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
