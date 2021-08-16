<template>
  <v-footer app padless>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center menu-footer"
    >
      <div class="d-flex justify-center justify-md-start align-center">
        <div class="d-inline-flex">
          <img
            v-if="account"
            class="d-block mx-1 mx-md-2 avatar"
            :src="
              `https://avatar.apwars.farm/?seed=${account}&avatar=${avatar}`
            "
            alt="avatar"
          />
        </div>
        <div class="d-inline-flex align-center">
          <img
            class="d-block mx-0 mx-md-1 i-coin"
            src="/images/wgold.png"
            alt="wgold"
          />
          <span class="balance-wGOLD">
            <amount v-if="!isLoading" :amount="balance" decimals="2" symbol="wGOLD" />
          </span>
        </div>
      </div>
      <div class="d-flex">
        <v-sheet class="mx-auto menu-itens align-center" max-width="100%">
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
      <div class="d-flex"></div>
    </div>

    <div class="d-flex justify-space-between copyright">
      <div class="overline">
        Copyright © 2021 <a href="#" target="_blank">APWars</a>, All rights
        Reserved
      </div>
      <v-spacer></v-spacer>
      <div class="overline">
        Version<a href="#" target="_blank"> {{ $store.getters.appVersion }} </a>
      </div>
      <v-spacer></v-spacer>
      <div class="overline">
        Made with <v-icon small color="pink">mdi-heart</v-icon> by
        <a href="#" target="_blank">Orcs and Humans</a>
      </div>
    </div>
  </v-footer>
</template>
<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wGOLD from "@/lib/eth/wGOLD";

export default {
  data() {
    return {
      menu: [
        {
          title: "Home",
          image: "/images/icons/home.png",
          href: "/",
        },
        {
          title: "Library",
          image: "/images/icons/library.png",
          href: "/game-items",
        },
        {
          title: "Black Market",
          image: "/images/icons/black-market.png",
          href: "/",
        },
        {
          title: "Army",
          image: "/images/icons/army.png",
          href: "",
          submenu: [
            {
              title: "Available Units",
              href: "/war-stats",
              image: "/images/icons/army.png",
            },
            {
              title: "Training Center",
              href: "/training-center",
              image: "/images/icons/battle-shield.png",
            },
          ],
        },
        {
          title: "Wars",
          image: "/images/icons/wars.png",
          href: "",
          submenu: [
            {
              title: "War against FED",
              image: "/images/icons/wars.png",
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
          image: "/images/icons/inventory.png",
          href: "/inventory",
        },
      ],
      balance: 0,
      isLoading: true,
    };
  },
  components: {
    Amount,
  },
  computed: {
    appVersion() {
      return this.$store.getters.appVersion;
    },
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
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
  },
  mounted() {
    this.loadData();
  },
  methods: {
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

<style scoped>
.d-flex {
  width: 100%;
}
.menu-footer {
  height: 70px;
  border: 2px solid #bb7248;
  border-radius: 6px;
  background-image: url("/images/battle/bg-wars.png");
  background-repeat: repeat;
  margin: 0px 12px;
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
  width: 80px;
}
.menu-item > img {
  height: 45px;
}
.menu-item > .divider {
  width: 3px;
  height: 45px;
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
}
</style>

<style>
@media only screen and (max-width: 600px) {
  .v-sheet.v-footer {
    padding: 10px 4px !important;
    background: transparent !important;
  }
  .v-main {
    padding-bottom: 135px !important;
  }
}
</style>
