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
          <img
            v-if="account"
            class="d-block mx-1 mx-md-2 avatar"
            :src="
              `https://avatar.apwars.farm/?seed=${getAccount}&avatar=${getAvatar}`
            "
            alt="avatar"
          />
        </span>
      </template>
      <span>{{ address }}</span>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  props: ["address", "link", "tooltip", "propAvatar"],

  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
    avatar() {
      return this.$store.getters["user/avatar"];
    },
    isTooltip() {
      return this.tooltip !== undefined;
    },
    isLink() {
      return this.link !== undefined;
    },
    getAccount() {
      if (this.address) {
        return this.address;
      }
      return this.account;
    },
    getAvatar() {
      if (this.propAvatar) {
        return this.propAvatar;
      }
      return this.avatar;
    },
  },

  methods: {
    openAddress() {
      if (!this.isLink) {
        return;
      }
      var a = document.createElement("a");
      a.href = `https://bscscan.com/address/${this.getAccount}`;
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
