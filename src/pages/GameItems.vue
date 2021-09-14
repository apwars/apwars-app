
<template>
  <div>
    <div class="bg-library">
      <v-container>
        <page-title 
          title="Game Items" 
          description="Here you will find all the items in the game, it is essential to know them all to assemble the best strategy!" 
          image="/images/black-market/book.png"
        />
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
          <v-col class="d-flex">
            <v-tabs v-model="tab" show-arrows>
              <v-tab v-for="itemType in itemTypes" :key="itemType">{{ itemType }}</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="mt-n6"> 
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="itemType in itemTypes" :key="itemType">
          <v-card flat>
            <v-container>
              <v-row>
                <v-col
                  v-for="item in itemsList"
                  :key="item.id"
                  sm="12"
                  md="6"
                  :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''"
                >
                  <nft-item :collectible="item" />
                  <div class="description">
                    <game-text>{{ item.title }}</game-text>
                    <p style="font-size: 12px" v-html="item.description" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
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

import { getCollectibles, getGameItemTypesOptions } from '@/data/Collectibles';
import GameText from '@/lib/components/ui/Utils/GameText';
import PageTitle from '@/lib/components/ui/Utils/PageTitle.vue';

export default {
  components: {
    NftItem,
    GameTitle,
    GameText,
    wButton,
    PageTitle,
  },

  data() {
    return {
      loading: true,
      itemTypes: [],
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

    itemsList() {
      return this.collectibles.filter(c => c.typeDesc === this.itemTypes[this.tab])
    }
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
        const itemsData = getCollectibles();
        this.collectibles = itemsData;
        this.itemTypes = getGameItemTypesOptions();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bg-library {
  background-image: url('/images/black-market/Library.png');
  background-size: cover;
}
.description {
  padding-right: 48px;
}
</style>
