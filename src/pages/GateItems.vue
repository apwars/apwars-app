<template>
  <div>
    <div class="bg-library">
      <v-container>
        <div>
          <v-row class="d-flex">
            <v-col cols="6" class="align-self-center">
              <game-text v-if="$vuetify.breakpoint.mdAndUp" header="h1">Game Items</game-text>
              <game-text v-else header="h4">Game Items</game-text>

              <p>
                Here you will find all the items in the game, it is essential to know them all to
                assemble the best strategy!
              </p>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <img :class="!$vuetify.breakpoint.mdAndUp ? 'img-library-mobile' : 'img-library-full'" src="/images/black-market/book.png" alt="book" />
            </v-col>
          </v-row>
        </div>

        <div v-if="false">
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
            <v-tabs v-model="tab">
              <v-tab>Game Items</v-tab>
              <v-tab>Legendary Relics</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-row dense>
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
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-row dense>
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
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
      tab: 0,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
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
<style scoped>
.bg-library {
  background-image: url('/images/black-market/Library.png');
  background-size: cover;
}

.img-library-full {
  width: 251px !important;
  height: 251px !important;
}

.img-library-mobile {
  width: 160px !important;
  height: 160px !important;
}
</style>
