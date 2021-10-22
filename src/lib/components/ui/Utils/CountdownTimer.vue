<template>
  <div>
    <v-progress-linear
      v-if="getShowProgress"
      color="teal"
      buffer-value="0"
      :value="progressPercentagemTime"
      stream
      height="9"
    ></v-progress-linear>
    <countdown
      :time="getTime"
      @end="end"
      @start="$emit('start')"
      @progress="progress"
    >
      <template slot-scope="props">
        <span v-if="props.days > 0">~{{ props.days }} days, </span>
        <span v-if="props.hours > 0">~{{ props.hours }} hours, </span>
        <span>{{ props.minutes }} minutes, </span>
        <span>{{ props.seconds }} seconds.</span>
      </template>
    </countdown>
  </div>
</template>

<script>
export default {
  props: ["start-time", "end-time", "showProgress"],

  data() {
    return {
      currentDate: 0,
    };
  },

  computed: {
    getTime() {
      return this.endTime - this.startTime;
    },

    getRemainingTime() {
      return this.endTime - this.currentDate;
    },

    getShowProgress() {
      if (this.showProgress === undefined) {
        return false;
      }
      return true;
    },

    progressPercentagemTime() {
      return 100 - parseInt((this.getRemainingTime / this.getTime) * 100);
    },
  },

  mounted() {
    this.currentDate = new Date().getTime();
  },

  methods: {
    progress(data) {
      this.currentDate = new Date().getTime();
      this.$emit("progress", data);
    },

    end() {
      this.$emit("end");
    },
  },
};
</script>
