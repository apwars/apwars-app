<template>
  <div>
    <h4 class="text-wGOLD text-center text-h4 text-md-h4 ma-0 mt-1">
      {{ title }}
    </h4>
    <div class="d-flex justify-center mt-2">
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
            <div class="timer-title">Days</div>
            <div class="timer-slot">
              <v-img
                class="img"
                src="/images/buttons/btn-countdown.png"
                alt="countdown-days"
              />
              <div class="text-wGOLD text-center timer">{{ props.days }}</div>
            </div>
          </div>
          <div class="block-time">
            <div class="timer-title">Hours</div>
            <div class="timer-slot">
              <v-img
                class="img"
                src="/images/buttons/btn-countdown.png"
                alt="countdown-hours"
              />
              <div class="text-wGOLD text-center timer">{{ props.hours }}</div>
            </div>
          </div>
          <div class="block-time">
            <div class="timer-title">Minutes</div>
            <div class="timer-slot">
              <v-img
                class="img"
                src="/images/buttons/btn-countdown.png"
                alt="countdown-minutes"
              />
              <div class="text-wGOLD text-center timer">
                {{ props.minutes }}
              </div>
            </div>
          </div>
          <div class="block-time">
            <div class="timer-title">Seconds</div>
            <div class="timer-slot">
              <v-img
                class="img"
                src="/images/buttons/btn-countdown.png"
                alt="countdown-seconds"
              />
              <div class="text-wGOLD text-center timer">
                {{ props.seconds }}
              </div>
            </div>
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
      default: false,
    },
  },

  computed: {
    setTime() {
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

.timer-title {
  text-align: center;
  font-size: 14px;
  margin-bottom: 4px;
}

.countdown >>> .block-time .img {
  width: 80px;
}

.timer-slot {
  position: relative;
}
.timer {
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
