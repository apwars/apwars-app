<template>
  <div>
    <v-row class="d-flex" v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="8" class="align-self-center">
        <game-text header="h1">{{ title }}</game-text>
        <p>
          {{ description }}
        </p>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-img :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'" :src="image">
          <div v-if="titleImg" class="mt-7 text-center">
            <h2>{{ titleImg }}</h2>
            <div class="ml-14">
              <v-address :address="subtitleImg" link tooltip></v-address>
            </div>
          </div>
        </v-img>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="6" class="align-self-center">
        <game-text header="h4">{{ title }}</game-text>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-img :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'" :src="image">
          <div v-if="titleImg" class="mt-8 text-center">
            <h1>{{ titleImg }}</h1>
            <div class="ml-14">
              <v-address :address="subtitleImg" link tooltip></v-address>
            </div>
          </div>
        </v-img>
      </v-col>
      <v-col cols="12" class="mt-n5">
        <p>
          {{ description }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameText from '@/lib/components/ui/Utils/GameText';
import VAddress from '@/lib/components/ui/Utils/VAddress';

export default {
  props: ['title', 'description', 'image', 'titleImg', 'subtitleImg'],

  components: {
    GameText,
    VAddress,
  },
};
</script>

<style scoped>
.img-full {
  width: 251px !important;
}

.img-mobile {
  width: 160px !important;
  height: 160px !important;
}
</style>
