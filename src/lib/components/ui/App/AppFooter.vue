<template>
  <v-footer app>
    <div class="d-flex justify-space-between align-center menu-footer">
      <div>
        <div class="d-flex align-center">
          <div>
            <img
              class="d-block mx-2"
              src="/images/avatars/user-menu.png"
              width="60px"
              alt="avatar"
            />
          </div>
          <div class="d-flex align-center">
            <img
              class="d-block mx-1"
              src="/images/wgold.png"
              width="50px"
              alt="wgold"
            />
            <span class="balance-wGOLD">
              <amount :amount="25693.69" decimals="2" formatted />
            </span>
          </div>
          <div class="d-flex ml-2 align-center">
            <img
              class="d-block mx-1"
              src="/images/icons/wLAND.png"
              width="50px"
              alt="wLAND"
            />
            <span class="balance-wGOLD">
              <amount :amount="9532.09" decimals="2" formatted />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex menu-itens align-center">
          <span v-for="(item, index) in menu" :key="index">
            <v-tooltip bottom v-if="!item.submenu">
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
          </span>
        </div>
      </div>
      <div></div>
    </div>

    <div class="d-flex justify-space-between">
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
          title: "Exchange",
          image: "/images/icons/exchange.png",
          href: "/exchange",
        },
        {
          title: "Farms",
          image: "/images/icons/farm.png",
          href: "/farms",
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
    };
  },
  components: {
    Amount,
  },
  computed: {
    appVersion() {
      return this.$store.getters.appVersion;
    },
  },
  methods: {
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
</style>
