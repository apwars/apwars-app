<template>
   <v-container class="pt-3">
    <v-card color="grey lighten-4" flat>
      <v-toolbar class="elevation-0">
        <v-toolbar-title>
          <game-title>Game Items</game-title>
        </v-toolbar-title>
        <div style="width: 20px"></div>
        <v-spacer></v-spacer>
        <square-button label="My Collection" icon="mdi-format-list-bulleted" @click="goToMyCollection()" />
      </v-toolbar>
    </v-card>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="collectible in collectibles"
          :key="collectible.id"
          cols="12"
          md="3"
        >
          <nft-card :collectible="collectible" />
        </v-col>
      </v-row>
    </v-container>
   </v-container>
</template>

<script>
import SquareButton from '@/lib/components/ui/Utils/SquareButton';
import GameModal from '@/lib/components/ui/Modals/GameModal';

import NftCard from '@/lib/components/ui/NFTCard';
import GameTitle from '@/lib/components/ui/Utils/GameTitle';

import { getCollectibles } from '@/data/Collectibles';

export default {
  components: {
    NftCard,
    SquareButton,
    GameTitle,
    GameModal,
  },

  data() {
    return {
      loading: true,
      collectibles: [],
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
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
        this.collectibles = getCollectibles();
      } catch(e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
