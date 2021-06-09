<template>
  <div>
    <template-modal-papyrus :open="open" :title="title" :width="700" :height="'220px'" @close="close" textConfirm="Send Item">
      <slot> </slot>
    </template-modal-papyrus>
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
import TemplateModalPapyrus from '@/lib/components/ui/Modals/Templates/TemplateModalPapyrus';
export default {
  props: ['open', 'title', 'hideOk'],

  data() {
    return {
      address: '',
    };
  },

  components: {
    wButton,
    TemplateModalPapyrus,
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
    },

  },

  methods: {
    close() {
      this.$emit('close');
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
  padding: 15px;
}

.v-card__title {
  color: #765e55;
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
  float: right;
}
</style>
