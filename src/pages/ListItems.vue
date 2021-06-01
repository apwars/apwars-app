<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between">
          <game-title class="align-self-center">Game Items</game-title>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
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
            <p v-html="collectible.description" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import NftItem from '@/lib/components/ui/NFTItem';
import GameTitle from '@/lib/components/ui/Utils/GameTitle';

import { getCollectibles } from '@/data/Collectibles';
import GameText from '@/lib/components/ui/Utils/GameText';

export default {
  components: {
    NftItem,
    GameTitle,
    GameText,
  },

  data() {
    return {
      loading: true,
      collectibles: [],
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
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
