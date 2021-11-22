<template>
  <v-app :style="$route.name === 'Enlistment' ? 'background-color: #000;' : ''">
    <router-view></router-view>
  </v-app>
</template>

<script>
import config from './configs'


/*
|---------------------------------------------------------------------
| Main Application Component
|---------------------------------------------------------------------
*/
export default {
  head: {
    link: [
      // adds config/icons into the html head tag
      ...config.icons.map((href) => ({ rel: 'stylesheet', href }))
    ]
  }
}
</script>

<style>
.v-app-bar .theme--dark.v-card {
  background: #32211B !important;
}
</style>
