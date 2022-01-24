<template>
  <div class="chest-container">
    <img class="mist" alt="mist" :src="`/images/animations/chest/chest-mist-${currentFrame}.png`" />
    <img class="chest" :src="frame" :alt="title" />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    state: 'closed',
      states: {
        opening: 12,
        open: 1,
        closed: 12,
      },
      frame: "",
      currentFrame: 1,
      animation: null,
      framerate: 60,
    };
  },
  methods: {
    getFrame() {
      if (this.currentFrame < this.states[this.state]) {
        this.currentFrame = this.currentFrame + 1;
      } else {
        this.currentFrame = 1;
      }
      this.frame = `/images/animations/chest/${this.state}-${this.currentFrame}.png`;
    },
  },
  mounted() {
    this.animation = setInterval(() => this.getFrame(), this.framerate);
  },
  updated() {
    if (this.state === 'closed' && this.isOpen) {
        this.state = 'opening';
        return
    }
    if (this.state === 'opening' && this.currentFrame === 12) {
        this.state = 'open';
        clearInterval(this.animation);
        this.animation = null;
        this.getFrame();
    }
  }
};
</script>
<style lang="scss" scoped>
.chest-container {
  position: relative;
  height: 300px;
  width: 400px;
}
.mist {
  position: absolute;
  z-index: 5;
}
.chest {
  position: absolute;
  z-index: 8;
}
</style>
