<template>
  <span v-if="isTooltip">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          v-bind:class="{ 'cursor-pointer': isLink }"
          @click="openAddress"
        >
          {{ addressFormat }}
        </span>
      </template>
      <span>{{ address }}</span>
    </v-tooltip>
  </span>
  <span v-else v-bind:class="{ 'cursor-pointer': isLink }" @click="openAddress">
    {{ addressFormat }}
  </span>
</template>

<script>
export default {
  props: ["address", "link", "tooltip"],

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
      var a = document.createElement("a");
      a.target = "_blank";
      a.href = `https://bscscan.com/address/${this.address}`;
      a.click();
    },
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  color: #ffb800;
}
</style>
