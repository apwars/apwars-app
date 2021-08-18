<template>
  <div>
    
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isLoading: true,
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>

</style>
