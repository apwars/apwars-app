<template>
  <div>
    <v-container class="pt-3">
      <profile-card
        :balance="balance"
        :collectibles="collectibles.length"
        :collection="totalItems"
      />
      <v-card color="grey lighten-4" flat>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>
            <game-title>My Collection</game-title>
          </v-toolbar-title>
          <div style="width: 20px"></div>
          <v-spacer></v-spacer>
          <square-button
            label="See all items"
            icon="mdi-format-list-bulleted"
            @click="goToStore()"
          />
        </v-toolbar>
      </v-card>

      <v-container fluid v-if="collection.length > 0">
        <v-row dense>
          <v-col
            v-for="collectible in collection"
            :key="collectible.id"
            cols="12"
            md="3"
          >
            <nft-card :collectible="collectible" :myCollection="true" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="collection.length === 0 && !isLoading">
        <v-row dense>
          Your collection is empty
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import SquareButton from "@/lib/components/ui/Utils/SquareButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import NftCard from "@/lib/components/ui/NFTCard";
import GameTitle from "@/lib/components/ui/Utils/GameTitle";
import ProfileCard from "@/lib/components/ui/ProfileCard";

import { getCollectibles } from "@/data/Collectibles";
import Collectibles from "@/lib/eth/Collectibles";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  components: {
    GameText,
    SquareButton,
    NftCard,
    GameTitle,
    ProfileCard,
  },

  data() {
    return {
      balance: 0,
      collectibles: [],
      balances: [],
      itemsCount: 0,
      totalItems: 0,
      isLoading: true,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    collection() {
      return this.collectibles
        .filter((item, i) => this.balances[i] > 0)
        .map((item, i) => {
          item.userAmount = this.balances[i];
          return item;
        });
    },
  },

  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    goToStore() {
      this.$router.push("/");
    },

    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        this.isLoading = true;
        const wgold = new wGOLD(this.addresses.wGOLD);
        this.balance = web3.utils.fromWei(await wgold.balanceOf(this.account));

        this.collectibles = getCollectibles();

        this.balances = await Promise.all(
          this.collectibles.map((item) => {
            const collectibles = new Collectibles(item.contractAddress);
            return collectibles.balanceOf(this.account, item.id);
          })
        );

        this.itemsCount = this.balances.filter((balance) => balance > 0).length;
        this.totalItems = this.balances.reduce((acc, item) => acc + item, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
