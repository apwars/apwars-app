<template>
  <div>
    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-badge
          bordered
          offset-x="14"
          offset-y="14"
          :content="count"
          :value="count"
        >
          <v-btn @click="count = 0" icon v-on="on" class="elevation-2">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <v-card>
        <v-list three-line dense max-width="400">
          <v-subheader class="pa-2 font-weight-bold">Notifications</v-subheader>
          <div v-for="(item, index) in items" :key="index">
            <v-divider v-if="index > 0 && index < items.length" inset></v-divider>

            <v-list-item @click="goToProposal(item.proposalId)">
              <v-list-item-avatar size="32" :color="item.color">
                <v-icon dark small>{{ item.icon }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="align-self-center">
                <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      count: 0
    }
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    }
  },

  watch: {
    isConnected() {
      this.subscribeToEvents();
    },
  },

  mounted() {
    this.subscribeToEvents();
  },

  methods: {
  }
}
</script>
