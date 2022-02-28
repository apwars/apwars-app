<template>
  <div class="profile-container">
    <div class="avatar-container"><img class="avatar-border" src="/images/icons/avatar-border.png" alt="Avatar border" width="100%" height="100%" /><div class="avatar"> Coming soon...</div></div>
    <div class="account-data">
        <div class="profile-title"><div>Your Profile</div><img src="/images/no-faction.png" alt="No Faction" /></div>
        <div class="profile-name">Waiting badass name</div>
        <div>{{ truncate(account) }}</div></div>
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
  width: 210px;
}
.avatar-container {
    position: relative;
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
.avatar-border {
  position: absolute;
  z-index: 3;
}
.avatar {
  position: absolute;
  z-index: 1;
}
.profile-name {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.3;
}
.profile-title {
  font-weight: bold;
  font-size: 26px;
  line-height: 1.4;
  text-align: left;
  color: #ffeebc;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
