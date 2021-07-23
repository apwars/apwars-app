<template>
  <div>
    <countdown
      v-if="showCountdown"
      :time="getCountdown"
      @end="$emit('end')"
      @start="$emit('start')"
      @progress="
        (data) => {
          $emit('progress', data);
        }
      "
    >
      <template slot-scope="props">
        {{ props.hours }} hours, {{ props.minutes }} minutes,
        {{ props.seconds }} seconds.
      </template>
    </countdown>
    <span v-else>{{ getTime }}</span>
  </div>
</template>

<script>
export default {
  props: ["blocks", "countdown"],

  data() {
    return {
      averageConfirmationTime: 3,
    };
  },

  computed: {
    getTime() {
      const duration = this.blocks * this.averageConfirmationTime * 1000;
      const seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      let time = "0 seconds";
      if (hours > 0) {
        time = `${hours} hours`;
      } else if (minutes > 0) {
        time = `${minutes} minutes`;
      } else if (seconds > 0) {
        time = `${seconds} seconds`;
      }
      return `Estimated time: ~${time}`;
    },

    showCountdown() {
      if (this.countdown === undefined) {
        return false;
      }
      return true;
    },

    getCountdown() {
      return (this.blocks * this.averageConfirmationTime * 1000);
    },
  },
};
</script>
