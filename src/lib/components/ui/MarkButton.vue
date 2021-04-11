<template>
  <v-btn icon @click="mark(proposalId)">
    <v-icon :key="`markedProposal${proposalId}On`" v-if="showMarked(proposalId)" color="red">mdi-heart</v-icon>
    <v-icon v-else :key="`markedProposal${proposalId}Off`">mdi-heart-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['proposalId'],
  
  computed: {
    markedProposals() {
      return this.$store.getters['user/markedProposals'];
    },
  },

  methods: {
    mark(proposalId) {
      const actual = this.showMarked(proposalId.toString());
      this.$store.dispatch('user/markProposal', {proposalId: proposalId.toString(), marked: !actual});
    },

    showMarked(proposalId) {
      if (proposalId !== undefined && proposalId !== null) {
        return this.markedProposals[proposalId.toString()] === 1;
      }
     
      return false;
    },
  }
}
</script>