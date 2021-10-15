<template>
  <span>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="isTooltip ? on : false"
          class="d-flex"
          v-bind:class="{ 'cursor-pointer': isLink }"
          @click="openAddress"
        >
          <span class="align-self-center span">{{ titleTicker }}</span>
          <!-- <span class="align-self-center" v-if="isLink">
            <v-img width="16" class="ml-1" :src="External" alt="external-link"></v-img>
          </span> -->
        </span>
      </template>
      <span>{{ address }}</span>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  name: 'AddressTooltip',
  props: ['address', 'titleTicker', 'link', 'tooltip'],

  data() {
    return {
      External,
    };
  },
  computed: {
    addressFormat() {
      return `${this.address.slice(0, 6)}...${this.address.slice(-6)}`;
    },
    isTooltip() {
      return this.tooltip !== undefined;
    },
    isLink() {
      return this.link !== undefined;
    },
  },

  methods: {
    openAddress() {
      if (!this.isLink) {
        return;
      }
      window.open(`https://bscscan.com/token/${this.address}`);
    },
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  color: #ffb800;
}
.span {
  font-size: 14px;
}
</style>
