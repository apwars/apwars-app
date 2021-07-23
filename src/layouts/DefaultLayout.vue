<template>
  <v-layout class="fill-height">
    <app-header />
    <v-main>
      <div class="mb-3">
        <router-view :key="$route.fullPath"></router-view>

        <v-dialog v-model="showModal" persistent max-width="300">
          <v-card>
            <v-card-title class="headline">
              Connect to Metamask
            </v-card-title>
            <v-card-text>
              <v-container fill-height>
                <v-row class="justify-center align-center">
                  <v-col cols="12">
                    <v-img class="text-center" src="/images/metamask.svg" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="connectToMetaMask">
                Connect
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-slide-y-transition>
        <div :class="{'message-box': playerName, 'player-box': !playerName}" v-if="showChatBox">
          <v-card
            class="d-flex flex-column space-between"
            width="350"
            outlined
            :height="playerName ? `100%` : null"
          >
            <v-card-text>
              <div
                class="d-flex flex-row justify-space-between align-center"
              >
                <div>
                  Live Chat - APWars 
                  <span v-if="playerName">({{playerName}})</span>
                </div>
                <v-menu
                  bottom
                  origin="center center"
                  transition="scale-transition"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title @click="toggleChat()">
                        <v-btn text>
                          <v-icon left>
                            mdi-close
                          </v-icon>
                          Close
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                       <v-list-item-title @click="clearPlayerName()">
                        <v-btn text>
                          <v-icon left>
                            mdi-account-arrow-right
                          </v-icon>
                          Change name
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div v-if="playerName" id="messages-container" style="max-height: 260px; overflow-y: scroll; overflow-x: hide">
                <v-list-item v-for="(message, index) in messages" :key="index" :id="`message-${index}`">
                  <v-list-item-avatar>
                    <v-img :src="`https://avatar.apwars.farm?seed=${message.id}`"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{message.name}}
                      <small class="date">({{parseDate(message.date)}})</small>
                    </v-list-item-title>
                    <small>{{message.msg}}</small>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else class="d-flex justify-center align-center" style="max-height: 260px; overflow-y: scroll; overflow-x: hide">
                <img src="/images/chat.png" class="mt-2" style="width: 260px; height: 260px" />
              </div>
            </v-card-text>
            <v-spacer v-if="playerName"></v-spacer>
            <v-card-actions class="d-flex flex-row" style="height: 70px;" v-if="playerName">
                <div style="width: 100%">
                  <v-text-field
                    @keydown.enter="sendMessage()"
                    counter="150"
                    v-model="message"
                    label="Message"
                  ></v-text-field>
                </div>
                <div style="width: 40px" class="ml-auto">
                  <v-btn
                    :disabled="message.length > 150"
                    @click="sendMessage"
                    icon
                  >
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </div>
            </v-card-actions>
            <v-card-actions class="d-flex flex-row" style="height: 70px;" v-else>
                <div style="width: 100%">
                  <v-text-field
                    @keydown.enter="updatePlayerName()"
                    v-model="tmpPlayerName"
                    label="Enter your name"
                    counter="20"
                  ></v-text-field>
                </div>
                <div style="width: 40px" class="ml-auto">
                  <v-btn
                    :disabled="tmpPlayerName.length > 20"
                    @click="updatePlayerName()"
                    icon
                  >
                    <v-icon>mdi-account-arrow-right</v-icon>
                  </v-btn>
                </div>
            </v-card-actions>
        </v-card>
        </div>
      </v-slide-y-transition>
      
      <v-fab-transition>
        <v-btn v-show="!showChatBox" fab dark large color="primary" fixed right bottom @click="toggleChat()">
          <v-icon>mdi-chat</v-icon>
        </v-btn>  
      </v-fab-transition>
    </v-main>
    <app-footer />
  </v-layout>
</template>

<script>
import AppHeader from "@/lib/components/ui/App/AppHeader";
import AppFooter from "@/lib/components/ui/App/AppFooter";

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
const sha256 = require('js-sha256');

export default {
  components: {
    AppHeader,
    AppFooter,
  },

  data() {
    return {
      showModal: true,
      showChatBox: false,
      playerName: sessionStorage.getItem('playerName'),
      tmpPlayerName: '',
      message: '',
      signature: sessionStorage.getItem('signature'),
      guid: sessionStorage.getItem('guid'),
      messages: [],
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  watch: {
    isConnected() {
      this.showModal = !this.isConnected;
      this.watchBlockchain();
    },
  },

  mounted() {
    this.watchBlockchain();

    socket.on('messages', (items) => {
      this.messages = items;
    });

    socket.on('message', (data) => {
      this.messages.push(data);
    });
  },

  updated() {
    this.scrollMessageContainer();
  },

  methods: {
    connectToMetaMask() {
      if (!this.isConnected) {
        this.$store.dispatch("user/connectToMetaMask");
      }
    },

    async watchBlockchain() {
      if (!this.isConnected) {
        return;
      }

      web3.eth.clearSubscriptions();
      await this.updateCurrentBlock();
      web3.eth.subscribe("newBlockHeaders", () => {
        this.updateCurrentBlock();
      });
    },

    async updateCurrentBlock() {
      const blockNumber = await web3.eth.getBlockNumber();
      this.$store.dispatch("user/updateCurrentBlockNumber", { blockNumber });
    },

    toggleChat() {
      this.showChatBox = !this.showChatBox;
    },

    sendMessage() {
      if (this.tmpPlayerName.length > 150) {
        return;
      }
      
      socket.emit('message', {
        msg: this.message,
        name: this.playerName,
        signature: this.signature,
        guid: this.guid,
      });

      this.message = '';
    },

    scrollMessageContainer() {
      const el = document.getElementById(`message-${this.messages.length-1}`);
      
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },

    async updatePlayerName() {
      if (this.tmpPlayerName.length > 50) {
        return;
      }

      this.guid = uuidv4();
      this.signature = await window.web3.eth.personal.sign(sha256(this.tmpPlayerName + this.guid), this.account);
      this.playerName = this.tmpPlayerName;

      sessionStorage.setItem('playerName', this.playerName);
      sessionStorage.setItem('guid', this.guid);
      sessionStorage.setItem('signature', this.signature);
    },

    async clearPlayerName() {
      this.guid = '';
      this.signature = ''
      this.playerName = '';

      sessionStorage.setItem('playerName', '');
      sessionStorage.setItem('guid', '');
      sessionStorage.setItem('signature', '');
    },

    parseDate(date) {
      return moment(date).startOf('minute').fromNow()
    }
  },
};
</script>

<style lang="scss">
.app-bar-full {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 0;
  }
}

.text-wGOLD {
  background-image: url("/images/gold-background.png");
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: normal !important;
}

.message-box {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 400px;
  margin-bottom: 60px;
  z-index: 10000;
}

.player-box {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 400px;
  margin-bottom: 60px;
  z-index: 10000;
}

.date {
  font-size: 10px;
}
</style>