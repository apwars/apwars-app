<template>
  <v-footer app padless>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center menu-footer"
    >
      <div class="d-flex side-menu align-center">
        <img src="/images/project/logo-small.png" height="48" alt="logo" />
      </div>
      <div class="d-flex menu-main">
        <v-sheet class="menu-itens mx-auto align-center" max-width="100%">
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="(item, index) in menu"
              :key="index"
              v-slot="{ toggle }"
            >
              <v-tooltip bottom v-if="!item.submenu" @click="toggle">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    v-bind="attrs"
                    v-on="on"
                    class="d-flex justify-space-around menu-item"
                    @click="goPage(item)"
                  >
                    <img class="d-block" :src="item.image" alt="avatar" />
                    <div v-if="index + 1 !== menu.length" class="divider"></div>
                  </div>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>

              <v-menu
                v-else
                @click="toggle"
                open-on-hover
                content-class="submenu"
                transition="scroll-y-reverse-transition"
                :nudge-left="
                  item.submenu.length > 1 ? item.submenu.length * 30 : 20
                "
                origin="top center"
                top
                offset-y
              >
                <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
                  <v-tooltip bottom>
                    <template
                      v-slot:activator="{ on: onTootip, attrs: attrsTooltip }"
                    >
                      <div
                        v-bind="{ ...attrsTooltip, ...attrsMenu }"
                        v-on="{ ...onTootip, ...onMenu }"
                        class="d-flex justify-space-around menu-item"
                      >
                        <img class="d-block" :src="item.image" alt="avatar" />
                        <div
                          v-if="index + 1 !== menu.length"
                          class="divider"
                        ></div>
                      </div>
                    </template>
                    <span>{{ item.title }}</span>
                  </v-tooltip>
                </template>

                <div class="d-flex submenu-itens align-center">
                  <v-tooltip
                    v-for="(itemSubmenu, indexSubmenu) in item.submenu"
                    :key="indexSubmenu"
                    top
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                        class="d-flex justify-space-around menu-item"
                        @click="goPage(itemSubmenu)"
                      >
                        <img
                          class="d-block"
                          :src="itemSubmenu.image"
                          alt="avatar"
                        />
                        <div
                          v-if="indexSubmenu + 1 !== item.submenu.length"
                          class="divider"
                        ></div>
                      </div>
                    </template>
                    <span>{{ itemSubmenu.title }}</span>
                  </v-tooltip>
                </div>
              </v-menu>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>
      <div class="d-flex side-menu-right">
        <div class="text-center" v-if="track">
          <v-menu :close-on-content-click="false" :nudge-height="200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <v-icon v-if="volume !== 0">mdi-volume-high</v-icon>
                <v-icon v-else>mdi-volume-off</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title
                  @click="() => setVolume(0)"
                  :class="['volume-button', volume === 0 ? 'text-yellow' : '']"
                  >Disable</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="() => setVolume(0.1)"
                  :class="[
                    'volume-button',
                    volume === 0.1 ? 'text-yellow' : '',
                  ]"
                  >25%</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="() => setVolume(0.25)"
                  :class="[
                    'volume-button',
                    volume === 0.25 ? 'text-yellow' : '',
                  ]"
                  >50%</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="() => setVolume(0.4)"
                  :class="[
                    'volume-button',
                    volume === 0.4 ? 'text-yellow' : '',
                  ]"
                  >75%</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  @click="() => setVolume(0.5)"
                  :class="[
                    'volume-button',
                    volume === 0.5 ? 'text-yellow' : '',
                  ]"
                  >100%</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <a class="help-icon" href="https://start.apwars.farm/">
          <img src="/images/icons/help.png" />
        </a>
      </div>
    </div>

    <div class="spacing"></div>
  </v-footer>
</template>
<script>
import { mapActions, mapState } from "vuex";
import wGOLD from "@/lib/eth/wGOLD";

