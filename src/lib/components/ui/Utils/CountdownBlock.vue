<template>
  <div>
    <v-progress-linear
      v-if="getShowProgress"
      color="teal"
      buffer-value="0"
      :value="progressPercentagemBlock"
      stream
      height="9"
    ></v-progress-linear>
    <countdown
      :time="getCountdown"
      @end="end"
      @start="$emit('start')"
      @progress="progress"
    >
      <template slot-scope="props">
        {{ props.hours }} hours, {{ props.minutes }} minutes,
        {{ props.seconds }} seconds.
      </template>
    </countdown>
  </div>
</template>

<script>
export default {
  props: ["start-blocks", "end-blocks", "showProgress"],

  data() {
    return {
      averageConfirmationTime: 3,
      getCountdownPercentage: 0,
      currentBlockNumber: 0,
      getCountdown: 0,
    };
  },

  computed: {
    getBlocks() {
      return this.endBlocks - this.startBlocks;
    },

    getRemainingBlocks() {
      return this.endBlocks - this.currentBlockNumber;
    },

    getShowProgress() {
      if (this.showProgress === undefined) {
        return false;
      }
      return true;
    },

    progressPercentagemBlock() {
      return 100 - parseInt((this.getRemainingBlocks / this.getBlocks) * 100);
    },
  },

  mounted() {
    this.currentBlockNumber =
      this.$store.getters["user/currentBlockNumber"] - 3;
    this.getCountdown =
      this.getRemainingBlocks * this.averageConfirmationTime * 1000;
  },

  methods: {
    progress(data) {
      this.currentBlockNumber += 1 / this.averageConfirmationTime;
      this.$emit("progress", data);
    },

    end() {
      this.$emit("end");
    },
  },
};
</script>
