<template>
  <div>
    <span>{{ getTime }}</span>
  </div>
</template>

<script>
export default {
  props: ["blocks"],

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
      if (hours > 0 && hours < 2) {
        time = `${hours} hour`;
      } else if (hours > 0) {
        time = `${hours} hours`;
      } else if (minutes > 0 && minutes < 2) {
        time = `${minutes} minute`;
      } else if (minutes > 0) {
        time = `${minutes} minutes`;
      } else if (seconds > 0 && minutes < 2) {
        time = `${seconds} second`;
      } else if (seconds > 0) {
        time = `${seconds} seconds`;
      }
      return `Estimated time: ~${time}`;
    },
  },
};
</script>
