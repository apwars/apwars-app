<template>
  <div class="profile-container">
    <div class="avatar-container">Coming soon...</div>
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
    background-color: rgb(73, 73, 73);
    background-size: cover;
    width: 100%;
    padding: 8px;
    width: 124px;
    height: 124px;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
.profile-title {
  font-weight: bold;
  font-size: 28px;
  line-height: 1.4;
  text-align: left;
  color: #ffeebc;
}
</style>
