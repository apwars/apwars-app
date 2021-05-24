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
          <span class="align-self-center">{{ addressFormat }}</span>
          <span class="align-self-center" v-if="isLink">
            <img
              width="16"
              class="ml-1"
              src="/images/icons/external-link.svg"
              alt="external-link"
            />
          </span>
        </span>
      </template>
      <span>{{ address }}</span>
    </v-tooltip>
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
