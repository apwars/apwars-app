export default {
  playMusic(state, { path, isLoop }) {
    state.track = new Audio(path);
    state.track.loop = isLoop
    state.track.play();
    state.isPlaying = true;
  },
  stopMusic(state) {
    state.track.pause();
    state.track = null;
    state.isPlaying = false;
  },
};
