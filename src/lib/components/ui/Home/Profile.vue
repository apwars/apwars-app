<template>
  <v-row>
    <v-col cols="12" sm="4"><div class="avatar-container"><v-avatar :address="account"/></div></v-col>
    <v-col cols="12" sm="8">
        <div class="profile-title">Your Profile</div>
        {{ truncate(account) }}</v-col>
  </v-row>
</template>
<script>
import walletTruncate from "@/helpers/walletTruncate"
import VAvatar from "@/lib/components/ui/Utils/VAvatar.vue";
export default {
  components: { VAvatar },
  computed: {
    account() {
      return this.$store.getters["user/account"];
    },
  },
  methods: {
      truncate(text) {
          return walletTruncate(text);
      }
  }
};
</script>
<style lang="scss" scoped>
.avatar-container {
    background-image: url('/images/icons/slot.png');
    background-size: cover;
    width: 100%;
    padding: 8px;
}
.profile-title {
  font-weight: bold;
  font-size: 28px;
  line-height: 1.4;
  text-align: left;
  color: #ffeebc;
}
</style>
