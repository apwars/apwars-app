<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense nav>
        <v-subheader class="text-uppercase font-weight-bold">Menu</v-subheader>
        <v-list-item v-for="(item, index) in menu" :key="index" link>
          <v-list-item-content v-if="!item.submenu">
            <router-link :to="item.href" class="text-decoration-none">
              {{ item.title }}
            </router-link>
          </v-list-item-content>
          <v-list-item-content v-else>
            <router-link to="" class="text-decoration-none">
              {{ item.title }}
            </router-link>
            <v-list-item
              class="ml-2"
              v-for="(item_submenu, index) in item.submenu"
              :key="index"
              link
            >
              <v-list-item-content>
                <router-link
                  :to="item_submenu.href"
                  class="text-decoration-none"
                >
                  {{ item_submenu.title }}
                </router-link>
              </v-list-item-content>
            </v-list-item>
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
              <router-link
                v-if="!item.submenu"
                :to="item.href"
                class="text-decoration-none"
              >
                {{ item.title }}
              </router-link>

              <v-menu v-else open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div class="primary--text" v-bind="attrs" v-on="on">
                    {{ item.title }}
                  </div>
                </template>

                <v-list class="submenu">
                  <v-list-item
                    v-for="(item_submenu, index) in item.submenu"
                    :key="index"
                  >
                    <v-list-item-title>
                      <router-link
                        :to="item_submenu.href"
                        class="text-decoration-none"
                      >
                        {{ item_submenu.title }}
                      </router-link>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
          title: "Black Market",
          href: "/",
        },
        {
          title: "Game Items",
          href: "/game-items",
        },
        {
          title: "Army",
          href: "",
          submenu: [
            {
              title: "Available Units",
              href: "/war-stats",
            },
            {
              title: "Training Center",
              href: "/training-center",
            },
          ],
        },
        {
          title: "Wars",
          href: "",
          submenu: [
            {
              title: "FED War",
              href: "/wars",
            },
            // {
            //   title: "Weapon Research",
            //   href: "/weapon-research",
            // },
          ],
        },
        {
          title: "Inventory",
          href: "/inventory",
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
      this.$router.push("/collection");
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

.submenu {
  border: 2px solid #f6b101;
  background: #32211c;
  border-radius: 10px;
}

.submenu >>> .v-list-item__title {
  padding: 10px 15px;
  border-radius: 5px;
  margin: 0px -10px;
}
.submenu >>> .v-list-item__title:hover {
  background: #42322d;
}
</style>
