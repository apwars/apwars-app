export default {
  startMusic(state, { path, isLoop }) {
    state.track = new Audio(path);
    state.track.volume = 0.1;
    state.track.loop = isLoop;
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
