<template>
  <div>
    <h4
      :class="[
        'title',
        'text-center',
        'text-h4',
        'text-md-h4',
        'ma-0',
        'mt-1',
        titleColor ? 'custom-color' : 'text-wGOLD',
      ]"
      :style="`--color: ${titleColor}`"
    >
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
          <div class="time-container">
            <div class="time-title">Days</div>
            <div class="time-block">
              <div class="time-text">{{ props.days }}</div>
            </div>
          </div>
          <div class="time-container">
            <div class="time-title">Hours</div>
            <div class="time-block">
              <div class="time-text">{{ props.hours }}</div>
            </div>
          </div>
          <div class="time-container">
            <div class="time-title">Minutes</div>
            <div class="time-block">
              <div class="time-text">
                {{ props.minutes }}
              </div>
            </div>
          </div>
          <div class="time-container">
            <div class="time-title">Seconds</div>
            <div class="time-block">
              <div class="time-text">
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
    titleColor: {
      type: String,
      default: "",
    },
  },

  computed: {
    setTime() {
      return this.time ?? 60 * 1000;
    },
  },
};
</script>

<style lang="scss" scoped>
.title.custom-color {
  color: var(--color);
}
.countdown >>> .block-time {
  position: relative;
  margin: 0px 10px;
}

.time-container {
  text-align: center;
  &:not(:last-child) {
    margin-right: 21px;
  }
}

.timer-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.3;
  text-align: center;
  color: #ffeebc;
}

.countdown >>> .block-time .img {
  width: 80px;
}

.timer-slot {
  position: relative;
}

.time-title {
  font-size: 10px;
  line-height: 1.3;
  margin-bottom: 6px;
}

.time-block {
  height: 48px;
  width: 48px;
  background-image: url("/images/buttons/btn-countdown.png");
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-text {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.3;
  color: #ffeebc;
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
