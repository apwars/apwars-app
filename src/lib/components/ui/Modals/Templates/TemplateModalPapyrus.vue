<template>
  <div>
    <v-dialog content-class="elevation-0" persistent :value="open" :width="getWidth">
      <v-card>
        <v-card-title class="my-2">
          <h3>{{ title }}</h3>
        </v-card-title>
        <v-card-text class="d-flex" :style="`height: ${getHeight}`">
          <slot></slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <wButton class="mr-1" @click="$emit('close')" :disabled="disabledClose">
            {{ getTextClose }}
          </wButton>

          <wButton @click="$emit('confirm')" :disabled="disabledConfirm">
            {{ isLoading ? 'Waiting...' : getTextConfirm }}
          </wButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
export default {
  props: [
    'open',
    'title',
    'isLoading',
    'disabledConfirm',
    'disabledClose',
    'textClose',
    'width',
    'height',
    'textConfirm',
  ],

  components: {
    wButton,
  },
  computed: {
    getWidth() {
      if (this.width !== null && this.width !== undefined && this.width !== '') {
        return this.width;
      }
      return '600px';
    },
    getHeight() {
      if (this.height !== null && this.height !== undefined && this.height !== '') {
        return this.height;
      }
      return '175px';
    },
    getTextClose() {
      if (this.textClose === undefined) {
        return 'Close';
      }
      return this.textClose;
    },
    getTextConfirm() {
      if (this.textConfirm === undefined) {
        return 'Confirm';
      }
      return this.textConfirm;
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url('/images/modal-background.png');
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 10px 25px;
}

.v-card__title {
  color: #201813;
  font-weight: bold !important;
}

.v-card__text {
  color: #201813 !important;
}

.v-card__actions {
  padding-bottom: 35px !important;
}

@media only screen and (max-width: 600px) {
  .theme--dark.v-card {
    background-color: #ddbea0 !important;
    background-size: cover;
    background-position: center;
    padding: 40px 0px;
  }

  .v-card__title {
    padding: 0px 25px;
    justify-content: center;
  }

  .v-card__text {
    height: auto !important;
  }
}
</style>
