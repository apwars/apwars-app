<template>
  <div class="profile-container">
    <div class="avatar-container" @click.stop="() => redirectProfile()">
      <img
        class="avatar-border"
        src="/images/icons/avatar-border.png"
        alt="Avatar border"
      />
      <div class="avatar"><VAvatar :avatar="account" /></div>
    </div>
    <div class="account-data">
      <div class="profile-title">
        <div>Your Profile</div>
        <img :src="factionImage" alt="Faction" width="64px" />
      </div>
      <v-skeleton-loader v-if="isLoading" type="text" width="100%" />
      <div class="profile-name" v-else>
        {{ profile.name || "Waiting badass name" }}
      </div>
      <div>{{ truncate(account) }}</div>
    </div>
  </div>
</template>
<script>
import UserController from "@/controller/UserController";
import walletTruncate from "@/helpers/walletTruncate";
import VAvatar from "@/lib/components/ui/Utils/VAvatar.vue";
export default {
  components: { VAvatar },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    factionImage() {
      const corps = ["humans", "elves"];
      if (!this.profile || !this.profile.race) {
        return "/images/no-faction.png";
      }
      if (corps.includes(this.profile.race)) {
        return "/images/icons/corp.png";
      }
      return "/images/icons/degen.png";
    },
  },
  data() {
    return {
      isLoading: true,
      profile: null,
    };
  },
  methods: {
    truncate(text) {
      return walletTruncate(text);
    },
    redirectProfile() {
      this.$router.push("/profile/me");
    },
    async fetchProfile() {
      if (!this.isConnected || !this.account) {
        return;
      }
      this.isLoading = true;
      try {
        const controller = new UserController();
        const profile = await controller.getProfile(this.account);
        this.profile = profile;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchProfile();
  },
  watch: {
    isConnected() {
      this.fetchProfile();
    },
    account() {
      this.fetchProfile();
    },
  },
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
  padding: 6px;
  width: 124px;
  height: 124px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-border {
  position: absolute;
  z-index: 3;
}
.avatar {
  position: absolute;
  width: 124px;
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