import Amount from "@/lib/components/ui/Utils/Amount";
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  components: {
    Amount,
    Button,
  },
  data() {
    return {
      menu: [
        {
          title: "Home",
          image: "/images/icons/home.png",
          href: "/",
        },
        {
          title: "Black Market",
          image: "/images/icons/black-market.png",
          href: "/black-market",
        },
        {
          title: "Inventory",
          image: "/images/icons/inventory.png",
          href: "/inventory",
        },
        {
          title: "War against FED",
          image: "/images/icons/wars.png",
          href: "/war/intro",
        },
        {
          title: "Army",
          image: "/images/icons/helmet.png",
          href: "/war/army",
        },
        {
          title: "Bridge",
          href: "/bridge",
          image: "/images/icons/exchange.png",
        },
        {
          title: "Training Center",
          href: "/training-center",
          image: "/images/icons/battle-shield.png",
        },
        {
          title: "Leaderboard",
          href: "/leaderboard",
          image: "/images/icons/trophy.png",
        },
        {
          title: "Arcadia",
          image: "/images/icons/world.png",
          href: "/arcadia",
        },
      ],
      balance: 0,
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      isPlaying: (state) => state.music.isPlaying,
      track: (state) => state.music.track,
      volume: (state) => state.music.volume,
    }),
    appVersion() {
      return this.$store.getters.appVersion;
    },
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },
    avatar() {
      return this.$store.getters["user/avatar"];
    },
  },
  watch: {
    isConnected() {
      this.loadData();
    },

    account() {
      this.loadData();
    },

    currentBlockNumber() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      setVolume: "music/setVolume",
    }),
    async loadData() {
      if (!this.isConnected) {
        return;
      }

      try {
        const wgold = new wGOLD(this.addresses.wGOLD);
        this.balance = await wgold.balanceOf(this.account);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    goPage(menu) {
      if (this.$router.history.current.path !== menu.href) {
        this.$router.push(menu.href);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.side-menu {
  margin: 0 12px;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    flex-basis: 150px;
  }
}

.side-menu-right {
  width: 20%;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    flex-basis: 150px;
  }

  @media only screen and (max-width: 1264px) {
    width: 20%;
  }

  @media only screen and (max-width: 1150px) {
    width: 10%;
  }

  @media only screen and (max-width: 730px) {
    width: 0%;
  }
}

.menu-footer {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1232px;
  min-height: 70px;
  border: 2px solid #ffeebc;
  border-radius: 6px;
  background-image: url("/images/battle/bg-menu.png");
  background-repeat: repeat;
}

.menu-itens,
.submenu-itens {
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  background-image: url("/images/bg-pale-wood.png");
  background-repeat: repeat;
  padding: 6px 9px;
}

.submenu-itens {
  box-shadow: none;
}

.menu-item {
  cursor: pointer;
  width: 64px;
}

.menu-item > img {
  height: 36px;
}

.menu-item > .divider {
  width: 1px;
  height: 36px;
  border-radius: 3px;
  background-color: #bb7148;
  box-shadow: -2px 0px 3px -1px rgb(0 0 0);
}
.balance-wGOLD {
  font-size: 18px !important;
  font-weight: bold !important;
}

.submenu {
  border: 2px solid rgb(154, 94, 60);
  background-image: url(/images/bg-pale-wood.png);
  contain: initial !important;
  overflow: initial;
}

.submenu::before {
  position: absolute;
  content: "";
  bottom: -10px;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #9a5e3c transparent transparent transparent;
  right: calc(50% - 10px);
}

.avatar {
  width: 60px;
  border: 3px solid #bb7248;
  border-radius: 6px;
}

.i-coin {
  width: 50px;
}

.volume-button {
  font-size: 12px;
  height: 24px;
  &:hover {
    cursor: pointer;
    color: yellow;
  }
}
.text-yellow {
  color: yellow;
}

.spacing {
  height: 80px;
}

.menu-link {
  padding: 4px 12px;
  color: #ffeebc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.v-sheet.v-footer {
  background: transparent !important;
}

@media only screen and (max-width: 600px) {
  .copyright {
    display: none !important;
  }
  .menu-footer {
    height: auto;
    padding: 9px 0px;
  }
  .avatar {
    width: 40px;
  }
  .i-coin {
    width: 35px;
  }
  .menu-main {
    width: 98%;
  }
}

@media only screen and (max-width: 600px) {
  .v-sheet.v-footer {
    padding: 10px 4px !important;
  }
  .v-main {
    padding-bottom: 135px !important;
  }
}

.army-button {
  border-radius: 50px;
  background-color: #FFEEBC;
  border: 1px solid #FFEEBC;

  &:hover:enabled {
    background-color: #FFEEBC;
    border: 1px solid #FFEEBC;
    opacity: 0.8;
  }
}

.help-icon {
  display: flex;
  margin-left: auto;
  margin-right: 8px;
  cursor: pointer;

  img {
    height: 50px;
  }
}
</style>
