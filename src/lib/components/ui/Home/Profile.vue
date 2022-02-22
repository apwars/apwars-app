<template>
  <div class="profile-container">
    <div class="avatar-container"><v-avatar :address="account"/></div>
    <div class="account-data">
        <div class="profile-title">Your Profile</div>
        {{ truncate(account) }}</div>
  </div>
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
.profile-container {
  display: flex;
}
.account-data {
  margin-left: 8px;
}
.avatar-container {
    background-image: url('/images/icons/avatar-border.png');
    background-size: cover;
    width: 100%;
    padding: 8px;
    width: 124px;
    height: 124px;
}
.profile-title {
  font-weight: bold;
  font-size: 28px;
  line-height: 1.4;
  text-align: left;
  color: #ffeebc;
}
</style>
