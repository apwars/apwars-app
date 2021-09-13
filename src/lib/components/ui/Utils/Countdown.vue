<template>
  <div>
    <h3 class="text-wGOLD text-center text-h4 text-md-h3 ma-0 ma-md-3">
      {{ title }}
    </h3>
    <div class="d-flex justify-center mt-6">
      <countdown
        v-if="!hideEnd || (hideEnd && time)"
        :time="setTime"
        class="countdown d-flex"
        @end="$emit('end')"
        @start="$emit('start')"
        @progress="
          (data) => {
            $emit('progress', data);
          }
        "
      >
        <template slot-scope="props">
          <div class="block-time">
            <div class="title">Days</div>
            <v-img
              class="img"
              src="/images/buttons/btn-countdown.png"
              alt="countdown-days"
            />
            <div class="text-wGOLD text-center timer">{{ props.days }}</div>
          </div>
          <div class="block-time">
            <div class="title">Hours</div>
            <v-img
              class="img"
              src="/images/buttons/btn-countdown.png"
              alt="countdown-hours"
            />
            <div class="text-wGOLD text-center timer">{{ props.hours }}</div>
          </div>
          <div class="block-time">
            <div class="title">Minutes</div>
            <v-img
              class="img"
              src="/images/buttons/btn-countdown.png"
              alt="countdown-minutes"
            />
            <div class="text-wGOLD text-center timer">{{ props.minutes }}</div>
          </div>
          <div class="block-time">
            <div class="title">Seconds</div>
            <v-img
              class="img"
              src="/images/buttons/btn-countdown.png"
              alt="countdown-seconds"
            />
            <div class="text-wGOLD text-center timer">{{ props.seconds }}</div>
          </div>
        </template>
      </countdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: Number,
    title: String,
    hideEnd: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    setTime() {
      console.log(this.hideEnd && this.time)
      return this.time ?? 60 * 1000;
    },
  },
};
</script>

<style scoped>
.countdown >>> .block-time {
  position: relative;
  margin: 0px 10px;
}

.countdown >>> .block-time .title {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0%);
}

.countdown >>> .block-time .img {
  width: 80px;
}

.countdown >>> .block-time .timer {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 2rem;
  font-weight: bold;
}

@media only screen and (max-width: 540px) {
  .countdown >>> .block-time {
    margin: 0px 3px;
  }
  .countdown >>> .block-time .img {
    width: 70px;
  }
  .countdown >>> .block-time .title {
    font-size: 0.9rem !important;
  }
}
</style>
