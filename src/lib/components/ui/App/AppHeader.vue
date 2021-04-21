<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense nav>
        <v-subheader class="text-uppercase font-weight-bold">Menu</v-subheader>
        <v-list-item v-for="(item, index) in menu" :key="index" link>
          <v-list-item-content>
            <a
              :href="`${item.href}`"
              :key="index"
              class="mx-1 v-btn theme--dark v-size--default"
            >
              {{ item.title }}
            </a>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="app-bar-full">
      <v-card class="flex-grow-1 d-flex pa-1" tile>
        <div class="d-flex flex-grow-1 align-center">
          <v-app-bar-nav-icon
            class="d-md-none drawer-button"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <router-link to="/" class="d-flex px-1 align-center logo">
            <img
              src="/images/project/logo-small.png"
              height="56"
              alt="logo"
              class="mr-1"
            />
          </router-link>

          <div class="d-none d-md-block">
            <div
              v-for="(item, index) in menu"
              :key="index"
              text
              class="mx-1 v-btn v-btn--text theme--dark v-size--default"
            >
              <router-link :to="item.href" class="text-decoration-none">
                {{ item.title }}
              </router-link>
            </div>
          </div>

          <v-spacer></v-spacer>

          <toolbar-user @toggleNetworkInfo="toggleNetworkInfo" />
        </div>
      </v-card>

      <network-info-modal
        :open="networkInfoModalOpen"
        @close="closeNetworkInfoModal"
      />
    </v-app-bar>
  </div>
</template>

<script>
import ToolbarNotifications from "@/lib/components/ui/Toolbar/ToolbarNotifications";
import ToolbarUser from "@/lib/components/ui/Toolbar/ToolbarUser";
import NetworkInfoModal from "@/lib/components/ui/Modals/NetworkInfoModal.vue";

export default {
  components: {
    ToolbarUser,
    ToolbarNotifications,
    NetworkInfoModal,
  },

  data() {
    return {
      networkInfoModalOpen: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
      drawer: null,
      menu: [
        {
          title: "Game Items",
          href: "/",
        },
        {
          title: "War Stats",
          href: "/war-stats",
        },
        {
          title: "My Collection",
          href: "/collection",
        },
        {
          title: "Buy wGOLD",
          href: "/exchange",
        },
        {
          title: "Farms",
          href: "/farms",
        },
      ],
    };
  },

  methods: {
    goToMyCollection() {
      this.$router.push('/collection');
    },

    toggleNetworkInfo(open) {
      this.networkInfoModalOpen = open;
    },

    closeNetworkInfoModal() {
      this.networkInfoModalOpen = false;
    },
  },
};
</script>

<style scoped>
.logo {
  text-decoration: none;
}
</style>
