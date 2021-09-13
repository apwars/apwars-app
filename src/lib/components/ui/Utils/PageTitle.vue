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
        <v-img
          max-width="270px"
          :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'"
          :src="image"
        >
          <div v-if="titleImg" class="d-flex flex-column justify-center text-center mt-5">
            <h3>{{ titleImg }}</h3>
            <v-address  class="mx-auto text-center text-caption" :address="subtitleImg" link tooltip> </v-address>
          </div>
        </v-img>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="6" class="align-self-center">
        <game-text header="h4">{{ title }}</game-text>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-img
          :class="!$vuetify.breakpoint.mdAndUp ? 'img-mobile' : 'img-full'"
          :src="image"
        >
          <div v-if="titleImg" class="mt-3 text-center">
            <h6>{{ titleImg }}</h6>
            <div class="ml-5">
              <span style="font-size: 8px;"
                ><v-address :address="subtitleImg" link tooltip></v-address
              ></span>
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
import GameText from "@/lib/components/ui/Utils/GameText";
import VAddress from "@/lib/components/ui/Utils/VAddress";

export default {
  props: ["title", "description", "image", "titleImg", "subtitleImg"],

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
.lg {
  background-color: green;
}

@media only screen and (max-width: 380px) {
  .col-6 {
    padding-left: 0;
    padding-right: 0;
  }

  .col-6 {
    position: relative;
    left: 0.9rem;
  }
}
</style>
