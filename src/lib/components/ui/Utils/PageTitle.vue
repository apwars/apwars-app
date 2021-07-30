<template>
  <div>
    <v-row class="d-flex" v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="8" class="align-self-center">
        <game-text header="h1">{{title}}</game-text>
        <p>
          {{description}}
        </p>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <img :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'" :src="image" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="6" class="align-self-center">
        <game-text header="h4">{{title}}</game-text>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <img :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'" :src="image" />
      </v-col>
      <v-col cols="12" class="mt-n5">
        <p>
          {{description}}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameText from '@/lib/components/ui/Utils/GameText';

export default {
  props: ['title', 'description', 'image'],

  components: {
    GameText,
  }
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
