<template>
  <div>
    <v-dialog
    content-class="elevation-0"
    persistent
    :value="open"
    width="556"
    style="box-shadow: none"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text style="height: 340px">
        <div class="content">
          <slot></slot>
        </div>
        <div class="button" v-if="!hideOk">
          <img
            @click="close"
            class="btn"
            src="/images/buttons/btn-ok.png"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>

export default {
  props: ['open', 'title', 'hideOk'],
  
  data() {
    return {
      address: '',
    }
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    },

    networkInfo() {
      return this.$store.getters['user/networkInfo'];
    },

    addresses() {
      return this.$store.getters['user/addresses'];
    }
  },

  methods: {
    close() {
      this.$emit('close');
    },
  }
}
</script>

<style scoped>
.theme--dark.v-card {
  background-color:transparent !important;
  background: url('/images/modal-background.png');
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 15px;
}

.v-card__title {
  color: #765E55;
  font-size: 15x !important;
  font-weight: bold !important;
}

.content {
  height: 185px;
  color: #201813;
  font-size: 90%;
  display: table-cell;
  vertical-align: middle;
}

.btn {
  cursor: pointer;
  width: 150px;
  float:right;
}
</style>
