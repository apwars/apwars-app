export default {
  setupMusic(state, { path, isLoop }) {
    state.track = new Audio(path);
    state.track.loop = isLoop;
  },
  clearMusic(state) {
    state.track = null;
  },
  playMusic(state) {
    state.track.play();
    state.isPlaying = true;
  },
  stopMusic(state) {
    state.track.pause();
    state.isPlaying = false;
  },
  setVolume(state, value) {
    state.track.volume = value;
    state.volume = value;
  },
};
