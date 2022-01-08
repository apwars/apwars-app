<template>
  <v-row>
    <v-col col="12" sm="4">
      <v-skeleton-loader type="heading" />
      <v-skeleton-loader class="mt-1" type="paragraph" />
    </v-col>
    <v-col col="12" sm="4">
      <v-skeleton-loader class="mt-1" type="text, text" />
    </v-col>
    <v-col col="12" sm="4">
      <v-skeleton-loader type="image" height="80px" />
    </v-col>
    <v-col col="12">
      <v-skeleton-loader type="image" height="120px" />
      <v-skeleton-loader class="mt-2" type="image" height="120px" />
    </v-col>
  </v-row>
</template>
