<template>
  <v-app-bar
    app
    class="app-bar-full"
  >
    <v-card
      class="flex-grow-1 d-flex pa-1"
      tile
    >
      <div class="d-flex flex-grow-1 align-center">
        <router-link to="/" class="d-flex px-1 align-center logo">
          <img src="/images/project/logo-small.png" height="56" alt="logo" class="mr-1">
        </router-link>

        <v-spacer></v-spacer>

        <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
          

          <v-menu offset-y left transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense nav>
              <v-list-item
                link
                :disabled="isConnected"
                @click="connectToMetaMask"
              >
                <v-list-item-icon>
                  <v-icon small>mdi-format-list-bulleted</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>My Collection</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <toolbar-user @toggleNetworkInfo="toggleNetworkInfo" />
      </div>
    </v-card>

    
    <network-info-modal :open="networkInfoModalOpen" @close="closeNetworkInfoModal" />
  </v-app-bar>
</template>

<script>
import ToolbarNotifications from '@/lib/components/ui/Toolbar/ToolbarNotifications';
import ToolbarUser from '@/lib/components/ui/Toolbar/ToolbarUser';
import NetworkInfoModal from '@/lib/components/ui/Modals/NetworkInfoModal.vue';

export default {
  components: {
    ToolbarUser,
    ToolbarNotifications,
    NetworkInfoModal,
  },

  data () {
    return {
      networkInfoModalOpen: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    }
  },

  methods: {
    toggleNetworkInfo(open) {
      this.networkInfoModalOpen = open;
    },

    closeNetworkInfoModal() {
      this.networkInfoModalOpen = false;
    }
  },
}
</script>

<style scoped>
.logo {
  text-decoration: none;
}
</style>