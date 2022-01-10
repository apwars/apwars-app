export default {
  playMusic(state, { path, isLoop }) {
    state.track = new Audio(path);
    state.track.loop = isLoop
    state.track.play();
    state.isSoundActive = true;
    state.isPlaying = true;
  },
  stopMusic(state) {
    state.track.pause();
    state.isPlaying = false;
  },
  toggleMusic(state, isActive) {
    if (isActive) {
      state.track.play();
      state.isPlaying = true;
    }
    state.isSoundActive = isActive;
  }
};
